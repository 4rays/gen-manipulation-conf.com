import type {FieldSample} from "./field";

// Contrast guard. Text sits directly on the field. Every 400 ms, and never
// in the middle of a scroll gesture, it samples the field behind each text
// block and compares it with the block's text colour (composited over any
// painted section background). A block gets a soft local wash only when:
// - its 10th-percentile contrast is below 3.5:1 (text under 24px) or
//   2.5:1 (larger text), or
// - in any tile of about two lines by 160px behind small text, more than
//   20 % of the field is within 3:1 of the text colour (a busy patch).
// The wash goes again with hysteresis, so nothing flickers.

const SELECTOR = [
  "main h1",
  "main h2",
  "main h3",
  "main h4",
  "main p",
  "main dt",
  "main dd",
  "main summary",
  ".programme-session__time",
  ".conference-about__subjects li",
  ".talk-abstract__speaker",
  ".talk-abstract__return",
  ".conference-venue__grid a",
  ".action--secondary",
  ".site-footer p",
  ".site-footer a"
].join(",");

type Rgba = [number, number, number, number];

interface Block {
  element: HTMLElement;
  text: number;
  size: number;
  line: number;
  under: Rgba | null;
}

const linear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const luminance = (r: number, g: number, b: number) =>
  0.2126 * linear(r / 255) +
  0.7152 * linear(g / 255) +
  0.0722 * linear(b / 255);
const ratio = (a: number, b: number) =>
  (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

export function startGuard(sample: () => FieldSample) {
  // Computed colours may be OKLCH; a 1px canvas converts them to sRGB.
  const probe = document
    .createElement("canvas")
    .getContext("2d", {willReadFrequently: true});
  if (!probe) return () => {};
  probe.canvas.width = probe.canvas.height = 1;
  const cache = new Map<string, Rgba>();
  const rgba = (color: string): Rgba => {
    let value = cache.get(color);
    if (!value) {
      probe.clearRect(0, 0, 1, 1);
      probe.fillStyle = "#000";
      probe.fillStyle = color;
      probe.fillRect(0, 0, 1, 1);
      const d = probe.getImageData(0, 0, 1, 1).data;
      value = [d[0], d[1], d[2], d[3]];
      cache.set(color, value);
    }
    return value;
  };

  let blocks: Block[] = [];
  const collect = () => {
    const all = [...document.querySelectorAll<HTMLElement>(SELECTOR)].filter(
      (el) => el.textContent?.trim()
    );
    blocks = all
      .filter((el) => !all.some((other) => other !== el && el.contains(other)))
      .map((element) => {
        element.dataset.fxGuard ??= "off";
        const style = getComputedStyle(element);
        const [r, g, b] = rgba(style.color);
        const size = parseFloat(style.fontSize);
        let under: Rgba | null = null;
        for (
          let a = element.parentElement;
          a && a !== document.body;
          a = a.parentElement
        ) {
          const c = rgba(getComputedStyle(a).backgroundColor);
          if (c[3] > 0) {
            under = c;
            break;
          }
        }
        return {
          element,
          text: luminance(r, g, b),
          size,
          line: parseFloat(style.lineHeight) || size * 1.5,
          under
        };
      });
  };

  const check = () => {
    const {data, width: w, height: h, scale} = sample();
    if (!w) return;
    for (const block of blocks) {
      const {element, text, size, line, under} = block;
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight || !rect.width) continue;
      const x0 = Math.max(0, Math.floor(rect.left / scale));
      const x1 = Math.min(w - 1, Math.ceil(rect.right / scale));
      const y0 = Math.max(0, Math.floor(rect.top / scale));
      const y1 = Math.min(h - 1, Math.ceil(rect.bottom / scale));
      const tileH = Math.max(2, Math.round((line * 2) / scale));
      const tileW = Math.max(4, Math.round(160 / scale));
      const ratios: number[] = [];
      let busy = false;
      for (let ty = y0; ty <= y1; ty += tileH)
        for (let tx = x0; tx <= x1; tx += tileW) {
          let n = 0;
          let near = 0;
          for (let y = ty; y < Math.min(ty + tileH, y1 + 1); y++)
            for (let x = tx; x < Math.min(tx + tileW, x1 + 1); x++) {
              const i = (y * w + x) * 4;
              let r = data[i];
              let g = data[i + 1];
              let b = data[i + 2];
              if (under) {
                const k = under[3] / 255;
                r = under[0] * k + r * (1 - k);
                g = under[1] * k + g * (1 - k);
                b = under[2] * k + b * (1 - k);
              }
              const value = ratio(luminance(r, g, b), text);
              ratios.push(value);
              n++;
              if (value < 3) near++;
            }
          if (n >= 8 && near / n > 0.2) busy = true;
        }
      if (!ratios.length) continue;
      ratios.sort((a, b) => a - b);
      const p10 = ratios[Math.floor(ratios.length * 0.1)];
      const large = size >= 24;
      const low = large ? 2.5 : 3.5;
      const on = element.dataset.fxGuard === "on";
      if (!on && (p10 < low || (!large && busy))) {
        element.style.setProperty(
          "--fx-backing",
          text < 0.2
            ? "var(--wash-light, var(--plaster))"
            : "var(--wash-dark, var(--night))"
        );
        element.dataset.fxGuard = "on";
      } else if (on && p10 > low + 1 && !busy) element.dataset.fxGuard = "off";
    }
  };

  let scrolled = 0;
  let last = 0;
  let frame = 0;
  const onScroll = () => (scrolled = performance.now());
  const loop = (now: number) => {
    if (now - last > 400 && now - scrolled > 220 && !document.hidden) {
      last = now;
      check();
    }
    frame = requestAnimationFrame(loop);
  };
  // Biographies open and close; layout and fonts settle late.
  const mutations = new MutationObserver(collect);
  collect();
  document.fonts?.ready.then(collect);
  mutations.observe(document.body, {subtree: true, attributeFilter: ["open"]});
  addEventListener("scroll", onScroll, {passive: true});
  addEventListener("resize", collect, {passive: true});
  frame = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(frame);
    mutations.disconnect();
    removeEventListener("scroll", onScroll);
    removeEventListener("resize", collect);
    for (const block of blocks) {
      delete block.element.dataset.fxGuard;
      block.element.style.removeProperty("--fx-backing");
    }
  };
}

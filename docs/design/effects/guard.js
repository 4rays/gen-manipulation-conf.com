// Contrast guard for the effect sketches. Every few frames it samples the
// scene behind each text block (a downscaled frame from the effect) and
// compares it with the block's text colour. A block gets a local wash only
// when the 10th-percentile contrast is very poor (below 3.5:1 for text
// under 24px, below 2.5:1 for larger text), or when, in any tile of about two
// lines by 160px behind small text, more than 20 % of the background is
// within 3:1 of the text colour (busy). It removes the wash again with
// some hysteresis, so nothing flickers while scrolling.
(() => {
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
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const lum = (r, g, b) =>
    0.2126 * lin(r / 255) + 0.7152 * lin(g / 255) + 0.0722 * lin(b / 255);
  // Computed colours may be OKLCH; let a canvas convert them to sRGB.
  const probe = document
    .createElement("canvas")
    .getContext("2d", {willReadFrequently: true});
  probe.canvas.width = probe.canvas.height = 1;
  const cache = new Map();
  const rgb = (color) => {
    if (!cache.has(color)) {
      probe.clearRect(0, 0, 1, 1);
      probe.fillStyle = "#000";
      probe.fillStyle = color;
      probe.fillRect(0, 0, 1, 1);
      cache.set(color, [...probe.getImageData(0, 0, 1, 1).data]);
    }
    return cache.get(color);
  };
  let blocks = [];
  let backdrop = new Map();
  // Text colour, size and line height per block, read once per collect.
  let info = new Map();
  let scrolled = 0;
  addEventListener("scroll", () => (scrolled = performance.now()), {
    passive: true
  });
  const collect = () => {
    const all = [...document.querySelectorAll(SELECTOR)].filter((el) =>
      el.textContent.trim()
    );
    blocks = all
      .filter((el) => !all.some((other) => other !== el && el.contains(other)))
      .map((el) => {
        el.dataset.fxGuard = "off";
        return el;
      });
    info = new Map(
      blocks.map((el) => {
        const style = getComputedStyle(el);
        const [r, g, b] = rgb(style.color);
        const size = parseFloat(style.fontSize);
        return [
          el,
          {
            text: lum(r, g, b),
            size,
            lineH: parseFloat(style.lineHeight) || size * 1.5
          }
        ];
      })
    );
    // The nearest painted section background, composited over the scene.
    backdrop = new Map(
      blocks.map((el) => {
        for (
          let a = el.parentElement;
          a && a !== document.body;
          a = a.parentElement
        ) {
          const c = rgb(getComputedStyle(a).backgroundColor);
          if (c[3] > 0) return [el, c];
        }
        return [el, null];
      })
    );
  };
  const check = () => {
    const sample = window.sceneSample && window.sceneSample();
    if (!sample) return;
    const {data, w, h, scale, flip} = sample;
    for (const el of blocks) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight || !r.width) continue;
      const {text, size, lineH} = info.get(el);
      const over = backdrop.get(el);
      const ratios = [];
      const x0 = Math.max(0, Math.floor(r.left / scale));
      const x1 = Math.min(w - 1, Math.ceil(r.right / scale));
      const y0 = Math.max(0, Math.floor(r.top / scale));
      const y1 = Math.min(h - 1, Math.ceil(r.bottom / scale));
      // Busy check per tile (about two lines by 160px), so one dense patch
      // behind part of a long paragraph still counts.
      const tileH = Math.max(2, Math.round((lineH * 2) / scale));
      const tileW = Math.max(4, Math.round(160 / scale));
      let busy = false;
      for (let ty = y0; ty <= y1; ty += tileH)
        for (let tx = x0; tx <= x1; tx += tileW) {
          let n = 0,
            near = 0;
          for (let y = ty; y < Math.min(ty + tileH, y1 + 1); y++)
            for (let x = tx; x < Math.min(tx + tileW, x1 + 1); x++) {
              const row = flip ? h - 1 - y : y;
              const i = (row * w + x) * 4;
              let pr = data[i],
                pg = data[i + 1],
                pb = data[i + 2];
              if (over) {
                const k = over[3] / 255;
                pr = over[0] * k + pr * (1 - k);
                pg = over[1] * k + pg * (1 - k);
                pb = over[2] * k + pb * (1 - k);
              }
              const bg = lum(pr, pg, pb);
              const ratio =
                (Math.max(bg, text) + 0.05) / (Math.min(bg, text) + 0.05);
              ratios.push(ratio);
              n++;
              if (ratio < 3) near++;
            }
          if (n >= 8 && near / n > 0.2) busy = true;
        }
      if (!ratios.length) continue;
      ratios.sort((a, b) => a - b);
      const p10 = ratios[Math.floor(ratios.length * 0.1)];
      const large = size >= 24;
      const low = large ? 2.5 : 3.5;
      const on = el.dataset.fxGuard === "on";
      if (!on && (p10 < low || (!large && busy))) {
        el.style.setProperty(
          "--fx-backing",
          text < 0.2 ? "rgb(241 245 248)" : "rgb(8 24 53)"
        );
        el.dataset.fxGuard = "on";
      } else if (on && p10 > low + 1 && !busy) el.dataset.fxGuard = "off";
    }
  };
  addEventListener("load", () => {
    collect();
    let last = 0;
    const loop = (now) => {
      // Check every 400ms, and never in the middle of a scroll gesture.
      if (now - last > 400 && now - scrolled > 220) {
        last = now;
        check();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
  new MutationObserver(() => collect()).observe(document.body, {
    subtree: true,
    attributeFilter: ["open"]
  });
})();

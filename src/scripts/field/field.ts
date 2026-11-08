// Pull Field: sparse, soft rain trails on a blue ground. Hidden
// attractors drift slowly in a meandering current; the paths loop through
// their soft cores, fly back out and tangle. The attractors are never drawn:
// only the bending paths show them.
//
// Budget: one Canvas 2D at a pixel ratio of at most 1.25, at most 900
// trails, two stroke calls per frame (trails batched by colour), speeds
// capped, and every trail renewed after a short life so no knot builds up.

export interface FieldSample {
  data: Uint8ClampedArray;
  width: number;
  height: number;
  /** CSS pixels per sample pixel. */
  scale: number;
}

export interface Field {
  /** A downscaled, point-sampled copy of the current frame. */
  sample: () => FieldSample;
  setRunning: (running: boolean) => void;
  dispose: () => void;
}

interface Options {
  /** False for reduced motion and Save-Data: one settled, still frame. */
  animate: boolean;
}

interface Trail {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  deep: boolean;
}

interface Well {
  x: number;
  y: number;
  m: number;
}

// Colours come from CSS (--field-* on .page-scene, src/styles/hero.css).
// These are the fallbacks.
const COLOURS = {
  ground: ["--field-ground", "rgb(0 52 125)"],
  fade: ["--field-fade", "rgb(0 52 125 / 0.07)"],
  main: ["--field-trail", "rgb(241 245 248 / 0.16)"],
  deep: ["--field-trail-deep", "rgb(149 196 231 / 0.26)"]
} as const;
const PULL = 0.078;
const MAX_SPEED = 6.5;
const SAMPLE_SCALE = 6;

// Normalised positions, placed clear of the hero and footer text.
const LANDSCAPE: Well[] = [
  {x: 0.72, y: 0.36, m: 1},
  {x: 0.9, y: 0.6, m: 0.7},
  {x: 0.5, y: 0.68, m: 0.55}
];
const PORTRAIT: Well[] = [
  {x: 0.72, y: 0.28, m: 1},
  {x: 0.9, y: 0.5, m: 0.7},
  {x: 0.32, y: 0.44, m: 0.55}
];

export function createField(host: HTMLElement, options: Options): Field {
  const canvas = document.createElement("canvas");
  canvas.className = "field-scene__canvas";
  canvas.setAttribute("aria-hidden", "true");
  const context = canvas.getContext("2d", {alpha: false});
  if (!context) throw new Error("Canvas 2D unavailable");
  const ctx = context;
  const style = getComputedStyle(host);
  const [GROUND, FADE, MAIN, DEEP] = Object.values(COLOURS).map(
    ([name, fallback]) => style.getPropertyValue(name).trim() || fallback
  );

  let width = 1;
  let height = 1;
  let wells = LANDSCAPE;
  let trails: Trail[] = [];
  let time = 0;
  let last = 0;
  let frame = 0;
  let running = true;
  let disposed = false;

  const spawn = (trail: Trail, anywhere: boolean) => {
    trail.x = Math.random() * width;
    trail.y = anywhere ? Math.random() * height : -10 - Math.random() * 60;
    trail.vx = (Math.random() - 0.5) * 2.4;
    trail.vy = 1 + Math.random() * 0.9;
    trail.life = 250 + Math.random() * 450;
    trail.deep = Math.random() > 0.8;
    return trail;
  };

  const step = (dt: number) => {
    const scale = Math.min(width, height);
    time += dt;
    const centres = wells.map((well, i) => ({
      x: (well.x + 0.045 * Math.sin(time * 0.0021 + i * 2.1)) * width,
      y: (well.y + 0.04 * Math.cos(time * 0.0017 + i * 1.3)) * height,
      m: well.m
    }));
    ctx.fillStyle = FADE;
    ctx.fillRect(0, 0, width, height);
    const paths = [new Path2D(), new Path2D()];
    for (const t of trails) {
      // A slow meandering current gives every path its own wander.
      let ax =
        0.045 * Math.sin(t.y * 0.009 + time * 0.012) +
        0.03 * Math.sin(t.x * 0.004 - time * 0.007);
      let ay = 0.03 + 0.03 * Math.cos(t.x * 0.008 - time * 0.01);
      let near = false;
      for (const c of centres) {
        const dx = c.x - t.x;
        const dy = c.y - t.y;
        const d2 = dx * dx + dy * dy;
        const r = Math.sqrt(d2) || 1;
        // Soft cores: paths loop through and fly back out, never stick.
        const f =
          ((c.m * PULL * 0.0016) / (d2 / (scale * scale) + 0.01)) *
          scale *
          0.06;
        ax += (dx / r) * f;
        ay += (dy / r) * f;
        if (r < scale * 0.05) near = true;
      }
      // Almost no friction keeps wide loops; trails age fast near a core.
      t.vx = (t.vx + ax * dt) * 0.999;
      t.vy = (t.vy + ay * dt) * 0.999;
      const speed = Math.hypot(t.vx, t.vy);
      if (speed > MAX_SPEED) {
        t.vx *= MAX_SPEED / speed;
        t.vy *= MAX_SPEED / speed;
      }
      t.life -= near ? dt * 5 : dt;
      const px = t.x;
      const py = t.y;
      t.x += t.vx * dt;
      t.y += t.vy * dt;
      if (
        t.life < 0 ||
        t.y > height + 20 ||
        t.y < -80 ||
        t.x < -40 ||
        t.x > width + 40
      ) {
        spawn(t, false);
        continue;
      }
      const path = paths[t.deep ? 1 : 0];
      path.moveTo(px, py);
      path.lineTo(t.x, t.y);
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = MAIN;
    ctx.stroke(paths[0]);
    ctx.strokeStyle = DEEP;
    ctx.stroke(paths[1]);
  };

  const settle = (steps: number) => {
    for (let i = 0; i < steps; i++) step(1);
  };

  const resize = () => {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    if (Math.abs(rect.width - width) < 1 && Math.abs(rect.height - height) < 1)
      return;
    width = rect.width;
    height = rect.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    wells = width < height ? PORTRAIT : LANDSCAPE;
    const count = Math.round(Math.min(900, (width * height) / 1700));
    trails = Array.from({length: count}, () => spawn({} as Trail, true));
    ctx.fillStyle = GROUND;
    ctx.fillRect(0, 0, width, height);
    // Start from a developed frame, not an empty ground.
    settle(options.animate ? 60 : 160);
  };

  const tick = (now: number) => {
    frame = 0;
    if (disposed || !running) return;
    const dt = last ? Math.min(2, (now - last) / 16.7) : 1;
    last = now;
    step(dt);
    frame = requestAnimationFrame(tick);
  };
  const start = () => {
    if (!options.animate || disposed || !running || frame) return;
    last = 0;
    frame = requestAnimationFrame(tick);
  };

  const small = document.createElement("canvas");
  const smallCtx = small.getContext("2d", {willReadFrequently: true});

  const observer = new ResizeObserver(resize);
  host.append(canvas);
  resize();
  observer.observe(host);
  start();

  return {
    sample() {
      small.width = Math.max(1, Math.round(width / SAMPLE_SCALE));
      small.height = Math.max(1, Math.round(height / SAMPLE_SCALE));
      if (!smallCtx)
        return {data: new Uint8ClampedArray(0), width: 0, height: 0, scale: 1};
      // Point sampling keeps thin trails visible to the contrast guard.
      smallCtx.imageSmoothingEnabled = false;
      smallCtx.drawImage(canvas, 0, 0, small.width, small.height);
      return {
        data: smallCtx.getImageData(0, 0, small.width, small.height).data,
        width: small.width,
        height: small.height,
        scale: SAMPLE_SCALE
      };
    },
    setRunning(value) {
      running = value;
      if (!running && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      start();
    },
    dispose() {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.remove();
    }
  };
}

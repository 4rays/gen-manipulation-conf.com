// Effect sketch: Pull Field.
// Sparse, soft rain trails on a constant plaster ground. Hidden attractors
// drift slowly in a meandering current; paths loop through the soft cores,
// fly back out and tangle. The attractors are never drawn: the bending
// paths show them.
// Comparison sketch only: Canvas 2D, no dependencies.
//
// Budget: one canvas, two stroke calls per frame (all trails batched by
// colour), speeds capped and trails renewed so no point jams up.
(() => {
  const host = document.querySelector("[data-page-scene]");
  if (!host) return;
  host.replaceChildren();
  document.documentElement.dataset.fx = "field";
  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;display:block";
  host.append(canvas);
  const ctx = canvas.getContext("2d", {alpha: false});
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const PLASTER = "rgb(241,245,248)";
  const FADE = "rgba(241,245,248,0.07)";
  const MAIN = "rgba(10,94,155,0.2)";
  const DEEP = "rgba(9,72,124,0.28)";
  const MAX_SPEED = 6.5;

  // Placed clear of the closing footer text on wide and narrow screens.
  const landscape = [
    {x: 0.72, y: 0.36, m: 1.0},
    {x: 0.9, y: 0.6, m: 0.7},
    {x: 0.5, y: 0.68, m: 0.55}
  ];
  const portrait = [
    {x: 0.72, y: 0.28, m: 1.0},
    {x: 0.9, y: 0.5, m: 0.7},
    {x: 0.32, y: 0.44, m: 0.55}
  ];
  let wells = landscape;
  let w = 1,
    h = 1,
    ratio = 1;
  let goal = 0,
    progress = 0,
    last = 0,
    time = 0;
  let particles = [];

  const spawn = (p, anywhere) => {
    p.x = Math.random() * w;
    p.y = anywhere ? Math.random() * h : -10 - Math.random() * 60;
    p.vx = (Math.random() - 0.5) * 2.4;
    p.vy = 1.0 + Math.random() * 0.9;
    p.deep = Math.random() > 0.8;
    p.life = 250 + Math.random() * 450;
    return p;
  };
  const resize = () => {
    ratio = Math.min(devicePixelRatio || 1, 1.25);
    w = host.clientWidth;
    h = host.clientHeight;
    wells = w < h ? portrait : landscape;
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    // Sparse: about one trail per 1700 px², at most 900.
    const count = Math.round(Math.min(900, (w * h) / 1700));
    particles = Array.from({length: count}, () => spawn({}, true));
    ctx.fillStyle = PLASTER;
    ctx.fillRect(0, 0, w, h);
  };
  const read = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  };

  const step = (dt) => {
    // One pull for the whole page, in the tangled range: strong enough to
    // bend and loop the paths, never strong enough to knot them.
    const pull = 0.078;
    const scale = Math.min(w, h);
    time += dt;
    // The attractors wander slowly, so the paths never settle.
    const at = wells.map((well, i) => ({
      x: (well.x + 0.045 * Math.sin(time * 0.0021 + i * 2.1)) * w,
      y: (well.y + 0.04 * Math.cos(time * 0.0017 + i * 1.3)) * h,
      m: well.m
    }));
    ctx.fillStyle = reduced ? PLASTER : FADE;
    ctx.fillRect(0, 0, w, h);
    const paths = [new Path2D(), new Path2D()];
    for (const p of particles) {
      // A slow meandering current gives every path its own wander.
      let ax =
        0.045 * Math.sin(p.y * 0.009 + time * 0.012) +
        0.03 * Math.sin(p.x * 0.004 - time * 0.007);
      let ay = 0.03 + 0.03 * Math.cos(p.x * 0.008 - time * 0.01);
      let near = false;
      for (const well of at) {
        const dx = well.x - p.x;
        const dy = well.y - p.y;
        const d2 = dx * dx + dy * dy;
        const r = Math.sqrt(d2) || 1;
        // Soft cores: paths loop through and fly back out, never stick.
        const f =
          ((well.m * pull * 0.0016) / (d2 / (scale * scale) + 0.01)) *
          scale *
          0.06;
        ax += (dx / r) * f;
        ay += (dy / r) * f;
        // Paths age fast near a core, so no knot builds up there.
        if (r < scale * 0.05) near = true;
      }
      // Almost no friction: bound paths keep wide loops instead of
      // winding down into the core.
      p.vx = (p.vx + ax * dt) * 0.999;
      p.vy = (p.vy + ay * dt) * 0.999;
      p.life -= near ? dt * 5 : dt;
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > MAX_SPEED) {
        p.vx *= MAX_SPEED / speed;
        p.vy *= MAX_SPEED / speed;
      }
      const px = p.x,
        py = p.y;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (
        p.life < 0 ||
        p.y > h + 20 ||
        p.y < -80 ||
        p.x < -40 ||
        p.x > w + 40
      ) {
        spawn(p, false);
        continue;
      }
      const path = paths[p.deep ? 1 : 0];
      path.moveTo(px, py);
      path.lineTo(p.x, p.y);
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = MAIN;
    ctx.stroke(paths[0]);
    ctx.strokeStyle = DEEP;
    ctx.stroke(paths[1]);
  };

  // A downscaled, point-sampled copy of the frame for the contrast guard.
  const SCALE = 6;
  const small = document.createElement("canvas");
  const smallCtx = small.getContext("2d", {willReadFrequently: true});
  window.sceneSample = () => {
    small.width = Math.max(1, Math.round(w / SCALE));
    small.height = Math.max(1, Math.round(h / SCALE));
    smallCtx.imageSmoothingEnabled = false;
    smallCtx.drawImage(canvas, 0, 0, small.width, small.height);
    const {data} = smallCtx.getImageData(0, 0, small.width, small.height);
    return {data, w: small.width, h: small.height, scale: SCALE, flip: false};
  };

  const tick = (now) => {
    const dt = last ? Math.min(2, (now - last) / 16.7) : 1;
    last = now;
    progress += (goal - progress) * (1 - Math.exp(-(dt * 16.7) / 160));
    if (Math.abs(goal - progress) < 1e-4) progress = goal;
    host.dataset.progress = progress.toFixed(4);
    if (reduced) {
      for (let i = 0; i < 60; i++) step(1);
    } else step(dt);
    if (!reduced || progress !== goal) requestAnimationFrame(tick);
    else last = 0;
  };
  addEventListener(
    "scroll",
    () => {
      goal = read();
      if (reduced && !last) requestAnimationFrame(tick);
    },
    {passive: true}
  );
  addEventListener("resize", resize);
  goal = progress = read();
  resize();
  requestAnimationFrame(tick);
})();

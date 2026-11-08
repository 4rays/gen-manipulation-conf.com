// Effect sketch: Blue Hour on the Ice.
// A frozen lake at the January blue hour. A ploughed track with lit marker
// poles runs to a vanishing point. Scroll moves the camera along the track;
// the light follows the page, blue hour behind light sections and night
// behind the programme and footer, and the drifting snow is
// pulled, more and more, toward the lit track.
// Comparison sketch only: one fullscreen WebGL2 shader, no dependencies.
(() => {
  const host = document.querySelector("[data-page-scene]");
  if (!host) return;
  host.replaceChildren();
  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;display:block";
  host.append(canvas);
  const gl = canvas.getContext("webgl2", {antialias: false, alpha: false});
  if (!gl) return;

  const vs = `#version 300 es
  in vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
  const fs = `#version 300 es
  precision highp float;
  uniform vec2 uRes;
  uniform float uTime;
  uniform float uP;
  uniform float uDusk;
  uniform float uShift;
  uniform float uLift;
  out vec4 o;

  float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float n2(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
    return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y); }
  float fbm(vec2 p){ float a = .5, s = 0.; for (int i = 0; i < 5; i++) { s += a * n2(p); p = p * 2.03 + 17.1; a *= .5; } return s; }
  float trackX(float z){ return 7.0 * sin(z * 0.017) + 2.5 * sin(z * 0.041 + 1.3); }

  float dusk;
  vec3 sky(vec3 rd){
    float y = max(rd.y, 0.0);
    vec3 zen = mix(vec3(0.07, 0.12, 0.30), vec3(0.015, 0.03, 0.09), dusk);
    vec3 hor = mix(vec3(0.70, 0.77, 0.90), vec3(0.13, 0.19, 0.36), dusk);
    vec3 c = mix(hor, zen, pow(y, 0.42));
    float glow = exp(-y * 16.0) * smoothstep(-0.3, 1.0, dot(normalize(rd.xz + 1e-4), normalize(vec2(-0.7, 1.0))));
    c += vec3(0.98, 0.62, 0.32) * 0.16 * (1.0 - dusk) * glow;
    return c;
  }

  void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    uv.x -= uShift;
    uv.y -= uLift;
    dusk = uDusk;
    float travel = uP * 150.0;
    vec3 ro = vec3(trackX(travel) - 2.2, 1.65, travel);
    vec3 ta = vec3(trackX(travel + 45.0), 1.55, travel + 45.0);
    vec3 fw = normalize(ta - ro);
    vec3 rt = normalize(cross(vec3(0, 1, 0), fw));
    vec3 up = cross(fw, rt);
    float focal = 1.7;

    // Snow that bends toward the lit track: displace the screen before
    // drawing the flakes, more as the page goes on.
    vec3 vpw = vec3(trackX(travel + 120.0), 0.6, travel + 120.0) - ro;
    vec2 vp = vec2(dot(vpw, rt), dot(vpw, up)) / max(dot(vpw, fw), 1.0) * focal;

    vec3 rd = normalize(uv.x * rt + uv.y * up + focal * fw);
    vec3 fogCol = mix(vec3(0.66, 0.73, 0.86), vec3(0.10, 0.15, 0.30), dusk);
    vec3 col;
    float sceneDepth = 1e5;
    bool ice = rd.y < 0.0;
    if (ice) {
      float t = -ro.y / rd.y;
      vec3 p = ro + rd * t;
      sceneDepth = dot(p - ro, fw);
      vec2 q = p.xz;
      float dTrack = abs(p.x - trackX(p.z));
      float aa = t * 0.004;
      float track = 1.0 - smoothstep(1.35 - aa, 1.6 + aa, dTrack);
      float bank = smoothstep(1.4, 1.75, dTrack) * (1.0 - smoothstep(1.8, 3.2, dTrack));
      float drift = fbm(q * vec2(0.22, 0.07));
      float fine = fbm(q * 2.6);
      vec3 snow = mix(vec3(0.80, 0.86, 0.94), vec3(0.96, 0.975, 0.99), drift);
      snow *= 0.94 + 0.06 * fine;
      float clear = smoothstep(0.6, 0.7, fbm(q * 0.05 + 7.0));
      vec3 clearIce = vec3(0.26, 0.40, 0.62);
      vec3 ploughed = mix(vec3(0.40, 0.53, 0.72), vec3(0.52, 0.63, 0.80), fine);
      col = mix(snow, clearIce, clear * 0.75);
      col = mix(col, ploughed, track);
      col = mix(col, vec3(0.98, 0.99, 1.0), bank * 0.55);
      vec3 amb = mix(vec3(0.92, 0.95, 1.0), vec3(0.20, 0.27, 0.46), dusk);
      col *= amb;
      float fres = pow(1.0 - max(-rd.y, 0.0), 5.0);
      col = mix(col, sky(reflect(rd, vec3(0, 1, 0))), fres * (0.25 + 0.5 * track + 0.5 * clear));
      float fog = 1.0 - exp(-t * 0.011);
      col = mix(col, fogCol, fog);
    } else {
      col = sky(rd);
      col = mix(col, fogCol, exp(-rd.y * 30.0) * 0.8);
    }

    // Marker poles with warm lamps, both sides of the track.
    vec3 lamp = vec3(0.95, 0.70, 0.30);
    float first = floor(travel / 9.0);
    for (int i = 0; i < 18; i++) {
      float k = first + float(i);
      float z = k * 9.0 + 4.0;
      for (int s = 0; s < 2; s++) {
        float x = trackX(z) + (s == 0 ? -2.0 : 2.0);
        vec3 b = vec3(x, 0.0, z) - ro;
        float zc = dot(b, fw);
        if (zc < 8.0) continue;
        vec2 base = vec2(dot(b, rt), dot(b, up)) / zc * focal;
        vec3 tw = b + vec3(0.0, 1.3, 0.0);
        vec2 top = vec2(dot(tw, rt), dot(tw, up)) / zc * focal;
        vec2 pa = uv - base, ba = top - base;
        float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        float d = length(pa - ba * hh);
        float w = 0.018 / zc;
        float atten = exp(-zc * 0.012);
        if (zc < sceneDepth || !ice) {
          col = mix(col, vec3(0.04, 0.07, 0.16), (1.0 - smoothstep(w * 0.5, w, d)) * atten * 0.9);
        }
        float r = length(uv - top);
        float bright = mix(0.55, 1.6, dusk);
        col += lamp * bright * atten * (exp(-r * r / (0.00004 + 0.0012 / zc)) * 0.9 + exp(-r * 70.0 * zc / 20.0) * 0.06);
        if (ice) {
          vec3 mw = b + vec3(0.0, -1.3, 0.0);
          vec2 m = vec2(dot(mw, rt), dot(mw, up)) / zc * focal;
          vec2 dm = uv - m;
          col += lamp * bright * atten * 0.35 * exp(-(dm.x * dm.x) / (0.00003 + 0.0002 / zc) - (dm.y * dm.y) / (0.002 + 0.02 / zc));
        }
      }
    }

    // Snowfall, in three depth layers, pulled toward the track.
    float pull = 0.06 + 0.5 * smoothstep(0.05, 0.9, uP);
    for (int l = 0; l < 3; l++) {
      float fl = float(l);
      float scale = 12.0 + fl * 9.0;
      vec2 toVp = vp - uv;
      vec2 suv = uv + toVp * pull * (0.25 + 0.25 * fl) * (0.5 + 0.5 * sin(uTime * 0.2 + fl));
      suv = suv * scale + vec2(uTime * (0.25 - fl * 0.05), uTime * (0.9 + fl * 0.35));
      vec2 cell = floor(suv);
      vec2 f = fract(suv) - 0.5;
      float rnd = h21(cell + fl * 31.0);
      vec2 off = (vec2(h21(cell + 3.1), h21(cell + 7.7)) - 0.5) * 0.7;
      float size = 0.035 + 0.045 * h21(cell + 11.0);
      float flake = (1.0 - smoothstep(size * 0.4, size, length(f - off))) * step(rnd, 0.28);
      col = mix(col, vec3(0.97, 0.98, 1.0), flake * (0.55 - fl * 0.12));
    }

    vec2 vq = gl_FragCoord.xy / uRes - 0.5;
    col *= 1.0 - 0.12 * dot(vq, vq) * 2.0;
    col += (h21(gl_FragCoord.xy + fract(uTime) * 91.0) - 0.5) * 0.022;
    o = vec4(pow(max(col, 0.0), vec3(0.95)), 1.0);
  }`;

  const shader = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
      console.error(gl.getShaderInfoLog(s));
    return s;
  };
  const program = gl.createProgram();
  gl.attachShader(program, shader(gl.VERTEX_SHADER, vs));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(program);
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );
  const loc = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (name) => gl.getUniformLocation(program, name);
  const uRes = u("uRes"),
    uTime = u("uTime"),
    uP = u("uP"),
    uShift = u("uShift"),
    uLift = u("uLift"),
    uDusk = u("uDusk");

  // A downscaled copy of the last frame for the contrast guard.
  const SCALE = 4;
  let wantSample = false,
    sample = null;
  const small = gl.createFramebuffer();
  const smallTex = gl.createRenderbuffer();
  const readSample = () => {
    wantSample = false;
    const w = Math.max(1, Math.round(host.clientWidth / SCALE));
    const h = Math.max(1, Math.round(host.clientHeight / SCALE));
    gl.bindRenderbuffer(gl.RENDERBUFFER, smallTex);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA8, w, h);
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, small);
    gl.framebufferRenderbuffer(
      gl.DRAW_FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.RENDERBUFFER,
      smallTex
    );
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
    gl.blitFramebuffer(
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      w,
      h,
      gl.COLOR_BUFFER_BIT,
      gl.NEAREST
    );
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, small);
    const data = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    sample = {data, w, h, scale: SCALE, flip: true};
  };
  window.sceneSample = () => {
    wantSample = true;
    return sample;
  };

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let goal = 0,
    progress = 0,
    last = 0,
    time = 0,
    tone = 0,
    toneGoal = 0;
  const read = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  };
  const resize = () => {
    const ratio = Math.min(
      devicePixelRatio || 1,
      1.25,
      Math.sqrt(2.4e6 / (innerWidth * innerHeight))
    );
    canvas.width = Math.round(host.clientWidth * ratio);
    canvas.height = Math.round(host.clientHeight * ratio);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  const draw = () => {
    const aspect = canvas.width / canvas.height;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, time);
    gl.uniform1f(uP, progress);
    gl.uniform1f(uDusk, tone);

    gl.uniform1f(uShift, aspect > 1.2 ? 0.28 * (1 - progress) : 0);
    gl.uniform1f(uLift, aspect > 1 ? -0.06 : 0.1 - 0.06 * progress);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (wantSample) readSample();
  };
  const tick = (now) => {
    const dt = last ? Math.min(64, now - last) : 16;
    last = now;
    if (!reduced) time += dt / 1000;
    progress += (goal - progress) * (1 - Math.exp(-dt / 110));
    if (Math.abs(goal - progress) < 1e-4) progress = goal;
    if (window.sceneTone) toneGoal = window.sceneTone();
    tone += (toneGoal - tone) * (1 - Math.exp(-dt / 260));
    host.dataset.progress = progress.toFixed(4);
    draw();
    if (!reduced || progress !== goal || Math.abs(toneGoal - tone) > 1e-3)
      requestAnimationFrame(tick);
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
  addEventListener("resize", () => {
    resize();
    goal = read();
  });
  resize();
  goal = progress = read();
  requestAnimationFrame(tick);
})();

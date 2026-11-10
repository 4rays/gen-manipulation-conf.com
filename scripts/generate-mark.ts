// Generates the Field mark: a round window onto the Pull Field. Run with
// `pnpm generate:mark` (Node runs TypeScript directly). The output is
// committed, so the build does not run this.
//
// Evenly spaced drops fall through the forces of src/scripts/field/field.ts
// (900 px square, pull 0.078, core softening 0.01, speed cap 6.5), with no
// randomness and no current. One well that is never drawn combs them
// together; a strand that enters its core ages 40 times faster, so it
// tangles once or twice and ends. The site owner chose this version
// ("Drift": 7 strands, the well at 0.6, 0.45) on 10 November 2026.
//
// Writes:
// - src/data/mark.ts: path data for the header (7 and 5 strands)
// - public/favicon.svg
// - public/favicon.ico (16 and 32 px) and public/apple-touch-icon.png
//   (180 px), drawn by this script with no dependencies

import {writeFileSync} from "node:fs";
import {join} from "node:path";
import {crc32, deflateSync} from "node:zlib";

type Point = [number, number];

const S = 900;
const WELLS = [{x: 0.6, y: 0.45, m: 1}];
const CAPTURE = 40;
const CORE = 0.05;
const PULL = 0.078;
const MAX_SPEED = 6.5;

// Colours: --field-blue and --plaster (src/styles.css) in sRGB.
const FIELD_BLUE = "#00347d";
const PLASTER = "#f1f5f8";

/** Each strand as points in a 100-unit box. */
function strands(count: number): Point[][] {
  const wells = WELLS.map((w) => ({x: w.x * S, y: w.y * S, m: w.m}));
  const result: Point[][] = [];
  for (let i = 0; i < count; i++) {
    let x = ((i + 0.5) / count) * S;
    let y = -18;
    let vx = 0;
    let vy = 1.4;
    let life = 400;
    const points: Point[] = [[x / 9, y / 9]];
    for (let step = 0; step < 900; step++) {
      let ax = 0;
      let ay = 0.03;
      let near = false;
      for (const w of wells) {
        const dx = w.x - x;
        const dy = w.y - y;
        const d2 = dx * dx + dy * dy;
        const r = Math.sqrt(d2) || 1;
        const f = ((w.m * PULL * 0.0016) / (d2 / (S * S) + 0.01)) * S * 0.06;
        ax += (dx / r) * f;
        ay += (dy / r) * f;
        if (r < S * CORE) near = true;
      }
      vx = (vx + ax) * 0.999;
      vy = (vy + ay) * 0.999;
      const speed = Math.hypot(vx, vy);
      if (speed > MAX_SPEED) {
        vx *= MAX_SPEED / speed;
        vy *= MAX_SPEED / speed;
      }
      life -= near ? CAPTURE : 1;
      x += vx;
      y += vy;
      points.push([x / 9, y / 9]);
      if (life < 0 || y > S + 40 || x < -60 || x > S + 60 || y < -200) break;
    }
    result.push(points);
  }
  return result;
}

/** Cuts a polyline to the parts inside the circle of radius r at (50, 50). */
function clipToCircle(points: Point[], r: number): Point[][] {
  const inside = ([x, y]: Point) => (x - 50) ** 2 + (y - 50) ** 2 <= r * r;
  const crossing = (a: Point, b: Point): Point => {
    const [ax, ay] = [a[0] - 50, a[1] - 50];
    const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
    const qa = dx * dx + dy * dy;
    const qb = 2 * (ax * dx + ay * dy);
    const qc = ax * ax + ay * ay - r * r;
    const root = Math.sqrt(Math.max(0, qb * qb - 4 * qa * qc));
    const t = [(-qb - root) / (2 * qa), (-qb + root) / (2 * qa)].find(
      (v) => v >= 0 && v <= 1
    );
    const k = t ?? 0;
    return [a[0] + k * dx, a[1] + k * dy];
  };
  const pieces: Point[][] = [];
  let current: Point[] = [];
  points.forEach((p, i) => {
    const previous = points[i - 1];
    if (inside(p)) {
      if (!current.length && previous) current.push(crossing(previous, p));
      current.push(p);
    } else if (current.length) {
      current.push(crossing(previous, p));
      pieces.push(current);
      current = [];
    }
  });
  if (current.length) pieces.push(current);
  return pieces.filter((piece) => piece.length > 1);
}

/** Ramer–Douglas–Peucker simplification. */
function simplify(points: Point[], tolerance: number): Point[] {
  if (points.length < 3) return points;
  const [a, b] = [points[0], points[points.length - 1]];
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  let worst = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const distance = length
      ? Math.abs((b[0] - a[0]) * (a[1] - y) - (a[0] - x) * (b[1] - a[1])) /
        length
      : Math.hypot(x - a[0], y - a[1]);
    if (distance > worst) {
      worst = distance;
      index = i;
    }
  }
  if (worst <= tolerance) return [a, b];
  return [
    ...simplify(points.slice(0, index + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(index), tolerance)
  ];
}

function pieces(count: number): Point[][] {
  return strands(count)
    .flatMap((strand) => clipToCircle(strand, 50))
    .map((piece) => simplify(piece, 0.06));
}

function pathData(lines: Point[][]): string {
  return lines
    .map(
      (piece) =>
        "M" + piece.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join("L")
    )
    .join("");
}

const seven = pieces(7);
const five = pieces(5);

// The disc, a faint ring, and the strands, in plaster on field blue.
const RING = {radius: 48.5, opacity: 0.35};

function svgIcon(lines: Point[][], stroke: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Field mark: generated by scripts/generate-mark.ts. -->
  <clipPath id="disc"><circle cx="50" cy="50" r="50"/></clipPath>
  <circle cx="50" cy="50" r="50" fill="${FIELD_BLUE}"/>
  <circle cx="50" cy="50" r="${RING.radius}" fill="none" stroke="${PLASTER}" stroke-opacity="${RING.opacity}" stroke-width="1.5"/>
  <path clip-path="url(#disc)" d="${pathData(lines)}" fill="none" stroke="${PLASTER}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
}

// Rasters are drawn here, not with ImageMagick: its built-in SVG renderer
// drops unfilled strokes. Each pixel takes the distance to the disc edge,
// the ring and the nearest strand segment, with one pixel of smoothing.
function rasterIcon(
  size: number,
  lines: Point[][],
  stroke: number,
  {square = false, ring = 1.5} = {}
): Buffer {
  // The square (apple-touch-icon) leaves a margin for iOS's rounded mask.
  const [origin, span] = square ? [-10, 120] : [0, 100];
  const unit = span / size;
  const hex = (c: string) =>
    [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const blue = hex(FIELD_BLUE);
  const plaster = hex(PLASTER);
  const segments = lines.flatMap((piece) =>
    piece.slice(1).map((b, i) => [piece[i], b] as const)
  );
  const coverage = (distance: number) =>
    Math.min(1, Math.max(0, distance / unit + 0.5));
  const pixels = Buffer.alloc(size * size * 4);
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      const x = origin + (column + 0.5) * unit;
      const y = origin + (row + 0.5) * unit;
      const r = Math.hypot(x - 50, y - 50);
      let nearest = Infinity;
      for (const [a, b] of segments) {
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const t = Math.max(
          0,
          Math.min(
            1,
            ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy || 1)
          )
        );
        nearest = Math.min(
          nearest,
          Math.hypot(x - a[0] - t * dx, y - a[1] - t * dy)
        );
      }
      const disc = coverage(50 - r);
      let colour = [...blue];
      let alpha = square ? 1 : disc;
      const over = (c: number[], a: number) => {
        const out = a + alpha * (1 - a);
        if (out > 0)
          colour = colour.map((v, i) => (c[i] * a + v * alpha * (1 - a)) / out);
        alpha = out;
      };
      over(
        plaster,
        coverage(ring / 2 - Math.abs(r - RING.radius)) * RING.opacity
      );
      over(plaster, coverage(stroke / 2 - nearest) * disc);
      const offset = (row * size + column) * 4;
      colour.forEach((v, i) => (pixels[offset + i] = Math.round(v)));
      pixels[offset + 3] = Math.round(alpha * 255);
    }
  }
  return png(size, pixels);
}

function png(size: number, rgba: Buffer): Buffer {
  const chunk = (type: string, data: Buffer) => {
    const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body));
    return Buffer.concat([length, body, crc]);
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header.set([8, 6, 0, 0, 0], 8); // 8-bit RGBA
  const rows = Buffer.alloc(size * (size * 4 + 1));
  for (let row = 0; row < size; row++)
    rgba.copy(
      rows,
      row * (size * 4 + 1) + 1,
      row * size * 4,
      (row + 1) * size * 4
    );
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(rows, {level: 9})),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

/** An ICO file holding PNG images. */
function ico(images: {size: number; data: Buffer}[]): Buffer {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({size, data}, i) => {
    const entry = 6 + i * 16;
    header[entry] = size;
    header[entry + 1] = size;
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

const root = new URL("..", import.meta.url).pathname;

writeFileSync(
  join(root, "src/data/mark.ts"),
  `// Generated by scripts/generate-mark.ts. Do not edit; run
// \`pnpm generate:mark\` instead. Path data in a 100-unit box, clipped to
// the circle at (50, 50) with radius 50.

export const markPaths = {
  7: "${pathData(seven)}",
  5: "${pathData(five)}"
} as const;
`
);
writeFileSync(join(root, "public/favicon.svg"), svgIcon(five, 4.2));
writeFileSync(
  join(root, "public/favicon.ico"),
  ico([
    {size: 16, data: rasterIcon(16, five, 4.2)},
    {size: 32, data: rasterIcon(32, five, 3)}
  ])
);
writeFileSync(
  join(root, "public/apple-touch-icon.png"),
  rasterIcon(180, seven, 1.7, {square: true, ring: 0.8})
);

console.log(
  "Field mark written: src/data/mark.ts, favicon.svg, favicon.ico, apple-touch-icon.png."
);

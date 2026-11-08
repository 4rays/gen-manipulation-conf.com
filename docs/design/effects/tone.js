// Shared by the effect sketches: how dark the page is at the viewport,
// from the surfaces under three sample points (0 light, 1 night). Only the
// night sections (programme, footer) darken the scene.
window.sceneTone = () => {
  let dark = 0;
  const points = [0.3, 0.5, 0.7];
  for (const f of points) {
    let el = document.elementFromPoint(innerWidth / 2, innerHeight * f);
    while (el && !/surface-(plaster|shade|blue|night)/.test(el.className))
      el = el.parentElement;
    if (el && /surface-night/.test(el.className)) dark += 1;
  }
  return dark / points.length;
};

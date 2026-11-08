import {createField, type Field} from "./field/field";
import {startGuard} from "./field/guard";

// Starts the page-wide Pull Field behind the landing page.
// - Motion allowed: the live field, paused while the tab is hidden.
// - Reduced motion or Save-Data: one settled, still frame of the field.
// - No canvas or no JavaScript: the rendered still in the HTML stays.
// The root exposes data-renderer="canvas|still" for verification.

export function initializePageScene(root: HTMLElement) {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const saveData = Boolean(
    (navigator as Navigator & {connection?: {saveData?: boolean}}).connection
      ?.saveData
  );

  let field: Field | null = null;
  let stopGuard = () => {};
  const mount = () => {
    stopGuard();
    field?.dispose();
    field = null;
    try {
      field = createField(root, {animate: !reduced.matches && !saveData});
      root.dataset.renderer = "canvas";
      const current = field;
      stopGuard = startGuard(() => current.sample());
    } catch {
      root.dataset.renderer = "still";
    }
  };

  mount();
  reduced.addEventListener("change", mount);
  document.addEventListener("visibilitychange", () =>
    field?.setRunning(!document.hidden)
  );
  window.addEventListener("pagehide", (event) => {
    if (event.persisted) field?.setRunning(false);
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) field?.setRunning(true);
  });
}

// Comparison switcher for the effect sketches. Keeps the scroll position
// (as a fraction of the page) when moving between variants.
(() => {
  const pages = [
    ["index.html", "Vantage room"],
    ["ice.html", "Blue Hour on the Ice"],
    ["field.html", "Pull Field"]
  ];
  const here = location.pathname.split("/").pop() || "index.html";
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Effect sketches");
  nav.style.cssText =
    "position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:60;display:flex;gap:2px;padding:4px;background:rgba(8,24,53,.86);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);font:500 14px/1 var(--font-sans);white-space:nowrap";
  const fraction = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    return max > 0 ? scrollY / max : 0;
  };
  for (const [href, label] of pages) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    const current = href === here;
    if (current) a.setAttribute("aria-current", "page");
    a.style.cssText = `padding:10px 14px;text-decoration:none;color:${current ? "#082246" : "#f1f5f8"};background:${current ? "#f1f5f8" : "transparent"}`;
    a.addEventListener("click", (event) => {
      event.preventDefault();
      location.href = `${href}#at=${fraction().toFixed(4)}`;
    });
    nav.append(a);
  }
  document.body.append(nav);
  const match = location.hash.match(/at=([\d.]+)/);
  if (match)
    addEventListener("load", () => {
      document.documentElement.style.scrollBehavior = "auto";
      const max = document.documentElement.scrollHeight - innerHeight;
      scrollTo(0, +match[1] * max);
      history.replaceState(null, "", location.pathname);
    });
})();

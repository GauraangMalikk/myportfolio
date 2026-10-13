/* ============================================================
   Compact card collections — deliberately independent from app.js
   ============================================================ */
(function () {
  "use strict";

  const mobileQuery = window.matchMedia("(max-width: 800px)");
  const extraItems = [...document.querySelectorAll("[data-collection-extra]")];

  document.querySelectorAll("[data-collection]").forEach(collection => {
    const control = document.querySelector(`[data-collection-toggle="${collection.id}"]`);
    if (!control) return;

    const name = collection.dataset.collectionName || "items";
    const label = control.querySelector("[data-collection-label]");
    const items = [...collection.children];
    const extras = extraItems.filter(item => item.dataset.collectionExtra === collection.id);
    let expanded = false;

    function visibleLimit() {
      const value = mobileQuery.matches
        ? collection.dataset.mobileLimit
        : collection.dataset.desktopLimit;
      return Number.parseInt(value, 10) || 1;
    }

    function render() {
      const limit = visibleLimit();
      const moreCount = Math.max(0, items.length - limit) + extras.length;

      items.forEach((item, index) => {
        item.hidden = !expanded && index >= limit;
      });
      extras.forEach(item => {
        item.hidden = !expanded;
      });

      control.hidden = moreCount === 0;
      control.setAttribute("aria-expanded", String(expanded));
      control.setAttribute(
        "aria-label",
        expanded ? `Show fewer ${name}` : `Show ${moreCount} more ${name}`
      );
      if (label) label.textContent = expanded ? `Show less ${name}` : `More ${name}`;
    }

    control.addEventListener("click", () => {
      expanded = !expanded;
      render();
    });

    const updateForViewport = () => {
      if (!expanded) render();
    };
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener("change", updateForViewport);
    } else {
      mobileQuery.addListener(updateForViewport);
    }

    render();
  });
})();

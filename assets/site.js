/* Owa Delivery Services — shared behaviour.
   One job only: keep --header-h equal to the real height of the sticky header.

   The header is sticky and its height changes between desktop (one row) and
   mobile (two rows, because the nav wraps underneath). Anything else that
   sticks — the menu's section pills — has to start below it, and a hard-coded
   number would be wrong on one of the two layouts. */
(function () {
  "use strict";
  var header = document.querySelector("header");
  if (!header) return;

  function measure() {
    var h = Math.round(header.getBoundingClientRect().height);
    if (h > 0) document.documentElement.style.setProperty("--header-h", h + "px");
  }

  measure();
  window.addEventListener("load", measure);
  window.addEventListener("orientationchange", measure);

  if (typeof ResizeObserver === "function") {
    new ResizeObserver(measure).observe(header);
  } else {
    window.addEventListener("resize", measure);
  }
})();

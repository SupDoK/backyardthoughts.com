/* Backyard Thoughts — cursor flower trail
   Spawns small SVG flowers that follow the cursor, fade, and drift down.
   Skipped on touch devices and when the user prefers reduced motion. */

(function () {
  if (typeof window === "undefined") return;

  // Respect accessibility & device preferences.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  // A small library of flower SVGs. Mixed colors from the meadow palette.
  var FLOWERS = [
    // Cherry blossom — pink
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
      '<g transform="translate(16 16)">' +
        '<ellipse cx="0" cy="-7" rx="3.5" ry="6" fill="#EDB9CC"/>' +
        '<ellipse cx="6.7" cy="-2.2" rx="3.5" ry="6" fill="#EDB9CC" transform="rotate(72)"/>' +
        '<ellipse cx="4.1" cy="5.7" rx="3.5" ry="6" fill="#EDB9CC" transform="rotate(144)"/>' +
        '<ellipse cx="-4.1" cy="5.7" rx="3.5" ry="6" fill="#EDB9CC" transform="rotate(216)"/>' +
        '<ellipse cx="-6.7" cy="-2.2" rx="3.5" ry="6" fill="#EDB9CC" transform="rotate(288)"/>' +
        '<circle r="2.4" fill="#F5D547"/>' +
      '</g></svg>',
    // Daisy — white & yellow
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
      '<g transform="translate(16 16)">' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#fff" stroke="#A8C76C" stroke-width="0.4"/>' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#fff" stroke="#A8C76C" stroke-width="0.4" transform="rotate(60)"/>' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#fff" stroke="#A8C76C" stroke-width="0.4" transform="rotate(120)"/>' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#fff" stroke="#A8C76C" stroke-width="0.4" transform="rotate(180)"/>' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#fff" stroke="#A8C76C" stroke-width="0.4" transform="rotate(240)"/>' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#fff" stroke="#A8C76C" stroke-width="0.4" transform="rotate(300)"/>' +
        '<circle r="2.6" fill="#F5D547"/>' +
      '</g></svg>',
    // Mini sunflower — yellow with brown center
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
      '<g transform="translate(16 16)">' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#F5D547"/>' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#F5D547" transform="rotate(45)"/>' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#F5D547" transform="rotate(90)"/>' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#F5D547" transform="rotate(135)"/>' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#F5D547" transform="rotate(180)"/>' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#F5D547" transform="rotate(225)"/>' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#F5D547" transform="rotate(270)"/>' +
        '<ellipse cx="0" cy="-8" rx="2.5" ry="6" fill="#F5D547" transform="rotate(315)"/>' +
        '<circle r="3.6" fill="#5A3E2B"/>' +
      '</g></svg>',
    // Tulip — soft pink/coral
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
      '<g transform="translate(16 18)">' +
        '<path d="M -6 -2 Q -6 -12 0 -12 Q 6 -12 6 -2 Q 4 -6 0 -6 Q -4 -6 -6 -2 Z" fill="#E76F5A"/>' +
        '<path d="M -4 -3 Q -4 -10 0 -10 Q 4 -10 4 -3 Z" fill="#C9758E" opacity="0.7"/>' +
        '<path d="M 0 -2 L 0 8" stroke="#6E8B3D" stroke-width="1.4" stroke-linecap="round"/>' +
        '<path d="M 0 4 Q 5 2 6 -2" stroke="#6E8B3D" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
      '</g></svg>',
    // Forget-me-not — blue with yellow center
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
      '<g transform="translate(16 16)">' +
        '<circle cx="0" cy="-6" r="3.2" fill="#B8DCE8"/>' +
        '<circle cx="5.7" cy="-1.9" r="3.2" fill="#B8DCE8"/>' +
        '<circle cx="3.5" cy="4.9" r="3.2" fill="#B8DCE8"/>' +
        '<circle cx="-3.5" cy="4.9" r="3.2" fill="#B8DCE8"/>' +
        '<circle cx="-5.7" cy="-1.9" r="3.2" fill="#B8DCE8"/>' +
        '<circle r="2" fill="#F5D547"/>' +
      '</g></svg>'
  ];

  var root = document.getElementById("cursor-flowers-root") || document.body;
  var lastSpawn = 0;
  var lastX = null, lastY = null;
  var THROTTLE_MS = 55;
  var MIN_MOVE = 14; // pixels — don't spawn unless cursor actually moves a bit

  function spawn(x, y) {
    var el = document.createElement("div");
    el.className = "cursor-flower";
    el.innerHTML = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
    // small random offset so they don't all stack
    var dx = (Math.random() - 0.5) * 16;
    var dy = (Math.random() - 0.5) * 10;
    el.style.left = (x + dx) + "px";
    el.style.top  = (y + dy) + "px";
    var spin = (Math.random() * 60 - 30);
    el.style.setProperty("--spin", spin + "deg");
    root.appendChild(el);
    // cleanup after animation
    setTimeout(function () {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }, 1600);
  }

  function onMove(e) {
    var now = Date.now();
    if (now - lastSpawn < THROTTLE_MS) return;
    if (lastX !== null) {
      var dx = e.clientX - lastX, dy = e.clientY - lastY;
      if ((dx * dx + dy * dy) < (MIN_MOVE * MIN_MOVE)) return;
    }
    lastSpawn = now;
    lastX = e.clientX; lastY = e.clientY;
    spawn(e.clientX, e.clientY);
  }

  document.addEventListener("mousemove", onMove, { passive: true });
})();

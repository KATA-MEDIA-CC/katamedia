// Ref-counted, iOS-safe scroll lock. Multiple owners (the Loader intro and the
// mobile menu) can request a lock; the page only unlocks when the last one
// releases. Uses the position:fixed technique because iOS Safari ignores
// overflow:hidden on <body>.

let count = 0;
let savedY = 0;

export function lockScroll() {
  if (typeof document === "undefined") return;
  if (count === 0) {
    savedY = window.scrollY;
    const b = document.body;
    b.style.position = "fixed";
    b.style.top = `-${savedY}px`;
    b.style.left = "0";
    b.style.right = "0";
    b.style.width = "100%";
    b.style.overflow = "hidden";
  }
  count += 1;
}

export function unlockScroll() {
  if (typeof document === "undefined") return;
  if (count === 0) return;
  count -= 1;
  if (count === 0) {
    const b = document.body;
    b.style.position = "";
    b.style.top = "";
    b.style.left = "";
    b.style.right = "";
    b.style.width = "";
    b.style.overflow = "";
    window.scrollTo(0, savedY);
  }
}

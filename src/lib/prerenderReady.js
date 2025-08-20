// src/lib/prerenderReady.js
export function signalPrerenderReady() {
  if (typeof document === 'undefined') return;
  // wait a tick (and one layout frame) so DOM/meta updates settle
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      document.dispatchEvent(new Event('app-rendered'))
    )
  );
}

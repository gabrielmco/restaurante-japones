// ==============================================
// KENSHŌ · Lenis Smooth Scroll Setup
// ==============================================

import Lenis from 'https://cdn.jsdelivr.net/npm/lenis@1.1.20/+esm';
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.7/+esm';

let lenis;

export function initLenis() {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  // Connect Lenis with GSAP ticker for perfect sync
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Disable GSAP lag smoothing for Lenis compatibility
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function scrollTo(target, options = {}) {
  if (!lenis) return;
  lenis.scrollTo(target, {
    offset: -80,
    duration: 1.6,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    ...options,
  });
}

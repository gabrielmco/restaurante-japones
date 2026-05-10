// ═══════════════════════════════════════════════
// KENSHŌ · Main Entry Point
// ═══════════════════════════════════════════════

import { initLenis } from './lenis.js';
import {
  initAllAnimations,
  initAboutAnimations,
  initContactAnimations,
  initMenuAnimations,
  initHeaderScroll,
} from './animations.js';
import { initMarquee } from './marquee.js';
import Swup from 'https://unpkg.com/swup@4?module';

// ── Swup with animation timing ──────────────────
const swup = new Swup({
  containers: ['#swup'],
  animationSelector: '[class*="transition-"]',
  animationDuration: 1400, // matches longest transition (1.4s)
});

// ── Active nav link ─────────────────────────────
function initActiveNav() {
  const links = document.querySelectorAll('.site-header nav a');
  const path = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach((link) => {
    link.classList.remove('active');
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── Cinematic Preloader ─────────────────────────
function initPreloader() {
  return new Promise((resolve) => {
    const preloader  = document.getElementById('preloader');
    const fill       = document.getElementById('preloader-fill');
    const countEl    = document.getElementById('preloader-count');

    // Force show for debugging/verification
    // if (!preloader || !fill || sessionStorage.getItem(visitedKey)) {
    if (!preloader || !fill) {
      if (preloader) preloader.style.display = 'none';
      resolve();
      return;
    }

    // sessionStorage.setItem(visitedKey, 'true');

    let progress   = 0;
    const MIN_TIME = 3200; // slightly longer for more "prestige"
    const started  = performance.now();

    const tick = () => {
      const elapsed  = performance.now() - started;
      const timeRatio = Math.min(elapsed / MIN_TIME, 1);

      // Exponential ease — fast start, slow crawl at end
      const eased = 1 - Math.pow(1 - timeRatio, 3);
      progress = eased * 100;

      fill.style.width = `${Math.min(progress, 100)}%`;
      if (countEl) countEl.textContent = Math.floor(Math.min(progress, 100));

      if (progress < 99.5) {
        requestAnimationFrame(tick);
      } else {
        fill.style.width = '100%';
        if (countEl) countEl.textContent = '100';

        // Hold at 100 for a beat, then dissolve out
        setTimeout(() => {
          preloader.classList.add('is-done');
          setTimeout(() => {
            preloader.style.display = 'none';
            resolve();
          }, 1200); // match preloader-exit animation
        }, 400);
      }
    };

    // Wait for fonts + critical hero assets
    const fontReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const imgReady  = new Promise((res) => {
      const heroMedia = document.querySelectorAll('img[fetchpriority="high"], video.hero-video');
      if (!heroMedia.length) { res(); return; }

      let loaded = 0;
      const check = () => { if (++loaded >= heroMedia.length) res(); };
      heroMedia.forEach((el) => {
        if (el.complete || el.readyState >= 3) { check(); return; }
        el.addEventListener('load',    check, { once: true });
        el.addEventListener('canplay', check, { once: true });
        el.addEventListener('error',   check, { once: true });
      });
      // Safety timeout — never block more than 3s
      setTimeout(res, 3000);
    });

    Promise.all([fontReady, imgReady]).then(() => {
      requestAnimationFrame(tick);
    });
  });
}

// ── Page Scripts Orchestration ──────────────────
function runPageScripts() {
  // Destroy old GSAP contexts to prevent duplicate triggers
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.killAll();
  }

  initActiveNav();
  window.scrollTo(0, 0);

  const path = window.location.pathname.split('/').pop() || 'index.html';

  if (path === 'index.html' || path === '') {
    initAllAnimations();
    initMarquee();
  } else if (path === 'menu.html') {
    initMenuAnimations();
    initHeaderScroll();
  } else if (path === 'about.html') {
    initAllAnimations();
    initAboutAnimations();
  } else if (path === 'contact.html') {
    initAllAnimations();
    initContactAnimations();
  }
}

// ── Boot ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLenis();

  initPreloader().then(() => {
    runPageScripts();
  });

  // Re-initialize page scripts after each Swup navigation
  swup.hooks.on('content:replace', () => {
    runPageScripts();
  });
});


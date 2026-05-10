// ==============================================
// HŌRAI · Main Entry Point
// ==============================================

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

// ─── Swup Integration ─────────────────────────
const swup = new Swup({
  containers: ['#swup'],
  animationSelector: '[class*="transition-"]',
});

// Mark active nav link
function initActiveNav() {
  const links = document.querySelectorAll('.site-header nav a');
  const path = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach((link) => {
    link.classList.remove('active');
    const href = link.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ─── Preloader ────────────────────────────────
function initPreloader() {
  return new Promise((resolve) => {
    const preloader = document.getElementById('preloader');
    const fill = document.getElementById('preloader-fill');

    if (!preloader || !fill || sessionStorage.getItem('horai_visited')) {
      if (preloader) preloader.style.display = 'none';
      resolve();
      return;
    }

    sessionStorage.setItem('horai_visited', 'true');
    let progress = 0;
    const target = 100;
    const tick = () => {
      const remaining = target - progress;
      progress += remaining * 0.08;
      fill.style.width = `${Math.min(progress, 100)}%`;

      if (progress < 99.5) {
        requestAnimationFrame(tick);
      } else {
        fill.style.width = '100%';
        window.setTimeout(() => {
          preloader.classList.add('is-done');
          window.setTimeout(() => {
            preloader.style.display = 'none';
            resolve();
          }, 600);
        }, 200);
      }
    };

    const fontReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const imgReady = new Promise((imgRes) => {
      const heroImgs = document.querySelectorAll('img[fetchpriority="high"], .hero-video');
      if (!heroImgs.length) { imgRes(); return; }

      let loaded = 0;
      const total = heroImgs.length;
      const check = () => { loaded++; if (loaded >= total) imgRes(); };

      heroImgs.forEach((el) => {
        if (el.complete || el.readyState >= 3) { check(); return; }
        el.addEventListener('load', check, { once: true });
        el.addEventListener('canplay', check, { once: true });
        el.addEventListener('error', check, { once: true });
      });

      window.setTimeout(imgRes, 2500);
    });

    Promise.all([fontReady, imgReady]).then(() => {
      requestAnimationFrame(tick);
    });
  });
}

// ─── Page Scripts Orchestration ───────────────
function runPageScripts() {
  // Kill all GSAP ScrollTriggers to prevent duplicates on navigation
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.killAll();
  }

  initActiveNav();

  // Scroll to top on page change
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

// ─── Initialize on DOM ready ──────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  initLenis();

  // Wait for preloader to finish, then run scripts for the first time
  initPreloader().then(() => {
    runPageScripts();
  });

  // Re-run scripts every time Swup replaces the page content
  swup.hooks.on('content:replace', () => {
    runPageScripts();
  });
});

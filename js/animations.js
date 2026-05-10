// ==============================================
// KENSHŌ · GSAP Animations (replaces Framer Motion)
// ==============================================

import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.7/+esm';
import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.7/ScrollTrigger.js/+esm';

gsap.registerPlugin(ScrollTrigger);

// ─── Page Load Animations ─────────────────────
export function initHeroAnimation() {
  const heroTitle = document.querySelector('.hero-title');
  const heroTaglineGroup = document.querySelector('.hero-tagline-group');
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');

  if (!heroTitle) return;

  const tl = gsap.timeline({ delay: 0.3 });

  tl.from(heroTitle, {
    opacity: 0,
    y: 60,
    duration: 1.4,
    ease: 'power3.out',
  })
  .from(heroTaglineGroup, {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power2.out',
  }, '-=0.8')
  .from(scrollIndicator, {
    opacity: 0,
    duration: 0.8,
    ease: 'power1.out',
  }, '-=0.4');
}

// ─── Header Scroll Behavior ───────────────────
export function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -80px',
    onUpdate: (self) => {
      if (self.progress > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    },
  });
}

// ─── Section Reveal Animations ────────────────
// Replaces Framer Motion: initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
export function initScrollReveal() {
  // Generic fade-up reveal for all .reveal elements
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      filter: 'blur(4px)',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });

  // Stagger children
  const staggerGroups = document.querySelectorAll('.reveal-stagger');
  staggerGroups.forEach((group) => {
    const children = group.children;
    gsap.from(children, {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: group,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Section titles with blur
  const titles = document.querySelectorAll('.reveal-title');
  titles.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 60,
      filter: 'blur(8px)',
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

// ─── Parallax Effects ─────────────────────────
// Replaces Framer Motion useScroll parallax
export function initParallax() {
  // Flavors section background parallax
  const flavorsBg = document.querySelector('.flavors-bg img');
  if (flavorsBg) {
    gsap.to(flavorsBg, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.flavors-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // Sushi section image — entrance from right with clip-path reveal
  const sushiWrap = document.querySelector('.sushi-image-wrap');
  if (sushiWrap) {
    gsap.from(sushiWrap, {
      opacity: 0,
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.4,
      ease: 'power3.out',
      clearProps: 'clipPath,opacity',
      scrollTrigger: {
        trigger: '.sushi-section',
        start: 'top 60%',
        once: true,
      },
    });
  }

  const sushiImage = document.querySelector('.sushi-image-wrap img');
  if (sushiImage) {
    gsap.to(sushiImage, {
      yPercent: -5,
      scale: 1.02,
      ease: 'none',
      scrollTrigger: {
        trigger: '.sushi-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }

  // Page hero parallax (inner pages)
  const pageHeroBg = document.querySelector('.page-hero-bg img');
  if (pageHeroBg) {
    gsap.to(pageHeroBg, {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: '.page-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
}

// ─── Footer Ghost Text Scrub ──────────────────
export function initFooterAnimation() {
  const ghost = document.querySelector('.footer-ghost span');
  if (!ghost) return;

  gsap.fromTo(ghost,
    { opacity: 0.01, y: 40 },
    {
      opacity: 0.04,
      y: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.site-footer',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 2,
      },
    }
  );
}

// ─── Reservation Form Stagger ─────────────────
export function initFormAnimation() {
  const form = document.querySelector('.reservation-form');
  if (!form) return;

  const formRows = Array.from(form.children);
  if (formRows.length > 0) {
    gsap.from(formRows, {
      y: 18,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power2.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: form, start: 'top 86%', once: true },
    });
  }
}

// ─── About Story Reveal ───────────────────────
export function initAboutAnimations() {
  // About hero entrance
  const aboutHeroContent = document.querySelector('.about-hero__content');
  if (aboutHeroContent) {
    const aboutChildren = aboutHeroContent.querySelectorAll('.about-stars, .about-hero__title-row h1');
    gsap.from(aboutChildren, {
      opacity: 0,
      y: 50,
      filter: 'blur(6px)',
      duration: 1.4,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.3,
    });
  }

  // About hero media parallax
  const aboutMedia = document.querySelector('.about-hero__media img');
  if (aboutMedia) {
    gsap.to(aboutMedia, {
      yPercent: -9,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  const storyImg = document.querySelector('.story-img');
  const storyText = document.querySelector('.story-text');

  if (storyImg) {
    gsap.from(storyImg, {
      opacity: 0,
      x: -60,
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: storyImg,
        start: 'top 80%',
        once: true,
      },
    });
  }

  if (storyText) {
    const children = Array.from(storyText.children);
    gsap.from(children, {
      opacity: 0,
      x: 40,
      duration: 1,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: storyText,
        start: 'top 80%',
        once: true,
      },
    });
  }

  initAboutCounters();
  initAboutTestimonialCarousel();
}

function initAboutCounters() {
  const counters = document.querySelectorAll('.about-stats .count-up');
  if (!counters.length) return;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.count || 0);
    const pad = Number(counter.dataset.pad || String(target).length);
    const state = { value: 0 };

    gsap.to(state, {
      value: target,
      duration: 4.6,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 88%',
        once: true,
      },
      onUpdate: () => {
        counter.textContent = String(Math.round(state.value)).padStart(pad, '0');
      },
    });
  });
}

function initAboutTestimonialCarousel() {
  const root = document.querySelector('[data-testimonial-carousel]');
  if (!root) return;

  const slides = [
    {
      text: '“Jantar no Kenshō foi como entrar em uma história cuidadosamente composta. Do primeiro prato ao último, cada detalhe parecia pensado e refinado.”',
      name: 'Aanya R.',
      role: 'Avaliação de cliente',
    },
    {
      text: '“O Kenshō tem uma elegância rara. Os sabores eram intensos, mas perfeitamente equilibrados, e o serviço pareceu intuitivo em vez de performático.”',
      name: 'Sofia M.',
      role: 'Avaliação de cliente',
    },
    {
      text: '“O salão, o ritmo do serviço, a precisão silenciosa de cada etapa. Tudo parecia profundamente pensado, mas nunca distante.”',
      name: 'Mateo L.',
      role: 'Avaliação de cliente',
    },
  ];

  const media = document.querySelectorAll('.about-testimonial__media');
  const dots = document.querySelectorAll('.about-testimonial__dots [data-dot]');
  const text = root.querySelector('[data-review-text]');
  const name = root.querySelector('[data-review-name]');
  const role = root.querySelector('[data-review-role]');
  const prev = document.querySelector('.about-testimonial__arrow--prev');
  const next = document.querySelector('.about-testimonial__arrow--next');
  let active = 0;
  let timer;

  const setSlide = (index) => {
    active = (index + slides.length) % slides.length;
    const slide = slides[active];

    media.forEach((item, itemIndex) => {
      item.classList.toggle('is-active', itemIndex === active);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === active);
    });

    gsap.to([text, name, role], {
      opacity: 0,
      y: 18,
      filter: 'blur(3px)',
      duration: 0.42,
      ease: 'expo.out',
      onComplete: () => {
        text.textContent = slide.text;
        name.textContent = slide.name;
        role.textContent = slide.role;

        gsap.to([text, name, role], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          stagger: 0.04,
          ease: 'expo.out',
        });
      },
    });
  };

  const restart = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => setSlide(active + 1), 4000);
  };

  prev?.addEventListener('click', () => {
    setSlide(active - 1);
    restart();
  });

  next?.addEventListener('click', () => {
    setSlide(active + 1);
    restart();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      setSlide(Number(dot.dataset.dot || 0));
      restart();
    });
  });

  restart();
}

// ─── Contact Info Animate ─────────────────────
export function initContactAnimations() {
  // Contact hero entrance
  const contactHero = document.querySelector('.contact-hero__content');
  if (contactHero) {
    const heroChildren = contactHero.children;
    gsap.from(heroChildren, {
      opacity: 0,
      y: 40,
      filter: 'blur(6px)',
      duration: 1.2,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.3,
    });
  }

  // Contact hero media parallax
  const contactMedia = document.querySelector('.contact-hero__media img');
  if (contactMedia) {
    gsap.to(contactMedia, {
      yPercent: -9,
      ease: 'none',
      scrollTrigger: {
        trigger: '.contact-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // Contact blocks stagger
  const blocks = document.querySelectorAll('.contact-block');
  gsap.from(blocks, {
    opacity: 0,
    y: 30,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.contact-info',
      start: 'top 80%',
      once: true,
    },
  });

  // Contact form inputs reveal
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('.contact-input, .contact-submit');
    gsap.from(inputs, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: { trigger: contactForm, start: 'top 80%', once: true },
    });
  }
}

// ─── Menu Page Animations ─────────────────────
export function initMenuAnimations() {
  // Hero title entrance
  const eyebrow = document.querySelector('.menu-hero__eyebrow');
  const heading = document.querySelector('.menu-hero__heading');
  const scrollCue = document.querySelector('.menu-hero__scroll-cue');
  const cards = document.querySelectorAll('.menu-hero__card');
  const isCompact = window.matchMedia('(max-width: 1023px)').matches;

  if (eyebrow && heading) {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(eyebrow, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
      .to(heading, { opacity: 1, duration: 1.4, ease: 'power3.out' }, '-=0.6')
      .to(scrollCue, { opacity: 1, duration: 0.8 }, '-=0.4');

    // Floating cards
    cards.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        duration: 1.2,
        delay: 0.5 + i * 0.15,
        ease: 'power2.out',
      });
    });

    if (!isCompact) {
      // Smooth bidirectional parallax — title drifts up gently as you scroll
      gsap.to('.menu-hero__title-wrap', {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.menu-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Scroll cue fades out
      gsap.to('.menu-hero__scroll-cue', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.menu-hero',
          start: 'top top',
          end: '+=40vh',
          scrub: 1,
        },
      });
    } else {
      gsap.set('.menu-hero__title-wrap', { clearProps: 'transform' });
    }
  }

  // Dish items scroll reveal
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach((item) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      clearProps: 'transform',
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
        once: true,
      },
    });
  });

  // Category headers
  document.querySelectorAll('.menu-category__header').forEach((hdr) => {
    gsap.from(hdr, {
      opacity: 0,
      x: -30,
      duration: 1,
      ease: 'power2.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: hdr, start: 'top 85%', once: true },
    });
  });

  // Sidebar active highlight on scroll
  const categories = document.querySelectorAll('.menu-category');
  const sidebarBtns = document.querySelectorAll('.menu-sidebar__btn');

  categories.forEach((cat) => {
    ScrollTrigger.create({
      trigger: cat,
      start: 'top 40%',
      end: 'bottom 40%',
      onEnter: () => setActive(cat.dataset.cat),
      onEnterBack: () => setActive(cat.dataset.cat),
    });
  });

  function setActive(cat) {
    sidebarBtns.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.target === cat);
    });
  }

  // Sidebar click → smooth scroll
  sidebarBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(`menu-cat-${btn.dataset.target}`);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Reservation section
  const resTitle = document.querySelector('.reservation-section__title');
  const resForm = document.querySelector('.reservation-form');

  if (resTitle) {
    gsap.from(resTitle, {
      opacity: 0,
      filter: 'blur(8px)',
      y: 30,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: resTitle, start: 'top 80%', once: true },
    });
  }
  if (resForm) {
    const formRows = resForm.querySelectorAll('.reservation-form__grid, textarea, .reservation-form__submit');
    gsap.from(formRows, {
      y: 18,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power2.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: resForm, start: 'top 86%', once: true },
    });
  }
}

// ─── Initialize all (home) ────────────────────
export function initAllAnimations() {
  initHeroAnimation();
  initHeaderScroll();
  initScrollReveal();
  initParallax();
  initFooterAnimation();
  initFormAnimation();
}

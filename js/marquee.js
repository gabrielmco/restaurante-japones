// ==============================================
// HŌRAI · Infinite Marquee (replaces Framer Motion translate loop)
// ==============================================

export function initMarquee() {
  const tracks = document.querySelectorAll('.marquee-track');
  if (tracks.length === 0) return;

  tracks.forEach((track, index) => {
    const inner = track.querySelector('.marquee-inner');
    if (!inner) return;

    const cards = Array.from(inner.querySelectorAll('.marquee-card'));
    if (cards.length === 0) return;

    cards.forEach((card) => {
      inner.appendChild(card.cloneNode(true));
      inner.appendChild(card.cloneNode(true));
    });

    const direction = index % 2 === 0 ? -1 : 1;
    const speed = 0.58;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let setWidth = 0;
    let xPos = 0;
    let isDragging = false;
    let isHovering = false;
    let rafId;

    const measure = () => {
      const first = cards[0].getBoundingClientRect();
      const last = cards[cards.length - 1].getBoundingClientRect();
      setWidth = Math.max(1, last.right - first.left);
      xPos = direction === -1 ? normalizeX(xPos) : normalizeX(xPos || -setWidth / 2);
      inner.style.transform = `translate3d(${xPos}px, 0, 0)`;
    };

    const normalizeX = (value) => {
      if (!setWidth) return value;
      while (value <= -setWidth) value += setWidth;
      while (value > 0) value -= setWidth;
      return value;
    };

    function tick() {
      if (!isDragging && !prefersReducedMotion) {
        xPos += direction * (isHovering ? speed * 0.12 : speed);
        xPos = normalizeX(xPos);
        inner.style.transform = `translate3d(${xPos}px, 0, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    }

    let pointerStartX = 0;
    let startXPos = 0;

    track.addEventListener('pointerdown', (e) => {
      isDragging = true;
      pointerStartX = e.clientX;
      startXPos = xPos;
      track.setPointerCapture?.(e.pointerId);
      track.style.cursor = 'grabbing';
      e.preventDefault();
    });

    track.addEventListener('pointerenter', () => {
      isHovering = true;
    });

    track.addEventListener('pointerleave', () => {
      isHovering = false;
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const delta = e.clientX - pointerStartX;
      xPos = normalizeX(startXPos + delta);
      inner.style.transform = `translate3d(${xPos}px, 0, 0)`;
    });

    window.addEventListener('pointerup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      try {
        track.releasePointerCapture?.(e.pointerId);
      } catch {
        // The pointer can be released by the browser when the page loses focus.
      }
      track.style.cursor = 'grab';
    });

    window.addEventListener('resize', () => {
      window.cancelAnimationFrame(rafId);
      requestAnimationFrame(() => {
        measure();
        rafId = requestAnimationFrame(tick);
      });
    });

    requestAnimationFrame(() => {
      measure();
      rafId = requestAnimationFrame(tick);
    });
  });
}

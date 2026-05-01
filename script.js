// İstasyon 1896 — interactivity

(() => {
  // ---- nav shrink on scroll
  const nav = document.getElementById('nav');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- reveal-on-scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          const delay = (i % 6) * 80;
          setTimeout(() => e.target.classList.add('in-view'), delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));

    // fail-safe: ensure everything reveals after 2.5s even if IO didn't fire
    setTimeout(() => {
      revealEls.forEach(el => el.classList.add('in-view'));
    }, 2500);
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // ---- bento filter chips (visual only)
  const chips = document.querySelectorAll('.chip');
  const bento = document.querySelector('.bento');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      // subtle re-mount animation
      if (bento) {
        bento.style.opacity = '0';
        bento.style.transform = 'translateY(8px)';
        setTimeout(() => {
          bento.style.transition = 'opacity 500ms ease, transform 500ms ease';
          bento.style.opacity = '1';
          bento.style.transform = 'translateY(0)';
        }, 100);
      }
    });
  });

  // ---- atmosphere strip drag-to-scroll on desktop
  const strip = document.querySelector('.strip');
  if (strip) {
    let isDown = false, startX = 0, scrollLeft = 0;
    strip.addEventListener('mousedown', e => {
      isDown = true;
      strip.style.cursor = 'grabbing';
      startX = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
    });
    strip.addEventListener('mouseleave', () => { isDown = false; strip.style.cursor = ''; });
    strip.addEventListener('mouseup', () => { isDown = false; strip.style.cursor = ''; });
    strip.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - strip.offsetLeft;
      const walk = (x - startX) * 1.4;
      strip.scrollLeft = scrollLeft - walk;
    });
  }

  // ---- hero parallax (subtle)
  const heroBgEl = document.querySelector('.hero-bg video, .hero-bg img');
  if (heroBgEl && window.matchMedia('(min-width: 1024px)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBgEl.style.transform = `scale(1.06) translateY(${y * 0.15}px)`;
      }
    }, { passive: true });
  }

  // ---- live status pill (open/closed based on real time)
  const statusPill = document.querySelector('.status-pill');
  if (statusPill) {
    const updateStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday
      const hour = now.getHours();
      const isSunday = day === 0;
      const closeHour = isSunday ? 22 : 23;
      const openHour = 7;
      const isOpen = hour >= openHour && hour < closeHour;

      const dot = statusPill.querySelector('.dot');
      if (isOpen) {
        statusPill.innerHTML = '<span class="dot"></span> AÇIK · ' +
          (isSunday ? '07:00–22:00' : '07:00–23:00');
        statusPill.style.color = '';
        statusPill.querySelector('.dot').style.background = '#6BCB77';
        statusPill.querySelector('.dot').style.boxShadow = '0 0 8px #6BCB77';
      } else {
        statusPill.innerHTML = '<span class="dot"></span> KAPALI · 07:00\'DA AÇIK';
        statusPill.querySelector('.dot').style.background = '#A04E2C';
        statusPill.querySelector('.dot').style.boxShadow = '0 0 8px #A04E2C';
      }
    };
    updateStatus();
    setInterval(updateStatus, 60_000);
  }

  // ---- mobile burger
  const burger = document.querySelector('.nav-burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      document.querySelector('.nav-links')?.classList.toggle('open');
    });
  }

  // ---- custom cursor (desktop with hover support only)
  const supportsHoverDesktop =
    window.matchMedia('(hover: hover)').matches &&
    window.matchMedia('(min-width: 1024px)').matches;

  if (supportsHoverDesktop) {
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;

    const tick = () => {
      // dot follows immediately, ring lerps
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dot)  dot.style.transform  = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      if (dot)  dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      if (dot)  dot.style.opacity = '1';
      if (ring) ring.style.opacity = '1';
    });

    const interactives = 'a, button, .tile, .ig-tile, .chip, .scroll-cue, [role="tab"], input, textarea, select';
    document.querySelectorAll(interactives).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }
})();

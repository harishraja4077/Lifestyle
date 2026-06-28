/* =====================================================
   STACKLY — PREMIUM ANIMATION ENGINE
   animations.js
===================================================== */
(function () {
  'use strict';

  /* ── 1. PAGE LOADER ──────────────────────────────── */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
        document.body.style.overflow = '';
      }, 1500);
    });
    document.body.style.overflow = 'hidden';
  }

  /* ── 2. SCROLL PROGRESS BAR ──────────────────────── */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (scrolled / total * 100) + '%';
    }, { passive: true });
  }

  /* ── 3. CURSOR SPOTLIGHT ─────────────────────────── */
  const spotlight = document.getElementById('cursor-spotlight');
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
      spotlight.style.left = e.clientX + 'px';
      spotlight.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

  /* ── 4. HERO PARTICLES ───────────────────────────── */
  const heroParticles = document.getElementById('hero-particles');
  if (heroParticles) {
    const count = 22;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'hparticle';
      const size = Math.random() * 6 + 3;
      const dur  = Math.random() * 10 + 8;
      const del  = Math.random() * 8;
      p.style.cssText = `
        width:${size}px;height:${size}px;
        left:${Math.random()*100}%;
        animation-duration:${dur}s;
        animation-delay:-${del}s;
        opacity:${Math.random()*.6+.2};
      `;
      heroParticles.appendChild(p);
    }
  }

  /* ── 5. GLASSMORPHISM NAVBAR ON SCROLL ───────────── */
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.add('glass-nav');
      } else {
        header.classList.remove('glass-nav');
      }
    }, { passive: true });
  }

  /* ── 6. STAGGER SCROLL REVEAL ─────────────────────── */
  const revealTargets = document.querySelectorAll(
    '.service-card, .program-card, .blog-card, .stat-card, .testimonial-box, .us-glass-card, .us-dark-card, .us-badge, .us-author-card, .us-metric'
  );

  revealTargets.forEach((el, i) => {
    el.classList.add('anim-reveal');
    const delay = (i % 4) * 0.1;
    el.style.transitionDelay = delay + 's';
  });

  const sectionHeadings = document.querySelectorAll(
    '.services h2, .programs h2, .blog-preview h2, .stats h2, .testimonial-preview h2'
  );
  sectionHeadings.forEach(el => {
    el.classList.add('anim-reveal');
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.anim-reveal, .anim-reveal-left, .anim-reveal-right, .anim-reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });

  /* ── 7. SECTION HEADING SPLIT TEXT ───────────────── */
  function splitHeading(el) {
    const text = el.innerText;
    el.innerHTML = '';
    el.classList.add('split-heading');
    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.style.transitionDelay = (i * 0.04) + 's';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(span);
    });
  }

  const splitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        splitObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.split-heading').forEach(el => splitObserver.observe(el));

  /* ── 8. 3D CARD TILT ─────────────────────────────── */
  function initTilt(cards) {
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left - rect.width  / 2;
        const y      = e.clientY - rect.top  - rect.height / 2;
        const rotX   = -(y / rect.height) * 10;
        const rotY   =  (x / rect.width)  * 10;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .5s cubic-bezier(.22,.68,0,1.2)';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform .1s linear';
      });
    });
  }

  initTilt(document.querySelectorAll('.service-card, .program-card, .blog-card, .us-glass-card'));

  /* ── 9. CARD CLICK RIPPLE ────────────────────────── */
  document.querySelectorAll('.service-card, .program-card, .blog-card, .stat-card').forEach(card => {
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.addEventListener('click', e => {
      const r    = document.createElement('span');
      r.className = 'card-ripple';
      const rect = card.getBoundingClientRect();
      r.style.left = (e.clientX - rect.left) + 'px';
      r.style.top  = (e.clientY - rect.top)  + 'px';
      card.appendChild(r);
      setTimeout(() => r.remove(), 700);
    });
  });

  /* ── 10. FLOATING ORBS in SECTIONS ───────────────── */
  const orbSections = document.querySelectorAll('.services, .programs, .blog-preview, .stats');
  orbSections.forEach(sec => {
    [
      { cls: 'orb-green', w: 300, h: 300, top: '10%',  left: '-8%', dur: 7 },
      { cls: 'orb-mint',  w: 200, h: 200, top: '60%',  left: '90%', dur: 9 },
    ].forEach(o => {
      const orb = document.createElement('div');
      orb.classList.add('floating-orb', o.cls);
      orb.style.cssText = `
        width:${o.w}px; height:${o.h}px;
        top:${o.top}; left:${o.left};
        animation-duration:${o.dur}s;
      `;
      sec.style.position = 'relative';
      sec.style.overflow = 'hidden';
      sec.insertBefore(orb, sec.firstChild);
    });
  });

  /* ── 11. SECTION UNDERLINE REVEAL ────────────────── */
  document.querySelectorAll('.services h2, .programs h2, .blog-preview h2').forEach(h => {
    h.classList.add('section-underline');
    const underlineObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          underlineObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    underlineObs.observe(h);
  });

  /* ── 12. FOOTER LINK LEFT-PADDING RESET for non-anchor ── */
  // Patch: prevent footer h2 from getting underline arrow
  document.querySelectorAll('.footer-box h2').forEach(el => {
    el.style.position = 'static';
  });

  /* ── 13. MAGNETIC BUTTONS ─────────────────────────── */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.btn, .us-btn, .hero-btn-primary, .hero-btn-outline').forEach(btn => {
      btn.classList.add('magnetic-btn');
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x    = (e.clientX - rect.left - rect.width  / 2) * 0.28;
        const y    = (e.clientY - rect.top  - rect.height / 2) * 0.28;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ── 14. HERO CONTENT PARALLAX ON SCROLL ────────── */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroContent.style.transform = `translateY(${y * 0.22}px)`;
        heroContent.style.opacity   = 1 - (y / window.innerHeight) * 1.2;
      }
    }, { passive: true });
  }

  /* ── 15. STAT CARD PULSE ON COUNTER COMPLETE ─────── */
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    card.classList.add('anim-reveal-scale');
    revealObserver.observe(card);
  });

  /* ── 16. SMOOTH NAV LINK TRANSITIONS ─────────────── */
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function () {
      // Small scale pop on click
      this.style.transform = 'scale(.93)';
      setTimeout(() => this.style.transform = '', 180);
    });
  });

})();

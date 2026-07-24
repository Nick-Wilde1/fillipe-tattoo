// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Stagger delay (per-card, not on parent) ----------
document.querySelectorAll('[data-stagger]').forEach((group) => {
  const items = group.querySelectorAll('.reveal');
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 140}ms`;
  });
});

// ---------- Reveal on scroll ----------
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('is-visible');
        if (el.matches('.gallery__card, .feature-card')) {
          setTimeout(() => el.classList.add('tilt-ready'), 2300);
        }
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.08, rootMargin: '-5% 0px -5% 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ---------- Hover tilt on gallery/feature cards ----------
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!reduceMotion && canHover) {
  document.querySelectorAll('.gallery__card, .feature-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      if (!card.classList.contains('tilt-ready')) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ---------- Nav scroll state ----------
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 80);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Mobile nav toggle ----------
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  burger.classList.toggle('is-open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ---------- WhatsApp floating button (visible after leaving hero) ----------
const hero = document.getElementById('hero');
const whatsappFloat = document.getElementById('whatsappFloat');

const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      whatsappFloat.classList.toggle('is-visible', !entry.isIntersecting);
    });
  },
  { threshold: 0 }
);
heroObserver.observe(hero);

// ---------- Autoplay videos only while visible ----------
const autoVideos = document.querySelectorAll('.auto-video');

const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  },
  { threshold: 0.25 }
);

autoVideos.forEach((video) => videoObserver.observe(video));

// ---------- Hero parallax ----------
const heroParallax = document.getElementById('heroParallax');
let ticking = false;

const updateParallax = () => {
  const y = window.scrollY;
  if (y < window.innerHeight * 1.2) {
    heroParallax.style.transform = `translateY(${y * 0.3}px)`;
  }
  ticking = false;
};

window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  },
  { passive: true }
);

// ---------- Scroll progress bar (fallback for browsers w/o scroll-timeline) ----------
const progress = document.getElementById('scrollProgress');
const supportsScrollTimeline =
  CSS && CSS.supports && CSS.supports('animation-timeline: scroll()');

if (progress && !supportsScrollTimeline) {
  let pTicking = false;
  const updateProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? h.scrollTop / max : 0;
    progress.style.transform = `scaleX(${p})`;
    pTicking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!pTicking) {
        requestAnimationFrame(updateProgress);
        pTicking = true;
      }
    },
    { passive: true }
  );
  updateProgress();
}

// ---------- Hero cursor spotlight ----------
const heroSpotlight = document.getElementById('heroSpotlight');
if (heroSpotlight && !reduceMotion && canHover) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    heroSpotlight.style.setProperty('--mx', `${mx}%`);
    heroSpotlight.style.setProperty('--my', `${my}%`);
  });
}

// ---------- Magnetic buttons ----------
if (!reduceMotion && canHover) {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${(mx * 0.25).toFixed(1)}px, ${(my * 0.35).toFixed(1)}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ---------- Nav active section highlight ----------
const navAnchors = Array.from(navLinks.querySelectorAll('a'));
const sectionsById = {};
navAnchors.forEach((a) => {
  const id = a.getAttribute('href').slice(1);
  const sec = document.getElementById(id);
  if (sec) sectionsById[id] = a;
});

const navSpy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach((a) => a.classList.remove('is-active'));
        if (sectionsById[id]) sectionsById[id].classList.add('is-active');
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);

Object.keys(sectionsById).forEach((id) => {
  const sec = document.getElementById(id);
  if (sec) navSpy.observe(sec);
});

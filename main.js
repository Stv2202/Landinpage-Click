/* ============================================
   CLICK AGENCIA — main.js
   ============================================ */

// ---- Navbar: scroll effect ----
const navbar = document.getElementById('navbar');

function handleNavScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavScroll, { passive: true });

// ---- Navbar: botón "Hablemos" → scroll a CTA ----
const btnCta = document.querySelector('.js-scroll-cta');
if (btnCta) {
  btnCta.addEventListener('click', () => {
    document.getElementById('cta').scrollIntoView({ behavior: 'smooth' });
  });
}

// ---- Hamburger / menú móvil ----
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
}

hamburger.addEventListener('click', toggleMobileMenu);

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.js-mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ---- Scroll reveal ----
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Se anima una sola vez
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));
}

// ---- Smooth scroll para anclas internas ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ---- Highlight enlace activo en la navbar ----
function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => observer.observe(section));
}

// ---- Video hover: play/pause (desktop) + autoplay muted (móvil) ----
function initVideoHover() {
  const isMobile = window.matchMedia('(hover: none)').matches;

  document.querySelectorAll('.work-item').forEach(item => {
    const video = item.querySelector('video');
    if (!video) return;

    if (isMobile) {
      // En móvil: autoplay silencioso para que se vea algo
      video.muted    = true;
      video.loop     = true;
      video.setAttribute('playsinline', '');
      video.play().catch(() => {});

      // Tap para alternar play/pause
      item.addEventListener('click', () => {
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });

    } else {
      // En desktop: play al hover, pause al salir
      item.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
      });
      item.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSmoothScroll();
  initActiveLink();
  initVideoHover();
});
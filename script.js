document.addEventListener('DOMContentLoaded', () => {
  // 1. GESTIONE MENU MOBILE (HAMBURGER)
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      if (navLinks.classList.contains('active')) {
        menuBtn.textContent = '✕';
      } else {
        menuBtn.textContent = '☰';
      }
    });
  }

  // 2. EFFETTO FADE-IN ALLO SCROLL
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length > 0) {
    const appearOptions = { threshold: 0.1 };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  }

  // 3. LOGICA LIGHTBOX (ZOOM LOCANDINA)
  const thumb = document.getElementById('locandinaThumb');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.querySelector('.lightbox-close');

  if (thumb && lightbox && lightboxImg && closeBtn) {
    function openLightbox() {
      lightboxImg.src = thumb.src;
      lightboxImg.alt = thumb.alt;
      lightbox.classList.add('visible');
      lightbox.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
      document.addEventListener('keydown', onKeyDown);
    }

    function closeLightbox() {
      lightbox.classList.remove('visible');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
      thumb.focus();
      document.removeEventListener('keydown', onKeyDown);
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') closeLightbox();
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === closeBtn) {
        e.preventDefault();
        closeLightbox();
      }
    }

    thumb.addEventListener('click', openLightbox);
    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox();
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    lightboxImg.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
});
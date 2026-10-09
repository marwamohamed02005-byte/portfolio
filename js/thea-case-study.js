/**
 * MOHAMMED MARWA — THEA PERFUME CASE STUDY SCRIPT
 * Interactive features: Reading progress, Lightbox zoom, Graceful fallback
 */

(function () {
  'use strict';

  // Global fallback image handler for case study
  window.handleImageError = function (img, title, path) {
    if (!img || img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = 'true';

    const width = img.getAttribute('width') || 1200;
    const height = img.getAttribute('height') || 800;
    const labelTitle = title || 'Project Asset Slot';
    const filePath = path || img.getAttribute('src') || '';

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
        <rect width="100%" height="100%" fill="#1A1714"/>
        <rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="#352D26" stroke-width="1.5" stroke-dasharray="6,6"/>
        <circle cx="${width / 2}" cy="${height / 2 - 40}" r="28" fill="#29221C" stroke="#A58B70" stroke-width="1.5"/>
        <path d="M${width / 2 - 12} ${height / 2 - 32} L${width / 2 + 12} ${height / 2 - 32} L${width / 2 + 8} ${height / 2 - 44} L${width / 2} ${height / 2 - 38} L${width / 2 - 6} ${height / 2 - 48} Z" fill="#A58B70"/>
        <text x="50%" y="${height / 2 + 20}" fill="#F4EFE7" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="600" text-anchor="middle">${labelTitle}</text>
        <text x="50%" y="${height / 2 + 50}" fill="#A58B70" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" text-anchor="middle">Slot: ${filePath}</text>
      </svg>
    `.trim();

    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
  };

  // Reading progress indicator
  function initProgressBar() {
    const bar = document.getElementById('caseProgressBar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    }, { passive: true });
  }

  // Lightbox Modal for Case Study Images
  function initLightbox() {
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const triggerFrames = document.querySelectorAll('.case-showcase__image-frame');

    if (!lightbox || !lightboxImg) return;

    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || 'Case Study Asset View';
      if (lightboxCaption) lightboxCaption.textContent = alt || '';
      lightbox.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('is-active');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightboxImg.src = '';
      }, 300);
    }

    triggerFrames.forEach(frame => {
      frame.addEventListener('click', () => {
        const img = frame.querySelector('img');
        if (img) {
          openLightbox(img.src, img.getAttribute('alt'));
        }
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox__image-wrapper')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    initLightbox();
  });
})();

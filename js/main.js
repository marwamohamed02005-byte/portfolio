/**
 * MOHAMMED MARWA — LOGO & BRAND IDENTITY DESIGNER
 * Main Interactive Script (Vanilla JavaScript)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. CONFIGURATION & EDITABLE DATA SETTINGS
     ========================================================================== */
  const SITE_CONFIG = {
    designerName: 'Mohammed Marwa',
    designerTitle: 'Logo & Brand Identity Designer',
    email: 'marwaelkawas4@gmail.com',
    behanceTheaUrl: 'https://www.behance.net/gallery/256492125/THEA-PERFUME',
    linkedInUrl: 'https://www.linkedin.com/in/marwa-mohamed2?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    // WhatsApp configuration: Leave blank until confirmed in international format (e.g. "+201XXXXXXXXX")
    whatsAppNumber: '',
  };

  /**
   * Editable Skills Data (percentages easily adjustable here)
   */
  const SKILLS_DATA = [
    // Branding & Identity
    { name: 'Visual Identity Design', category: 'branding', percent: 95 },
    { name: 'Logo Design', category: 'branding', percent: 95 },
    { name: 'Brand Guidelines', category: 'branding', percent: 90 },
    { name: 'Typography', category: 'branding', percent: 88 },
    { name: 'Color Theory', category: 'branding', percent: 92 },
    { name: 'Visual Consistency', category: 'branding', percent: 94 },

    // Brand Applications
    { name: 'Packaging Design', category: 'applications', percent: 90 },
    { name: 'Business Card Design', category: 'applications', percent: 92 },
    { name: 'Menu Design', category: 'applications', percent: 85 },
    { name: 'Print Design', category: 'applications', percent: 88 },
    { name: 'Mockups & Presentations', category: 'applications', percent: 92 },

    // Digital Design
    { name: 'Social Media Design', category: 'digital', percent: 92 },
    { name: 'Advertising Creatives', category: 'digital', percent: 88 },
    { name: 'Layout Design', category: 'digital', percent: 90 },
    { name: 'Image Composition', category: 'digital', percent: 86 },

    // Marketing
    { name: 'Marketing Campaign Planning', category: 'marketing', percent: 82 },
    { name: 'Social Media Content', category: 'marketing', percent: 88 },
    { name: 'Creative Communication', category: 'marketing', percent: 85 },

    // Confirmed Software Tools Only
    { name: 'Adobe Photoshop', category: 'software', percent: 92 },
    { name: 'Adobe Illustrator', category: 'software', percent: 95 },
  ];

  /**
   * Education Modal Data
   */
  const EDUCATION_DETAILS = {
    bachelor: {
      badge: 'Academic Degree',
      title: 'Bachelor of Commerce',
      institution: 'Zagazig University',
      affiliation: 'General Management & Marketing',
      grade: 'Grade: Excellent',
      year: 'Graduation Year: [To be added]',
      description:
        'Rigorous academic study focusing on marketing strategy, management principles, consumer behavior, and commercial communication. Provides a solid analytical and strategic foundation for brand positioning and corporate visual identity projects.'
    },
    marketing: {
      badge: 'Professional Diploma',
      title: 'Marketing Diploma',
      institution: 'ITEDA Creativa',
      affiliation: 'Associated with the Ministry of Communications and Information Technology (MCIT)',
      grade: 'Practical Professional Program',
      year: 'Certified Program',
      description:
        'Comprehensive marketing education emphasizing campaign planning, target audience definition, social content strategy, and practical multi-platform promotional project executions.'
    },
    graphic: {
      badge: 'Specialized Diploma',
      title: 'Graphic Design Diploma',
      institution: 'NTI at Creativa',
      affiliation: 'National Telecommunication Institute (MCIT Partner)',
      grade: 'Visual Identity Capstone Project',
      year: 'Certified Program',
      description:
        'In-depth practical graphic design training covering advanced typography, visual systems, brand guidelines, and creative applications. Featured the complete development of the comprehensive brand identity for THEA perfume.'
    }
  };

  /* ==========================================================================
     2. GLOBAL FALLBACK IMAGE HANDLER
     ========================================================================== */
  window.handleImageError = function (img, title, path) {
    if (!img || img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = 'true';

    // Create a sleek dark-neutral SVG data URI matching the brand color palette
    const width = img.getAttribute('width') || 800;
    const height = img.getAttribute('height') || 600;
    const labelTitle = title || 'Asset Slot';
    const filePath = path || img.getAttribute('src') || '';

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
        <rect width="100%" height="100%" fill="#1A1714"/>
        <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="#352D26" stroke-width="1.5" stroke-dasharray="6,6"/>
        <circle cx="${width / 2}" cy="${height / 2 - 40}" r="26" fill="#29221C" stroke="#A58B70" stroke-width="1.5"/>
        <path d="M${width / 2 - 10} ${height / 2 - 34} L${width / 2 + 10} ${height / 2 - 34} L${width / 2 + 6} ${height / 2 - 44} L${width / 2} ${height / 2 - 38} L${width / 2 - 5} ${height / 2 - 46} Z" fill="#A58B70"/>
        <text x="50%" y="${height / 2 + 16}" fill="#F4EFE7" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" text-anchor="middle">${labelTitle}</text>
        <text x="50%" y="${height / 2 + 42}" fill="#A58B70" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" text-anchor="middle">Place asset at: ${filePath}</text>
      </svg>
    `.trim();

    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
  };

  /* ==========================================================================
     3. TOAST NOTIFICATIONS
     ========================================================================== */
  function showToast(message) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3800);
  }

  /* ==========================================================================
     4. HEADER SCROLL STATE & SCROLLSPY
     ========================================================================== */
  function initHeaderAndScrollspy() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
      if (!header) return;
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for Scrollspy
    if ('IntersectionObserver' in window && sections.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${currentId}`) {
                link.classList.add('is-active');
              } else if (href && href.startsWith('#')) {
                link.classList.remove('is-active');
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach(sec => sectionObserver.observe(sec));
    }
  }

  /* ==========================================================================
     5. MOBILE MENU DRAWER
     ========================================================================== */
  function initMobileMenu() {
    const toggleBtn = document.getElementById('navToggle');
    const drawer = document.getElementById('mobileDrawer');
    const backdrop = document.getElementById('mobileBackdrop');
    const links = document.querySelectorAll('.mobile-nav__link, .mobile-nav__actions a');

    if (!toggleBtn || !drawer || !backdrop) return;

    function openMenu() {
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', () => {
      const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    backdrop.addEventListener('click', closeMenu);

    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ==========================================================================
     6. EDUCATION CAROUSEL & MODAL
     ========================================================================== */
  function initEducation() {
    const track = document.getElementById('educationTrack');
    const prevBtn = document.getElementById('eduPrevBtn');
    const nextBtn = document.getElementById('eduNextBtn');
    const cards = document.querySelectorAll('.poster-card');

    const modal = document.getElementById('educationModal');
    const modalClose = document.getElementById('modalClose');
    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalInst = document.getElementById('modalInstitution');
    const modalDesc = document.getElementById('modalDesc');

    if (track && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -340, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 340, behavior: 'smooth' });
      });
    }

    // Modal controls
    function openModal(dataKey) {
      const data = EDUCATION_DETAILS[dataKey];
      if (!data || !modal) return;

      modalBadge.textContent = data.badge;
      modalTitle.textContent = data.title;
      modalInst.innerHTML = `<strong>${data.institution}</strong> · ${data.affiliation} <br><span class="text-accent">${data.grade}</span>`;
      modalDesc.textContent = data.description;

      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-edu');
        openModal(key);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const key = card.getAttribute('data-edu');
          openModal(key);
        }
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     7. SKILLS PROGRESS BARS
     ========================================================================== */
  function initSkillsProgress() {
    const skillsSection = document.getElementById('skills');
    const progressFills = document.querySelectorAll('.skill-bar__fill');

    if (!skillsSection || progressFills.length === 0) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            progressFills.forEach(fill => {
              const targetPercent = fill.getAttribute('data-percent') || '0';
              fill.style.width = `${targetPercent}%`;
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      observer.observe(skillsSection);
    } else {
      // Fallback
      progressFills.forEach(fill => {
        fill.style.width = `${fill.getAttribute('data-percent') || '0'}%`;
      });
    }
  }

  /* ==========================================================================
     8. PORTFOLIO CATEGORY FILTERING
     ========================================================================== */
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategories = (card.getAttribute('data-category') || '').split(',');
          if (filterValue === 'all' || cardCategories.includes(filterValue)) {
            card.style.display = '';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================================
     9. SERVICES 3D FLIPPING CARDS
     ========================================================================== */
  function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceSelect = document.getElementById('inquiryService');
    const composer = document.getElementById('inquiryComposer');

    serviceCards.forEach(card => {
      // Clicking the card flips it
      card.addEventListener('click', (e) => {
        // Do not flip if clicked on an inner button
        if (e.target.closest('button')) return;
        card.classList.toggle('is-flipped');
      });

      // Keyboard accessibility (Space or Enter on card)
      card.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('button')) {
          e.preventDefault();
          card.classList.toggle('is-flipped');
        }
      });

      // Return button on card back
      const returnBtn = card.querySelector('.service-card__btn-return');
      if (returnBtn) {
        returnBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          card.classList.remove('is-flipped');
        });
      }

      // Request Service button
      const requestBtn = card.querySelector('.service-card__btn-request');
      if (requestBtn) {
        requestBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const serviceName = card.getAttribute('data-service-name');

          // Pre-select in inquiry composer
          if (serviceSelect && serviceName) {
            for (let i = 0; i < serviceSelect.options.length; i++) {
              if (serviceSelect.options[i].value.toLowerCase() === serviceName.toLowerCase() ||
                  serviceSelect.options[i].text.toLowerCase() === serviceName.toLowerCase()) {
                serviceSelect.selectedIndex = i;
                break;
              }
            }
          }

          // Smooth scroll to contact section
          const contactSec = document.getElementById('contact');
          if (contactSec) {
            contactSec.scrollIntoView({ behavior: 'smooth' });
          }

          // Visual feedback pulse on composer
          if (composer) {
            composer.classList.remove('is-highlighted');
            void composer.offsetWidth; // trigger reflow
            composer.classList.add('is-highlighted');
          }

          showToast(`Selected service: ${serviceName}`);
        });
      }
    });
  }

  /* ==========================================================================
     10. GET IN TOUCH & DIRECT INQUIRY COMPOSER
     ========================================================================== */
  function initContactAndComposer() {
    // Copy email button
    const copyEmailBtn = document.getElementById('btnCopyEmail');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(SITE_CONFIG.email).then(() => {
          showToast('Email copied to clipboard: ' + SITE_CONFIG.email);
        }).catch(() => {
          showToast('Email: ' + SITE_CONFIG.email);
        });
      });
    }

    // WhatsApp handler (checks if number is provided)
    const whatsappBtn = document.getElementById('btnWhatsapp');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', (e) => {
        if (!SITE_CONFIG.whatsAppNumber || SITE_CONFIG.whatsAppNumber.trim() === '') {
          e.preventDefault();
          showToast('WhatsApp direct contact will be active once the phone number is provided.');
        }
      });
    }

    // Direct Inquiry Composer
    const composer = document.getElementById('inquiryComposer');
    const sendMailBtn = document.getElementById('btnSendMail');
    const copyBriefBtn = document.getElementById('btnCopyBrief');

    if (composer && sendMailBtn) {
      sendMailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const clientName = (document.getElementById('inquiryName').value || '').trim();
        const clientEmail = (document.getElementById('inquiryClientEmail').value || '').trim();
        const service = document.getElementById('inquiryService').value;
        const projectDesc = (document.getElementById('inquiryDesc').value || '').trim();

        const subject = encodeURIComponent(`Design Inquiry: ${service} — ${clientName || 'New Project'}`);
        const bodyText = encodeURIComponent(
          `Hello Mohammed Marwa,\n\n` +
          `I am reaching out regarding a design project.\n\n` +
          `Name: ${clientName || 'Not specified'}\n` +
          `Email: ${clientEmail || 'Not specified'}\n` +
          `Requested Service: ${service}\n\n` +
          `Project Details:\n${projectDesc || 'I would like to discuss branding and identity design.'}\n\n` +
          `Best regards,\n${clientName || 'Client'}`
        );

        window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${bodyText}`;
      });
    }

    if (composer && copyBriefBtn) {
      copyBriefBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const clientName = (document.getElementById('inquiryName').value || '').trim();
        const service = document.getElementById('inquiryService').value;
        const projectDesc = (document.getElementById('inquiryDesc').value || '').trim();

        const brief =
          `Design Inquiry for Mohammed Marwa (${SITE_CONFIG.email})\n` +
          `Requested Service: ${service}\n` +
          `Client Name: ${clientName || 'Anonymous'}\n` +
          `Project Scope: ${projectDesc || 'Brand Identity Collaboration'}`;

        navigator.clipboard.writeText(brief).then(() => {
          showToast('Project brief copied to clipboard! You can paste it into your email.');
        });
      });
    }

    // CV Download notice
    const cvButtons = document.querySelectorAll('.btn-download-cv');
    cvButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Accessing Mohammed Marwa CV (assets/Mohammed-Marwa-CV.pdf)');
      });
    });
  }

  /* ==========================================================================
     11. INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initHeaderAndScrollspy();
    initMobileMenu();
    initEducation();
    initSkillsProgress();
    initProjectFilters();
    initServiceCards();
    initContactAndComposer();
  });
})();

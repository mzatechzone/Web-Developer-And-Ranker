/**
 * MZA TECH ZONE - VANILLA JAVASCRIPT ENGINE
 * Fast, self-contained, performance-optimized, and GitHub Pages compatible
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgressBar();
  initHeaderScroll();
  initMobileNavigation();
  initFaqAccordions();
  initPortfolioFiltersAndModals();
  initContactForms();
  initBackToTop();
  highlightActiveNavLink();
  initScrollReveal();
  initPageTransitions();
});

/* 1. Top Reading Progress Bar */
function initReadingProgressBar() {
  const bar = document.getElementById('reading-progress-bar');
  if (!bar) return;

  let ticking = false;
  const updateProgress = () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) {
      const scrolled = (winScroll / height) * 100;
      bar.style.width = scrolled + '%';
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
}

/* 2. Header Scrolled Shadow Effect */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let ticking = false;
  const updateHeader = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

/* 3. Mobile Navigation Drawer with Passive Listeners & Clean States */
function initMobileNavigation() {
  const openBtn = document.getElementById('mobile-menu-open');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!openBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openDrawer, { passive: true });
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer, { passive: true });
  overlay.addEventListener('click', closeDrawer, { passive: true });

  links.forEach(link => {
    link.addEventListener('click', closeDrawer, { passive: true });
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  }, { passive: true });

  // Auto-close mobile drawer when window resized beyond tablet/mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && drawer.classList.contains('open')) {
      closeDrawer();
    }
  }, { passive: true });
}

/* 4. Active Navigation Link Detection */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href')?.toLowerCase();
    if (!href) return;

    if (
      (currentPath.endsWith('/') && (href === '/' || href === 'index.html' || href === './' || href === './index.html')) ||
      (currentPath.includes('services') && href.includes('services')) ||
      (currentPath.includes('web-development') && href.includes('web-development')) ||
      (currentPath.includes('seo') && href.includes('seo')) ||
      (currentPath.includes('google-business-profile') && href.includes('google-business-profile')) ||
      (currentPath.includes('projects') && href.includes('projects')) ||
      (currentPath.includes('about') && href.includes('about')) ||
      (currentPath.includes('contact') && href.includes('contact'))
    ) {
      link.classList.add('active');
    }
  });
}

/* 5. FAQ Accordions */
function initFaqAccordions() {
  const faqContainer = document.querySelector('.faq-accordion') || document;
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Close other FAQs smoothly
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    }, { passive: true });
  });
}

/* 6. Portfolio Filter and Modal Viewer */
const PORTFOLIO_DATA = {
  'apex-logistics': {
    title: 'Apex Freight & Logistics Portal',
    industry: 'Transportation & Supply Chain',
    category: 'Web Development',
    tags: ['Web Development', 'Performance', 'Corporate'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    overview: 'Full overhaul and technical re-architecture for a regional logistics provider whose legacy website suffered from slow mobile load times and low search discovery.',
    challenge: 'The client’s prior website took over 6 seconds to load on mobile devices, lacked clear service tier categorization, and was virtually invisible for regional freight queries.',
    strategy: 'We designed a modern, high-contrast interface with instant quote calculators, rebuilt the frontend with clean semantic markup, and implemented local freight schema markup.',
    metrics: [
      { label: 'Mobile Page Speed', val: '0.8s' },
      { label: 'Form Completion', val: '+64%' },
      { label: 'Organic Impressions', val: '+142%' }
    ],
    tech: ['HTML5 / CSS3', 'Clean JavaScript', 'Schema.org', 'Cloudflare CDN']
  },
  'vanguard-dental': {
    title: 'Vanguard Family & Cosmetic Dentistry',
    industry: 'Healthcare & Dental Practice',
    category: 'Google Business Profile',
    tags: ['Google Business Profile', 'Local SEO', 'Healthcare'],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    overview: 'Complete overhaul of a multi-practitioner dental clinic’s Google Business Profile and local service area landing pages.',
    challenge: 'Conflicting business names across directory citations, unoptimized categories, zero photo updates in 2 years, and low map pack visibility.',
    strategy: 'Synchronized NAP citations across local directories, restructured primary/secondary categories, and implemented an ethical review generation framework.',
    metrics: [
      { label: 'Direct Phone Calls', val: '+88%' },
      { label: 'Map Pack Discovery', val: '+210%' },
      { label: '5-Star Reviews', val: '45+' }
    ],
    tech: ['Google Business Profile', 'LocalBusiness Schema', 'Citation Sync']
  },
  'solaris-clean-energy': {
    title: 'Solaris Commercial & Residential Energy',
    industry: 'Renewable Energy & Solar',
    category: 'SEO',
    tags: ['SEO', 'Content Strategy', 'Clean Energy'],
    image: 'https://www.residencestyle.com/wp-content/uploads/2021/08/Solar-Panels-1.jpg',
    overview: 'Data-driven SEO strategy and content hub built to capture property owners researching solar tax incentives and installation ROI.',
    challenge: 'High cost per click on paid search ($40+ CPC) and zero organic presence for educational or high-intent search queries.',
    strategy: 'Conducted in-depth keyword intent mapping, created regional solar incentive guides, resolved canonicalization errors, and embedded an interactive ROI savings calculator.',
    metrics: [
      { label: 'Organic Traffic', val: '+185%' },
      { label: 'Lead Inquiries', val: '+92%' },
      { label: 'Top 10 Keywords', val: '38+' }
    ],
    tech: ['Technical SEO', 'Search Console', 'Schema.org', 'Interactive Calculator']
  },
  'krona-architects': {
    title: 'Krona Modern Architecture Studio',
    industry: 'Architecture & Interior Design',
    category: 'Web Development',
    tags: ['Web Development', 'Portfolio', 'Luxury Design'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    overview: 'A minimalist portfolio platform built for an architectural studio to showcase high-end residential and commercial projects.',
    challenge: 'Uncompressed architectural photography was causing the previous site to take over 8 seconds to load, resulting in high mobile bounce rates.',
    strategy: 'Implemented responsive image serving, smooth layout transitions, intuitive project filtering, and refined typographic contrast.',
    metrics: [
      { label: 'Session Duration', val: '+120%' },
      { label: 'Bounce Rate', val: '-48%' },
      { label: 'Consultation Inquiries', val: '+75%' }
    ],
    tech: ['Semantic HTML5', 'Responsive CSS Grid', 'Vanilla JavaScript', 'Optimized WebP Assets']
  },
  'metro-law-partners': {
    title: 'Metro Legal Counsel & Attorneys',
    industry: 'Legal Services & Corporate Law',
    category: 'Local SEO',
    tags: ['Local SEO', 'Legal', 'Google Business Profile'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    overview: 'A targeted local SEO and Google Business Profile campaign designed to establish regional authority in business litigation.',
    challenge: 'Overshadowed by larger regional law firms in search results and struggled with inconsistent geographic signals across search engines.',
    strategy: 'Crafted individual practice area landing pages, implemented legal schema markup, and optimized multi-location Google Business Profiles.',
    metrics: [
      { label: 'Search Impressions', val: '+160%' },
      { label: 'Inquiry Phone Calls', val: '+52%' },
      { label: 'Local Pack Rank', val: 'Top 3' }
    ],
    tech: ['Schema.org LegalService', 'Google Search Console', 'Practice Area Content Hub']
  },
  'summit-hvac-pros': {
    title: 'Summit Heating, Cooling & Air Solutions',
    industry: 'Home Services & HVAC Contracting',
    category: 'Google Business Profile',
    tags: ['Google Business Profile', 'Local Service', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    overview: 'Emergency dispatch web platform and Google Business Profile campaign for a 24/7 HVAC contractor.',
    challenge: 'Homeowners needing urgent furnace or AC repairs were unable to quickly find click-to-call buttons on mobile devices.',
    strategy: 'Built a high-speed, tactile mobile web interface featuring prominent emergency tap-to-call triggers and optimized their profile for seasonal search triggers.',
    metrics: [
      { label: 'Emergency Calls', val: '+110%' },
      { label: 'Mobile Conversion', val: '14.2%' },
      { label: '5-Star Reviews', val: '60+' }
    ],
    tech: ['Mobile First UI', 'Google Business Profile 24/7', 'Click-to-Call System']
  }
};

function initPortfolioFiltersAndModals() {
  const filterBtns = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.portfolio-card');

  // Filter functionality
  if (filterBtns.length && cards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        cards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category?.includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      }, { passive: true });
    });
  }

  // Modal viewer functionality
  const modalOverlay = document.getElementById('project-modal');
  if (!modalOverlay) return;

  const closeBtn = document.getElementById('project-modal-close');

  function openModal(projectId) {
    const data = PORTFOLIO_DATA[projectId];
    if (!data) return;

    const titleEl = document.getElementById('modal-title');
    const badgeEl = document.getElementById('modal-badge');
    const imgEl = document.getElementById('modal-image');
    const overviewEl = document.getElementById('modal-overview');
    const challengeEl = document.getElementById('modal-challenge');
    const strategyEl = document.getElementById('modal-strategy');

    if (titleEl) titleEl.textContent = data.title;
    if (badgeEl) badgeEl.textContent = data.industry;
    if (imgEl) {
      imgEl.src = data.image;
      imgEl.alt = data.title;
    }
    if (overviewEl) overviewEl.textContent = data.overview;
    if (challengeEl) challengeEl.textContent = data.challenge;
    if (strategyEl) strategyEl.textContent = data.strategy;

    const metricsContainer = document.getElementById('modal-metrics');
    if (metricsContainer) {
      metricsContainer.innerHTML = data.metrics.map(m => `
        <div class="glass-panel" style="padding: 0.85rem; text-align: center;">
          <div style="font-size: 1.25rem; font-weight: 700; color: #38bdf8; font-family: var(--font-display);">${m.val}</div>
          <div style="font-size: 0.75rem; color: var(--text-dim);">${m.label}</div>
        </div>
      `).join('');
    }

    const techContainer = document.getElementById('modal-tech');
    if (techContainer) {
      techContainer.innerHTML = data.tech.map(t => `
        <span class="badge badge-cyan" style="font-size: 0.75rem;">${t}</span>
      `).join('');
    }

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Delegated click handler for modal trigger buttons
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-modal]');
    if (trigger) {
      e.preventDefault();
      const id = trigger.getAttribute('data-project-id');
      if (id) openModal(id);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal, { passive: true });
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  }, { passive: true });
}

/* 7. Contact Form Interactive Handler */
function initContactForms() {
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success-box');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Send Inquiry';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
    }

    setTimeout(() => {
      if (successBox) {
        successBox.style.display = 'block';
        form.reset();
      } else {
        form.reset();
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }, 700);
  });
}

/* 8. Back-to-Top Floating Button */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  let ticking = false;
  const updateBackToTop = () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateBackToTop);
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 9. Smooth Fade-In-Up Scroll Reveal via Intersection Observer */
function initScrollReveal() {
  const targetSelectors = [
    '.service-card',
    '.service-detail-card',
    '.process-card',
    '.process-step',
    '.timeline-step',
    '.step-item',
    '.glass-card',
    '.feature-card',
    '.portfolio-card',
    '.stat-card',
    '.value-item',
    '.deliverable-card',
    '.faq-item',
    '.grid-cards > div',
    '.reveal-on-scroll'
  ];

  // Select all candidate elements across the page
  const allElements = document.querySelectorAll(targetSelectors.join(', '));
  if (!allElements.length) return;

  // Deduplicate and filter elements
  const targets = Array.from(new Set(allElements));

  // Respect user preference for reduced motion or fallback if IntersectionObserver unsupported
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    targets.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  // Assign base class for fade-in-up animation
  targets.forEach(el => {
    el.classList.add('reveal-on-scroll');
  });

  // Calculate natural staggered delays for sibling cards in the same grid/parent
  const parentSet = new Set();
  targets.forEach(el => {
    if (el.parentElement) parentSet.add(el.parentElement);
  });

  parentSet.forEach(parent => {
    const children = Array.from(parent.children).filter(child =>
      child.classList.contains('reveal-on-scroll')
    );
    children.forEach((child, index) => {
      const delay = (index % 6) * 0.08; // 80ms stagger per child
      if (delay > 0) {
        child.style.setProperty('--stagger-delay', `${delay.toFixed(2)}s`);
        child.style.transitionDelay = `${delay.toFixed(2)}s`;
      }
    });
  });

  // Create IntersectionObserver instance to trigger the smooth fade-in-up animation
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('is-revealed');

        // Remove inline transition delay after reveal animation completes so hover transforms respond immediately
        const delayStr = el.style.transitionDelay;
        const delayMs = delayStr ? parseFloat(delayStr) * 1000 : 0;
        setTimeout(() => {
          if (el) {
            el.style.transitionDelay = '';
          }
        }, 700 + delayMs);

        // Unobserve element once revealed for optimal performance
        obs.unobserve(el);
      }
    });
  }, observerOptions);

  // Observe all targets
  targets.forEach(el => observer.observe(el));
}

/* 10. Seamless Page Navigation Transitions */
function initPageTransitions() {
  // Respect user preference for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Ensure body is visible upon initial load or backward/forward navigation (bfcache)
  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-is-exiting');
  });

  // Intercept internal page link clicks for smooth fade-out
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Skip anchor-only hashes, mailto, tel, javascript, downloads, new tabs, or modified clicks
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      link.target === '_blank' ||
      link.hasAttribute('download') ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }

    let targetUrl;
    try {
      targetUrl = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    // Only transition for same-origin navigation
    if (targetUrl.origin === window.location.origin) {
      // If exact same path and query, skip or let hash jump handle it
      if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) {
        return;
      }

      e.preventDefault();
      document.body.classList.add('page-is-exiting');

      const destination = link.href;
      setTimeout(() => {
        window.location.href = destination;
      }, 190);
    }
  });
}




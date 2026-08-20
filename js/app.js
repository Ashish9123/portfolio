/**
 * Ashish Kumar — Developer Portfolio JavaScript Engine
 * Features: Mobile Nav Toggle, Scroll Spy, Project Category Filtering,
 * Project Detail Modals, GitHub Stats (API + fallback), Resume Preview Modal,
 * Contact Launcher, Back-to-Top, Particle Background, Card Tilt, Typing Animation,
 * Scroll Reveal, Modal Focus Management, Reduced-Motion Support.
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initLoadingScreen();
  initNavbarScroll();
  initMobileNav();
  initScrollSpy();
  initProjectFiltering();
  initProjectModals();
  initResumeModal();
  initContactForm();
  initBackToTop();
  initGitHubStats();
  init3DTechBackground(prefersReducedMotion);
  init3DCardTilt(prefersReducedMotion);
  initTypingAnimation(prefersReducedMotion);
  initScrollReveal(prefersReducedMotion);
});

/* ==========================================================================
   0. NAVBAR SCROLL STATE
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;
  const updateNavbar = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    ticking = false;
  };

  updateNavbar();
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateNavbar);
    }
  }, { passive: true });
}

/* ==========================================================================
   1. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-drawer .btn');

  if (!toggleBtn || !overlay) return;

  function setMenuState(open) {
    if (open) {
      overlay.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    } else {
      overlay.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  toggleBtn.addEventListener('click', () => {
    setMenuState(!overlay.classList.contains('active'));
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => setMenuState(false));
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) setMenuState(false);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      setMenuState(false);
      toggleBtn.focus();
    }
  });
}

/* ==========================================================================
   2. SCROLL SPY & NAVIGATION HIGHLIGHT
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });

    mobileNavLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }, { passive: true });
}

/* ==========================================================================
   3. DYNAMIC PROJECT CATEGORY FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. PROJECT TECHNICAL DETAIL MODALS
   ========================================================================== */
const PROJECT_DETAILS = {
  'bug-tracker': {
    title: 'Bug Tracker Web Application',
    overview: 'A structured web-based defect tracking system built to replace unorganized bug logging. It provides user authentication, role-protected routes, and full CRUD workflows for managing software issues.',
    architecture: [
      { step: 'User Browser', icon: '💻' },
      { step: 'Flask Web Server', icon: '🐍' },
      { step: 'Auth & Sessions', icon: '🔒' },
      { step: 'SQLite Database', icon: '🗄️' }
    ],
    features: [
      'User registration, login & session-protected routes',
      'Full CRUD operations for bug management',
      'Structured relational SQLite storage',
      'Responsive dashboard UI built with HTML & CSS',
      'Clean separation of frontend templates and backend logic'
    ],
    techDetails: [
      { key: 'Backend Framework', value: 'Flask (Python)' },
      { key: 'Database Engine', value: 'SQLite' },
      { key: 'Authentication', value: 'Session-based login' },
      { key: 'Frontend', value: 'HTML5, CSS3, Jinja templates' },
      { key: 'Deployment', value: 'Vercel (live demo)' }
    ],
    contribution: 'Built the full-stack bug tracking system end-to-end — authentication, bug CRUD endpoints, relational storage, and the responsive UI.',
    github: 'https://github.com/Ashish9123/bug-tracker',
    liveDemo: 'https://bug-tracker-ashish16.vercel.app'
  },

  'chatbot-ai': {
    title: 'AI Chatbot — Gemini Powered',
    overview: 'An interactive AI chatbot with a real-time chat interface. It integrates the Google Gemini API for intelligent responses and uses NLP techniques to understand user queries, with a clean, fast React frontend.',
    architecture: [
      { step: 'User Web Client', icon: '💬' },
      { step: 'React (Vite) UI', icon: '⚛️' },
      { step: 'Google Gemini API', icon: '🤖' },
      { step: 'Render Hosting', icon: '☁️' }
    ],
    features: [
      'Real-time chat with Google Gemini AI integration',
      'Fast response times with a clean, modern UI',
      'NLP-based query understanding',
      'Responsive design for mobile and desktop'
    ],
    techDetails: [
      { key: 'Frontend', value: 'React + Vite' },
      { key: 'AI Engine', value: 'Google Gemini API' },
      { key: 'Languages', value: 'JavaScript, HTML, CSS' },
      { key: 'Deployment', value: 'Render (live demo)' }
    ],
    contribution: 'Developed the chatbot UI, integrated the Gemini API, and deployed the production build to Render.',
    github: 'https://github.com/Ashish9123/chatbot-AI',
    liveDemo: 'https://chatbot-ai-vkk1.onrender.com'
  },

  'agriprecision': {
    title: 'AgriPrecision AI',
    overview: 'An AI-powered precision farming assistant that performs soil analysis, image-based crop classification, and delivers smart farming recommendations through a voice-enabled, responsive interface.',
    architecture: [
      { step: 'Farmers / Users', icon: '🌱' },
      { step: 'React (TypeScript) UI', icon: '⚛️' },
      { step: 'Node.js + Express API', icon: '⚙️' },
      { step: 'OpenAI Integration', icon: '🤖' }
    ],
    features: [
      'AI-powered soil analysis',
      'Image-based crop classification',
      'Smart farming recommendations via OpenAI',
      'Voice assistant integration for hands-free usage'
    ],
    techDetails: [
      { key: 'Frontend', value: 'React + Vite (TypeScript)' },
      { key: 'Backend', value: 'Node.js + Express' },
      { key: 'AI Integration', value: 'OpenAI API' },
      { key: 'Deployment', value: 'Render (live demo)' }
    ],
    contribution: 'Built the frontend and backend architecture, wired the OpenAI-powered analysis features, and deployed the application.',
    github: 'https://github.com/Ashish9123/agriprecision-ai',
    liveDemo: 'https://agriprecision-ai.onrender.com'
  },

  'url-shortener': {
    title: 'URL Shortener Service',
    overview: 'A link-shortening service that converts long URLs into short, shareable codes. Links are persisted in MongoDB and redirects are handled by an Express REST API.',
    architecture: [
      { step: 'Client / API Consumer', icon: '🔗' },
      { step: 'Express Server', icon: '⚡' },
      { step: 'Mongoose Models', icon: '🍃' },
      { step: 'MongoDB Database', icon: '🗄️' }
    ],
    features: [
      'Short-code generation for long URLs (shortid)',
      'MongoDB persistence via Mongoose schemas',
      'CORS-enabled Express REST API',
      'Redirect handling for shortened links'
    ],
    techDetails: [
      { key: 'Runtime', value: 'Node.js' },
      { key: 'Backend Framework', value: 'Express 5' },
      { key: 'Database', value: 'MongoDB + Mongoose' },
      { key: 'Libraries', value: 'shortid, cors' },
      { key: 'Deployment', value: 'Render (live demo)' }
    ],
    contribution: 'Designed the API routes, MongoDB models, and deployed the service with a live demo.',
    github: 'https://github.com/Ashish9123/url-shortener',
    liveDemo: 'https://url-shortener-keie.onrender.com'
  },

  'finance-predictor': {
    title: 'Finance Predictor 3D',
    overview: 'A modern financial prediction web application with an interactive 3D interface and a FastAPI backend. It delivers real-time predictions through a responsive, user-friendly experience.',
    architecture: [
      { step: 'User Web Client', icon: '📈' },
      { step: '3D Interactive UI', icon: '🎛️' },
      { step: 'FastAPI Backend', icon: '⚡' },
      { step: 'SQLAlchemy Data Layer', icon: '🗄️' }
    ],
    features: [
      'Interactive 3D user interface',
      'Backend prediction API (FastAPI + Uvicorn)',
      'SQLAlchemy ORM data layer',
      'Real-time predictions with responsive UX'
    ],
    techDetails: [
      { key: 'Backend', value: 'FastAPI + Uvicorn (Python)' },
      { key: 'ORM', value: 'SQLAlchemy' },
      { key: 'Frontend', value: 'HTML, CSS, JavaScript' },
      { key: 'Deployment', value: 'Render (live demo)' }
    ],
    contribution: 'Built the backend API, integrated the 3D frontend, and deployed the application to Render.',
    github: 'https://github.com/Ashish9123/finance-predictor',
    liveDemo: 'https://finance-predictor-5i6p.onrender.com'
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-content');
  const modalTitle = document.getElementById('modal-title');

  if (!modalBackdrop || !closeBtn || !modalBody) return;

  let lastFocused = null;

  window.openProjectModal = function(projectId) {
    const data = PROJECT_DETAILS[projectId];
    if (!data) return;

    lastFocused = document.activeElement;
    modalTitle.textContent = data.title;

    const archHtml = data.architecture.map((item, index) => `
      <div class="arch-step">
        <div>${item.icon}</div>
        <div>${item.step}</div>
      </div>
      ${index < data.architecture.length - 1 ? '<div class="arch-arrow" aria-hidden="true">➔</div>' : ''}
    `).join('');

    const featuresHtml = data.features.map(f => `
      <li class="feature-item"><span>${f}</span></li>
    `).join('');

    const techTableHtml = data.techDetails.map(t => `
      <tr>
        <th scope="row">${t.key}</th>
        <td><code>${t.value}</code></td>
      </tr>
    `).join('');

    modalBody.innerHTML = `
      <div class="modal-section">
        <p style="color: var(--text-secondary); font-size: 1rem; margin-bottom: 1rem;">${data.overview}</p>
        <div class="modal-section-title">System Architecture Flow</div>
        <div class="arch-diagram-box">${archHtml}</div>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Key Technical Features</div>
        <ul class="feature-list">${featuresHtml}</ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Technical Implementation Specs</div>
        <table class="detail-table">
          <tbody>${techTableHtml}</tbody>
        </table>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Personal Engineering Contribution</div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${data.contribution}</p>
      </div>

      <div class="modal-section" style="margin-bottom: 0; padding-top: 1rem; border-top: 1px solid var(--border-subtle); display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
          <span>View Source on GitHub</span>
        </a>
        <a href="${data.liveDemo}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
          <span>Open Live Demo</span>
        </a>
        <button class="btn btn-outline btn-sm" onclick="closeProjectModal()">Close</button>
      </div>
    `;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  window.closeProjectModal = function() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  closeBtn.addEventListener('click', closeProjectModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeProjectModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeProjectModal();
    }
  });

  trapFocusInElement(modalBackdrop);
}

/* ==========================================================================
   5. RESUME PREVIEW MODAL CONTROLLER
   ========================================================================== */
function initResumeModal() {
  const modalBackdrop = document.getElementById('resume-modal-backdrop');
  const closeBtn = document.getElementById('resume-modal-close-btn');

  if (!modalBackdrop || !closeBtn) return;

  let lastFocused = null;

  window.openResumeModal = function() {
    lastFocused = document.activeElement;
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  window.closeResumeModal = function() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  closeBtn.addEventListener('click', closeResumeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeResumeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeResumeModal();
    }
  });

  trapFocusInElement(modalBackdrop);
}

/* Keep Tab navigation inside an open modal */
function trapFocusInElement(container) {
  if (!container) return;

  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !container.classList.contains('active')) return;

    const focusable = container.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

/* ==========================================================================
   6. CONTACT FORM EMAIL LAUNCHER
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-quick-form');
  const formToast = document.getElementById('contact-form-toast');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim() || 'Opportunity Inquiry for Ashish Kumar';
    const message = document.getElementById('contact-message').value.trim();

    const mailtoUrl = `mailto:ashishcb035@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Ashish,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`)}`;

    window.location.href = mailtoUrl;

    if (formToast) {
      formToast.style.display = 'block';
      formToast.textContent = 'Launching your default email client... Thank you!';
      setTimeout(() => { formToast.style.display = 'none'; }, 4000);
    }
  });
}

/* ==========================================================================
   7. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  let ticking = false;
  const update = () => {
    if (window.scrollY > 480) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });

  update();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   8. GITHUB STATS (API-backed with verified static fallback)
   ========================================================================== */
function initGitHubStats() {
  const reposEl = document.getElementById('gh-stat-repos');
  const sinceEl = document.getElementById('gh-stat-since');
  if (!reposEl) return;

  fetch('https://api.github.com/users/Ashish9123')
    .then(res => res.json())
    .then(data => {
      if (data && typeof data.public_repos === 'number' && data.public_repos > 0) {
        reposEl.textContent = data.public_repos;
        const joined = new Date(data.created_at);
        if (!isNaN(joined.getTime())) {
          sinceEl.textContent = joined.getFullYear();
        }
      }
    })
    .catch(() => {
      // Fallback values are verified facts; keep defaults in the DOM.
    });
}

/* ==========================================================================
   9. PARTICLE TECH MOTION BACKGROUND CANVAS ENGINE
   ========================================================================== */
function init3DTechBackground(prefersReducedMotion) {
  const canvas = document.getElementById('tech-bg-3d');
  if (!canvas || prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let mouseX = -9999, mouseY = -9999;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouseX = -9999;
    mouseY = -9999;
  });

  const COLORS = ['205, 95, 248', '199, 112, 240', '190, 80, 244', '184, 154, 240'];

  function spawnParticles() {
    const particles = [];
    const count = Math.min(120, Math.floor((width * height) / 16000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.2 + 0.8,
        color: COLORS[i % COLORS.length]
      });
    }
    return particles;
  }

  let particles = spawnParticles();

  window.addEventListener('resize', () => {
    particles = spawnParticles();
  });

  const LINK_DIST = 130;
  const MOUSE_LINK_DIST = 160;

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, 0.75)`;
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(199, 112, 240, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      const a = particles[i];
      const mdx = a.x - mouseX;
      const mdy = a.y - mouseY;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (mDist < MOUSE_LINK_DIST) {
        const alpha = (1 - mDist / MOUSE_LINK_DIST) * 0.8;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(205, 95, 248, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ==========================================================================
   10. 3D INTERACTIVE CARD PERSPECTIVE TILT
   ========================================================================== */
function init3DCardTilt(prefersReducedMotion) {
  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll('.project-card, .skills-category-card, .about-narrative');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 18 * -1;
      const rotateY = (x - centerX) / 18;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.transition = 'transform 0.08s ease-out';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      card.style.transition = 'transform 0.4s ease-out';
    });
  });
}

/* ==========================================================================
   11. LOADING SCREEN
   ========================================================================== */
function initLoadingScreen() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;

  const hide = () => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  };

  window.addEventListener('load', () => {
    setTimeout(hide, 600);
  });

  setTimeout(hide, 3000);
}

/* ==========================================================================
   12. TYPING ANIMATION (HERO)
   ========================================================================== */
function initTypingAnimation(prefersReducedMotion) {
  const typingEl = document.getElementById('hero-typing');
  if (!typingEl) return;

  if (prefersReducedMotion) {
    typingEl.textContent = 'Software Developer | Backend & Cloud';
    return;
  }

  const phrases = [
    'Software Developer | Backend & Cloud',
    'Building REST APIs & Full-Stack Apps',
    'Python · Node.js · React · AWS',
    'AI-Powered & Cloud-Deployed Systems'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isPaused) {
      setTimeout(type, 1500);
      isPaused = false;
      isDeleting = true;
      return;
    }

    if (isDeleting) {
      charIndex--;
      typingEl.textContent = currentPhrase.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 40);
    } else {
      charIndex++;
      typingEl.textContent = currentPhrase.substring(0, charIndex);

      if (charIndex === currentPhrase.length) {
        isPaused = true;
        setTimeout(type, 0);
        return;
      }
      setTimeout(type, 70);
    }
  }

  setTimeout(type, 1000);
}

/* ==========================================================================
   13. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal(prefersReducedMotion) {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (!revealElements.length) return;

  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

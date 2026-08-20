/**
 * Ashish Kumar — Developer Portfolio JavaScript Engine
 * Features: Mobile Nav Toggle, Scroll Spy, Project Category Filtering, 
 * Project Detail Modals, Certificate Verification Modals, Resume Preview Modal, Contact Launcher,
 * Interactive 3D Tech Motion Background Canvas & 3D Perspective Card Tilt Engine.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNavbarScroll();
  initMobileNav();
  initScrollSpy();
  initProjectFiltering();
  initProjectModals();
  initResumeModal();
  initContactForm();
  init3DTechBackground();
  init3DCardTilt();
  initTypingAnimation();
  initScrollReveal();
});

/* ==========================================================================
   0. NAVBAR SCROLL STATE (soumyajit sticky style)
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  updateNavbar();
  window.addEventListener('scroll', updateNavbar);
}

/* ==========================================================================
   1. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const overlay = document.getElementById('mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !overlay) return;

  function toggleMenu() {
    const isActive = overlay.classList.contains('active');
    if (isActive) {
      overlay.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      overlay.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) toggleMenu();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
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
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });

    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
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
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
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
    overview: 'Built a structured web-based defect tracking system designed to eliminate unorganized bug logging. Features user authentication, priority routing, role permissions, and full CRUD workflows for managing software issues.',
    architecture: [
      { step: 'User Browser', icon: '💻' },
      { step: 'Flask Web Server', icon: '🐍' },
      { step: 'Auth Middleware & Session', icon: '🔒' },
      { step: 'SQLite Database', icon: '🗄️' }
    ],
    features: [
      'User Authentication & Session Management (Login/Register/Logout)',
      'Ticket Status Lifecycle Management (Open, In Progress, Code Review, Resolved, Closed)',
      'Severity & Priority Filtering (Low, Medium, High, Critical)',
      'Structured SQLite Relational Schema with foreign key constraints',
      'Clean CSS Grid dashboard with responsive status counters'
    ],
    techDetails: [
      { key: 'Backend Framework', value: 'Flask (Python 3.10)' },
      { key: 'Database Engine', value: 'SQLite 3 (OR Mapping via SQLAlchemy / Raw SQL)' },
      { key: 'Authentication', value: 'Werkzeug Password Hashing & Flask Sessions' },
      { key: 'Frontend UI', value: 'HTML5, Custom Vanilla CSS Grid & Modular Templates' },
      { key: 'Deployment', value: 'WSGI / Gunicorn local server setup' }
    ],
    contribution: 'Designed the database ER schema, implemented secure authentication middleware, developed RESTful API endpoints for ticket CRUD operations, and created the responsive dashboard UI.',
    github: 'https://github.com/Ashish9123/bug-tracker-web-app'
  },

  'ai-chatbot': {
    title: 'AI Chatbot & NLP Assistant (AWS Cloud Deployed)',
    overview: 'Developed an NLP-powered chatbot service designed for automated query answering. Deployed on Amazon Web Services (AWS EC2) with production NGINX reverse proxy for high availability and low latency response generation.',
    architecture: [
      { step: 'User Web Client', icon: '💬' },
      { step: 'AWS EC2 Instance', icon: '☁️' },
      { step: 'NGINX Reverse Proxy', icon: '🌐' },
      { step: 'Flask NLP Engine', icon: '🤖' }
    ],
    features: [
      'Intent Recognition & Keyword Matching using Python NLP libraries',
      'Asynchronous REST API endpoint for instantaneous chat message exchange',
      'Deployed on Linux AWS EC2 instance running NGINX and systemd process supervisor',
      'Interactive chat UI with typing indicators and auto-scroll message history',
      'Modular fallback handlers for complex or out-of-domain queries'
    ],
    techDetails: [
      { key: 'Backend Framework', value: 'Python Flask' },
      { key: 'AI / NLP Stack', value: 'NLTK, Scikit-learn, Python NLP Libraries' },
      { key: 'Cloud Platform', value: 'AWS EC2 (Ubuntu Linux Server)' },
      { key: 'Web Server / Proxy', value: 'NGINX Reverse Proxy & Gunicorn WSGI' },
      { key: 'Process Management', value: 'Systemd service supervisor' }
    ],
    contribution: 'Trained response intent models, engineered Flask message-dispatch endpoints, configured AWS EC2 security groups, SSH Linux environment, and NGINX reverse proxy forwarding.',
    github: 'https://github.com/Ashish9123/ai-chatbot-aws'
  },

  'restaurant-platform': {
    title: 'Restaurant Management & Reservation Platform',
    overview: 'Designed an end-to-end management platform for restaurants, enabling users to explore menus, reserve tables, and place online food orders with transactional database consistency.',
    architecture: [
      { step: 'Customer UI', icon: '📱' },
      { step: 'Flask REST API', icon: '⚙️' },
      { step: 'MySQL Relational DB', icon: '🐬' },
      { step: 'AWS S3 Asset Storage', icon: '🪣' }
    ],
    features: [
      'Interactive Menu Browsing with category filter (Starters, Mains, Desserts, Drinks)',
      'Table Reservation engine with time slot validation and capacity check',
      'MySQL relational database integration for persistent customer & order storage',
      'Cloud static image hosting via AWS S3',
      'Admin dashboard view for real-time reservation and order tracking'
    ],
    techDetails: [
      { key: 'Backend Language', value: 'Python 3 / Flask' },
      { key: 'Database', value: 'MySQL (ACID compliant transactions)' },
      { key: 'Cloud Storage', value: 'AWS S3 (Amazon Simple Storage Service)' },
      { key: 'API Architecture', value: 'RESTful JSON Endpoints' },
      { key: 'Frontend', value: 'HTML5, Modern CSS Variables, Vanilla JS Fetch API' }
    ],
    contribution: 'Wrote SQL relational tables for menus and reservations, built transactional booking handlers, integrated AWS S3 SDK for image uploads, and implemented client-side state handling.',
    github: 'https://github.com/Ashish9123/restaurant-management-platform'
  },

  'user-auth': {
    title: 'User Authentication & JWT Microservice',
    overview: 'Engineered a standalone authentication microservice designed to handle secure user registration, salted password hashing, access token issuance, and protected route authorization.',
    architecture: [
      { step: 'Client App', icon: '💻' },
      { step: 'JWT Auth Middleware', icon: '🔑' },
      { step: 'Express Controller', icon: '🚀' },
      { step: 'MongoDB Store', icon: '🍃' }
    ],
    features: [
      'JSON Web Token (JWT) signature verification and access control',
      'Password hashing using Bcrypt salt rounds',
      'MongoDB Mongoose schema with schema-level validation',
      'HTTP-only secure cookies for token persistence',
      'Rate-limiting middleware protection against brute-force login attempts'
    ],
    techDetails: [
      { key: 'Runtime Environment', value: 'Node.js (ES6+)' },
      { key: 'Backend Framework', value: 'Express.js' },
      { key: 'NoSQL Database', value: 'MongoDB & Mongoose ODM' },
      { key: 'Security Libraries', value: 'jsonwebtoken, bcryptjs, express-rate-limit' },
      { key: 'API Testing', value: 'Postman collection verified' }
    ],
    contribution: 'Implemented JWT token generation and verification middleware, architected MongoDB user collection schema, and configured security headers with Helmet.js.',
    github: 'https://github.com/Ashish9123/user-auth-jwt-service'
  },

  'cloud-storage': {
    title: 'Cloud File Storage Engine (AWS S3)',
    overview: 'Built a cloud-based storage service enabling users to securely upload, stream, organize, and download files directly via AWS S3 buckets using presigned URLs and stream buffers.',
    architecture: [
      { step: 'Client Browser', icon: '🌐' },
      { step: 'Node.js Express API', icon: '⚡' },
      { step: 'AWS SDK v3 Engine', icon: '📦' },
      { step: 'AWS S3 Bucket', icon: '☁️' }
    ],
    features: [
      'Multi-part file upload support using Multer memory storage',
      'AWS S3 Presigned URL generation for secure temporary file downloads',
      'File metadata logging (file size, mime-type, upload timestamp)',
      'Bucket access key security management via Environment variables',
      'REST API endpoints for file deletion, listing, and direct download'
    ],
    techDetails: [
      { key: 'Backend Stack', value: 'Node.js, Express.js' },
      { key: 'AWS Service', value: 'Amazon S3 (Simple Storage Service)' },
      { key: 'AWS SDK Version', value: '@aws-sdk/client-s3 (v3)' },
      { key: 'Middleware', value: 'Multer, dotenv, cors' },
      { key: 'Storage Limits', value: 'Configurable file size stream buffer' }
    ],
    contribution: 'Integrated AWS SDK v3 S3 client, developed presigned URL endpoints to offload heavy server bandwidth, and built secure environment configuration management.',
    github: 'https://github.com/Ashish9123/cloud-file-storage-s3'
  },

  'ecommerce-api': {
    title: 'E-Commerce RESTful Backend API',
    overview: 'Designed a high-concurrency e-commerce backend API capable of handling product catalog querying, category filtering, cart operations, and order creation backed by PostgreSQL.',
    architecture: [
      { step: 'API Client / Frontend', icon: '🛒' },
      { step: 'Express Router API', icon: '⚡' },
      { step: 'Postgres Connection Pool', icon: '🐘' },
      { step: 'Docker Containerized DB', icon: '🐳' }
    ],
    features: [
      'RESTful endpoints for Products, Categories, Cart items, and Orders',
      'PostgreSQL database connection pooling for optimal performance',
      'Docker Compose configuration for one-command environment orchestration',
      'Input sanitization & parameterized SQL queries preventing SQL injection',
      'Pagination and sorting parameters for large product catalog searches'
    ],
    techDetails: [
      { key: 'Language & Server', value: 'JavaScript (Node.js) / Express.js' },
      { key: 'Database', value: 'PostgreSQL 14' },
      { key: 'DevOps / Containerization', value: 'Docker & Docker Compose' },
      { key: 'DB Driver', value: 'pg (node-postgres pool)' },
      { key: 'API Pattern', value: 'MVC Controller Architecture' }
    ],
    contribution: 'Architected relational SQL tables, wrote parameterized Postgres query models, configured Dockerfile and Docker Compose services, and created API documentation.',
    github: 'https://github.com/Ashish9123/ecommerce-backend-api'
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-content');
  const modalTitle = document.getElementById('modal-title');

  if (!modalBackdrop || !closeBtn || !modalBody) return;

  window.openProjectModal = function(projectId) {
    const data = PROJECT_DETAILS[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;

    const archHtml = data.architecture.map((item, index) => `
      <div class="arch-step">
        <div>${item.icon}</div>
        <div>${item.step}</div>
      </div>
      ${index < data.architecture.length - 1 ? '<div class="arch-arrow">➔</div>' : ''}
    `).join('');

    const featuresHtml = data.features.map(f => `
      <li class="feature-item"><span>${f}</span></li>
    `).join('');

    const techTableHtml = data.techDetails.map(t => `
      <tr>
        <th>${t.key}</th>
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
          <span>View Source on GitHub ➔</span>
        </a>
        <button class="btn btn-secondary btn-sm" onclick="closeProjectModal()">Close Specification</button>
      </div>
    `;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
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
}

/* ==========================================================================
   5. RESUME PREVIEW MODAL CONTROLLER
   ========================================================================== */
function initResumeModal() {
  const modalBackdrop = document.getElementById('resume-modal-backdrop');
  const closeBtn = document.getElementById('resume-modal-close-btn');

  if (!modalBackdrop || !closeBtn) return;

  window.openResumeModal = function() {
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeResumeModal = function() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
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
}

/* ==========================================================================
   7. CONTACT FORM EMAIL LAUNCHER
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-quick-form');
  const formToast = document.getElementById('contact-form-toast');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value || 'Opportunity Inquiry for Ashish Kumar';
    const message = document.getElementById('contact-message').value;

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
   8. PARTICLE TECH MOTION BACKGROUND CANVAS ENGINE (tsparticles style)
   ========================================================================== */
function init3DTechBackground() {
  const canvas = document.getElementById('tech-bg-3d');
  if (!canvas) return;

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
  });

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

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, 0.75)`;
      ctx.fill();
    }

    // Draw connecting lines
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

      // Mouse link lines
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
   9. 3D INTERACTIVE CARD PERSPECTIVE TILT
   ========================================================================== */
function init3DCardTilt() {
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
   10. LOADING SCREEN
   ========================================================================== */
function initLoadingScreen() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 800);
  });

  // Fallback: hide loader after 3s even if load event is slow
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 3000);
}

/* ==========================================================================
   11. TYPING ANIMATION (HERO)
   ========================================================================== */
function initTypingAnimation() {
  const typingEl = document.getElementById('hero-typing');
  if (!typingEl) return;

  const phrases = [
    'Software Developer | Backend & Cloud',
    'Building REST APIs & Full-Stack Apps',
    'Python · Java · Node.js · AWS',
    'Cloud-Deployed Systems Enthusiast'
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
   12. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (!revealElements.length) return;

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

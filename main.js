

document.addEventListener('DOMContentLoaded', () => {

  initPreloader();

  initCustomCursor();

  initStickyHeader();

  initOffcanvasMenu();

  initSearchPopup();

  initBackToTop();

  initSliders();

  initTiltEffect();

  initScrollReveal();

  initSplitText();
  initImageReveal();

  initCounterUp();

  initServiceListHover();

  initServiceTabFlip();

  initIntegrationGravity();

  initPricingSwitcher();

  initDashboardFeatures();

  initFormsAndAuth();

  initDeadLinksRouting();

  initAccordions();

  initParallaxEffects();

  initBlogFilters();

  initFlipIconsOnReveal();

  initActiveNavLink();

  initCustomSelects();
});

function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;

  const MIN_DISPLAY = 700;
  const MAX_DISPLAY = 2000;
  const start = performance.now();
  let hidden = false;

  document.body.classList.add('preloader-active');

  function hidePreloader() {
    if (hidden) return;
    hidden = true;
    preloader.classList.add('fade-out');
    document.body.classList.remove('preloader-active');
    setTimeout(() => preloader.remove(), 480);
  }

  function scheduleHide() {
    const elapsed = performance.now() - start;
    const delay = Math.max(0, MIN_DISPLAY - elapsed);
    setTimeout(hidePreloader, delay);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleHide, { once: true });
  } else {
    scheduleHide();
  }

  setTimeout(hidePreloader, MAX_DISPLAY);
}

function initCustomCursor() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  
  if (!dot || !ring) return;

  dot.style.display = 'block';
  ring.style.display = 'block';
  document.documentElement.classList.add('custom-cursor-active');

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverSelectors = 'a, button, .btn, .tj-primary-btn, .tilt-card, .service_item, .circle-icon, .social-icon, .team-card-wrapper, .db-menu-link, .db-action-btn, .filter-btn, .accordion-header';
  
  document.body.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelectors);
    if (target) {
      document.body.classList.add('cursor-hover');
      if (target.classList.contains('social-icon') || target.classList.contains('tj-primary-btn') || target.classList.contains('circle-icon') || target.classList.contains('nav-link') || target.classList.contains('db-action-btn') || target.classList.contains('btn-primary')) {
        document.body.classList.add('cursor-magnetic');
        target.style.transform = 'translateY(-2px) scale(1.03)';
      }
    }
  });

  document.body.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverSelectors);
    if (target) {
      document.body.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-magnetic');
      if (target.classList.contains('social-icon') || target.classList.contains('tj-primary-btn') || target.classList.contains('circle-icon') || target.classList.contains('nav-link') || target.classList.contains('db-action-btn') || target.classList.contains('btn-primary')) {
        target.style.transform = '';
      }
    }
  });
}

function initStickyHeader() {
  const header = document.querySelector('.header-area:not(.header-duplicate)');

  const updateSticky = () => {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', updateSticky, { passive: true });
  window.addEventListener('resize', updateSticky);
  updateSticky();
}

function initOffcanvasMenu() {
  const openBtns = document.querySelectorAll('.menu_offcanvas, .mobile_menu_bar');
  const closeBtn = document.querySelector('.hamburger_close_btn');
  const offcanvas = document.querySelector('.tj-offcanvas-area');
  const overlay = document.querySelector('.hamburger_bg');

  const closeOffcanvas = () => {
    if (!offcanvas) return;
    offcanvas.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  const openOffcanvas = (e) => {
    if (e) e.preventDefault();
    if (!offcanvas) return;
    offcanvas.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.classList.add('menu-open');
  };

  if (offcanvas) {
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (offcanvas.classList.contains('active')) {
          closeOffcanvas();
        } else {
          openOffcanvas(e);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeOffcanvas();
    });
    if (overlay) overlay.addEventListener('click', (e) => {
      e.preventDefault();
      closeOffcanvas();
    });

    offcanvas.querySelectorAll('.offcanvas-nav a, .offcanvas-actions a').forEach(link => {
      link.addEventListener('click', () => closeOffcanvas());
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) closeOffcanvas();
    });

    window.addEventListener('orientationchange', closeOffcanvas);
  }
}

function initSearchPopup() {
  const openBtns = document.querySelectorAll('.header-search button');
  const closeBtn = document.querySelector('.search_close_btn');
  const popup = document.querySelector('.search_popup');

  if (popup) {
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        popup.classList.add('active');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        popup.classList.remove('active');
      });
    }
  }
}

function initBackToTop() {
  const b2tWrapper = document.querySelector('.back-to-top-wrapper');
  const b2tBtn = document.getElementById('back_to_top');
  const progressCircle = document.querySelector('.back-to-top-bar');

  if (!b2tWrapper || !b2tBtn) return;

  const radius = progressCircle ? Number(progressCircle.getAttribute('r')) || 24 : 24;
  const circumference = 2 * Math.PI * radius;

  if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;
  }

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

    b2tWrapper.classList.toggle('show', scrollTop > 300);

    if (progressCircle) {
      progressCircle.style.strokeDashoffset = `${circumference - progress * circumference}`;
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  b2tBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initSliders() {
  if (typeof Swiper === 'undefined') return;

  const heroSliderEl = document.querySelector('.hero-bg-slider');
  if (heroSliderEl) {
    const heroContent = document.getElementById('heroDynamicContent');
    const heroTagText = document.getElementById('heroTagText');
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');

    function updateHeroContent(slide) {
      if (!slide || !heroContent) return;

      const { heroTag, heroTitle: titleHtml, heroDesc: descText } = slide.dataset;
      if (!heroTag && !titleHtml && !descText) return;

      heroContent.classList.remove('is-visible');
      heroContent.classList.add('is-changing');

      setTimeout(() => {
        if (heroTagText && heroTag) heroTagText.textContent = heroTag;
        if (heroTitle && titleHtml) heroTitle.innerHTML = titleHtml;
        if (heroDesc && descText) heroDesc.textContent = descText;
        heroContent.classList.remove('is-changing');
        heroContent.classList.add('is-visible');
      }, 280);
    }

    const isMobileHero = () => window.innerWidth < 768;

    const heroSwiper = new Swiper('.hero-bg-slider', {
      slidesPerView: 1,
      loop: true,
      speed: 900,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 5500,
        disableOnInteraction: false,
      },
      pagination: isMobileHero() ? false : {
        el: '.hero-slider-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.hero-next',
        prevEl: '.hero-prev',
      },
      on: {
        init(swiper) {
          updateHeroContent(swiper.slides[swiper.activeIndex]);
          heroContent?.classList.add('is-visible');
        },
        slideChangeTransitionStart(swiper) {
          updateHeroContent(swiper.slides[swiper.activeIndex]);
        },
      },
    });

    window.addEventListener('resize', () => {
      if (!heroSwiper?.params) return;
      const mobile = isMobileHero();
      heroSwiper.params.pagination = mobile ? false : {
        el: '.hero-slider-pagination',
        clickable: true,
      };
      if (heroSwiper.pagination?.el) {
        heroSwiper.pagination.el.style.display = mobile ? 'none' : '';
      }
      try {
        heroSwiper.update();
      } catch (err) {
        
      }
    });
  }

  const testimonialEl = document.querySelector('.testimonial-slider');
  if (testimonialEl) {
    new Swiper('.testimonial-slider', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      centeredSlides: true,
      speed: 400,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.testimonial-pagination',
        clickable: true,
        dynamicBullets: false,
      },
      breakpoints: {
        768: { slidesPerView: 1.15 },
        1024: { slidesPerView: 1.35 },
        1200: { slidesPerView: 1.65 },
      },
    });
  }
}

function initTiltEffect() {
  const cards = document.querySelectorAll('.tilt-card, .pricing_item');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((centerY - y) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .img-reveal, .split-text');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        
        entry.target.querySelectorAll('.split-text').forEach(el => animateSplitText(el));
        
        if (entry.target.classList.contains('split-text')) {
          animateSplitText(entry.target);
        }
        
        if (entry.target.classList.contains('db-panel')) {
          animateProgressBars(entry.target);
        }
        
        if (entry.target.classList.contains('dashboard-visual')) {
          animateChartBars(entry.target);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

function initSplitText() {
  document.querySelectorAll('.split-text').forEach(el => {
    if (el.dataset.splitDone) return;
    const html = el.innerHTML;
    const temp = document.createElement('div');
    temp.innerHTML = html;
    el.innerHTML = '';
    temp.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.className = 'split-char';
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.transitionDelay = `${i * 0.025}s`;
          el.appendChild(span);
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const wrapper = document.createElement('span');
        wrapper.innerHTML = node.outerHTML;
        wrapper.style.display = 'inline';
        el.appendChild(wrapper);
      }
    });
    el.dataset.splitDone = 'true';
  });
}

function animateSplitText(el) {
  el.classList.add('reveal-active', 'is-visible');
  el.querySelectorAll('.split-char').forEach((char, i) => {
    char.style.transitionDelay = `${i * 0.025}s`;
  });
}

function initImageReveal() {
  document.querySelectorAll('.img-reveal:not(.reveal)').forEach(el => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(el);
  });
}

function initCounterUp() {
  const counters = document.querySelectorAll('.counter[data-target], .counter:not([data-target])');
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-target') || el.textContent);
      const isDecimal = String(target).includes('.');
      const duration = 1800;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = isDecimal ? target.toFixed(2) : target;
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => {
    if (!c.getAttribute('data-target')) {
      c.setAttribute('data-target', c.textContent.trim());
      c.textContent = '0';
    }
    counterObserver.observe(c);
  });
}

function initServiceTabFlip() {
  const stackWrap = document.querySelector('.services_stack_wrap');
  const stack = document.querySelector('.services_stack');
  const tabs = document.querySelectorAll('.service_item[data-img]');
  if (!stack || !tabs.length) return;

  const FLIP_MS = 520;

  function resetCard(card) {
    if (!card) return;
    card.classList.remove('is-flip-out-x', 'is-flip-in-x');
    card.style.transition = '';
  }

  function flipCardIn(card) {
    if (!card) return;
    card.classList.remove('is-flip-out-x', 'is-flip-in-x');
    card.style.transition = 'none';
    card.classList.add('is-flip-in-x');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.transition = '';
        card.classList.remove('is-flip-in-x');
      });
    });
  }

  function switchTab(tab) {
    const prevActive = document.querySelector('.service_item.active');
    if (prevActive === tab) return;

    const nextCard = tab.querySelector('.service_flip_card');

    if (prevActive) {
      const prevCard = prevActive.querySelector('.service_flip_card');
      prevActive.classList.remove('active');
      prevActive.setAttribute('aria-selected', 'false');
      if (prevCard) {
        prevCard.classList.remove('is-flip-in-x');
        prevCard.classList.add('is-flip-out-x');
        window.setTimeout(() => resetCard(prevCard), FLIP_MS);
      }
    }

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    flipCardIn(nextCard);

    if (window.matchMedia('(max-width: 768px)').matches) {
      window.requestAnimationFrame(() => {
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  }

  function getTabFromPoint(clientY) {
    let matched = null;

    tabs.forEach((tab) => {
      const parts = tab.querySelectorAll('.service_tab_num, .service_tab_media, .service_tab_content');
      let top = Infinity;
      let bottom = -Infinity;
      parts.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.height === 0 && rect.width === 0) return;
        top = Math.min(top, rect.top);
        bottom = Math.max(bottom, rect.bottom);
      });
      if (top !== Infinity && clientY >= top - 8 && clientY <= bottom + 8) {
        matched = tab;
      }
    });

    if (matched) return matched;

    let closest = tabs[0];
    let minDist = Infinity;
    tabs.forEach((tab) => {
      const content = tab.querySelector('.service_tab_content');
      if (!content) return;
      const rect = content.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(clientY - center);
      if (dist < minDist) {
        minDist = dist;
        closest = tab;
      }
    });
    return closest;
  }

  const trackTarget = stackWrap || stack;
  let lastClientY = window.innerHeight / 2;
  let isMouseInTrackTarget = false;

  trackTarget.addEventListener('mouseenter', () => {
    isMouseInTrackTarget = true;
  });
  
  trackTarget.addEventListener('mouseleave', () => {
    isMouseInTrackTarget = false;
  });

  trackTarget.addEventListener('mousemove', (e) => {
    lastClientY = e.clientY;
    switchTab(getTabFromPoint(lastClientY));
  });

  window.addEventListener('scroll', () => {
    if (isMouseInTrackTarget) {
      switchTab(getTabFromPoint(lastClientY));
    }
  }, { passive: true });

  tabs.forEach(tab => {
    tab.addEventListener('focus', () => switchTab(tab));
    tab.addEventListener('click', () => {
      window.location.href = '404.html';
    });
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = '404.html';
      }
    });
  });
}

function initServiceListHover() {
  const items = document.querySelectorAll('.service_list_item[data-reveal-img]');
  items.forEach(item => {
    const imgEl = item.querySelector('.service_reveal_img');
    const imgUrl = item.getAttribute('data-reveal-img');
    if (imgEl && imgUrl) imgEl.style.backgroundImage = `url('${imgUrl}')`;

    item.addEventListener('mouseenter', () => {
      items.forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
    });
  });
  if (items.length) items[0].classList.add('is-active');
}

function initParallaxEffects() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const badges = document.querySelectorAll('.floating-badge');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    badges.forEach((badge, i) => {
      const speed = i === 0 ? 0.04 : 0.06;
      badge.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

function animateChartBars(parent) {
  const bars = parent.querySelectorAll('.chart-bar');
  const heights = ['65%', '50%', '85%', '70%', '60%', '90%', '75%', '95%'];
  
  bars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.height = heights[index] || '50%';
    }, index * 60);
  });
}

function animateProgressBars(parent) {
  const progressBars = parent.querySelectorAll('.db-progress-bar');
  progressBars.forEach(bar => {
    const val = bar.getAttribute('data-value') || '50%';
    bar.style.width = val;
  });
}

function initFlipIconsOnReveal() {
  const icons = document.querySelectorAll('.hero-feature-icon, .card-icon-box, .btn-icon');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('flip-active');
        setTimeout(() => entry.target.classList.remove('flip-active'), 700);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  icons.forEach(icon => observer.observe(icon));
}

function initBlogFilters() {
  const filterBtns = document.querySelectorAll('.blog-filters .filter-btn[data-filter]');
  const cards = document.querySelectorAll('.blog-grid .blog-card[data-category]');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.classList.remove('reveal-active');
          void card.offsetWidth;
          card.classList.add('reveal-active');
        }
      });
    });
  });
}

function initPricingSwitcher() {
  const switcher = document.querySelector('.toggle-checkbox');
  const prices = document.querySelectorAll('.pricing_value .val');
  
  const monthlyRates = ['$12', '$45', 'Custom'];
  const yearlyRates = ['$10', '$38', 'Custom'];

  if (switcher && prices.length > 0) {
    switcher.addEventListener('change', () => {
      prices.forEach((price, index) => {
        const rateArray = switcher.checked ? yearlyRates : monthlyRates;
        const timeLabel = switcher.checked ? '/ yr' : '/ mo';
        
        price.innerHTML = rateArray[index];
        const timeEl = price.nextElementSibling;
        if (timeEl && timeEl.classList.contains('time')) {
          timeEl.innerHTML = rateArray[index] === 'Custom' ? '' : timeLabel;
        }
      });
    });
  }
}

function initDashboardFeatures() {
  if (!document.body.classList.contains('dashboard-page')) return;

  const progressBars = document.querySelectorAll('.db-progress-bar');
  progressBars.forEach(bar => {
    const val = bar.getAttribute('data-value') || '50%';
    bar.style.width = val;
  });

  const statValues = document.querySelectorAll('.db-stat-value');
  if (statValues.length > 0) {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * statValues.length);
      const statVal = statValues[randomIndex];
      
      if (statVal.innerText.includes('$') || statVal.innerText.includes('/')) return;
      
      const isPercent = statVal.innerText.includes('%');
      const isMs = statVal.innerText.includes('ms');
      
      let num = parseFloat(statVal.innerText);
      if (!isNaN(num)) {
        const change = (Math.random() - 0.5) * (num * 0.02);
        num = (num + change).toFixed(isPercent || isMs ? 1 : 0);
        
        if (isPercent) {
          statVal.innerText = `${Math.min(100, Math.max(0, num))}%`;
        } else if (isMs) {
          statVal.innerText = `${num}ms`;
        } else {
          statVal.innerText = parseInt(num).toLocaleString();
        }
      }
    }, 4000);
  }

  initDashboardPage();
  initDashboardStubButtons();
}

function initDashboardStubButtons() {
  if (!document.body.classList.contains('dashboard-page')) return;

  document.querySelectorAll('.dashboard-page button').forEach((btn) => {
    if (btn.id === 'logoutBtn' || btn.id === 'dashboardMenuToggle' || btn.closest('.logout-modal-box')) return;
    if (btn.closest('.custom-select-wrapper')) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });
}

function initFormsAndAuth() {
  window.addEventListener('pageshow', function(event) {
    if (!(event.persisted || (window.performance && window.performance.navigation.type === 2))) return;

    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
      const passwordField = document.getElementById('password');
      if (passwordField) passwordField.value = '';
      const submitBtn = document.getElementById('signinSubmit');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">Sign In <i class="fas fa-arrow-right"></i></span>';
      }
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      const passwordField = document.getElementById('password');
      if (passwordField) passwordField.value = '';
      const confirmPw = document.getElementById('confirmPassword');
      if (confirmPw) confirmPw.value = '';
      const submitBtn = document.getElementById('signupSubmit');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">Create New Account <i class="fas fa-user-plus"></i></span>';
      }
    }
  });

  document.querySelectorAll('#signinForm input[name="role"], #signupForm input[name="role"]').forEach((input) => {
    input.addEventListener('change', () => {});
  });

  document.querySelectorAll('.password-toggle').forEach((btn) => {
    btn.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const icon = this.querySelector('i');
      if (!input || !icon) return;

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });

  document.querySelectorAll('.signin-form-input').forEach((input) => {
    input.addEventListener('input', function() {
      const group = this.closest('.signin-form-group');
      if (group) group.classList.remove('has-error');
    });
  });

  const signinForm = document.getElementById('signinForm');
  if (signinForm) {
    signinForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const fullName = document.getElementById('fullName')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const password = document.getElementById('password')?.value || '';
      const roleInput = document.querySelector('#signinForm input[name="role"]:checked');
      const role = roleInput ? roleInput.value : 'customer';
      let isValid = true;

      const nameGroup = document.getElementById('nameGroup');
      const emailGroup = document.getElementById('emailGroup');
      const passwordGroup = document.getElementById('passwordGroup');

      const fullNameErrorMsg = nameGroup?.querySelector('.error-message');
      if (!fullName) {
        nameGroup?.classList.add('has-error');
        if (fullNameErrorMsg) fullNameErrorMsg.textContent = 'Please enter your full name.';
        isValid = false;
      } else if (!validateName(fullName)) {
        nameGroup?.classList.add('has-error');
        if (fullNameErrorMsg) fullNameErrorMsg.textContent = 'Name contains only alphabets';
        isValid = false;
      } else {
        nameGroup?.classList.remove('has-error');
      }

      if (!validateEmail(email)) {
        emailGroup?.classList.add('has-error');
        isValid = false;
      }
      if (!validatePassword(password)) {
        passwordGroup?.classList.add('has-error');
        isValid = false;
      }

      if (!isValid) {
        showAuthToast('signinToast', 'Please fix the errors in the form.', 'error');
        return;
      }

      const submitBtn = document.getElementById('signinSubmit');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authorizing...';
      }

      showAuthToast('signinToast', 'Welcome back! Redirecting...', 'success');

      sessionStorage.setItem('stackly_user', JSON.stringify({
        loggedIn: true,
        name: fullName,
        email: email,
        role: role
      }));

      setTimeout(() => {
        window.location.href = (role === 'admin') ? 'admin-dashboard.html' : 'customer-dashboard.html';
      }, 1500);
    });

    const fullNameEl = document.getElementById('fullName');
    if (fullNameEl) {
      fullNameEl.addEventListener('blur', function() {
        const val = this.value.trim();
        const group = document.getElementById('nameGroup');
        const errorMsg = group?.querySelector('.error-message');
        if (val && !validateName(val)) {
          group?.classList.add('has-error');
          if (errorMsg) errorMsg.textContent = 'Name contains only alphabets';
        } else if (!val) {
          group?.classList.add('has-error');
          if (errorMsg) errorMsg.textContent = 'Please enter your full name.';
        } else {
          group?.classList.remove('has-error');
        }
      });
    }

    const emailEl = document.getElementById('email');
    if (emailEl) {
      emailEl.addEventListener('blur', function() {
        if (this.value.trim() && !validateEmail(this.value.trim())) {
          document.getElementById('emailGroup')?.classList.add('has-error');
        }
      });
    }

    const passwordEl = document.getElementById('password');
    if (passwordEl) {
      passwordEl.addEventListener('blur', function() {
        if (this.value && !validatePassword(this.value)) {
          document.getElementById('passwordGroup')?.classList.add('has-error');
        }
      });
    }
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const firstName = document.getElementById('firstName')?.value.trim() || '';
      const lastName = document.getElementById('lastName')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const password = document.getElementById('password')?.value || '';
      const confirmPassword = document.getElementById('confirmPassword')?.value || '';
      const terms = document.getElementById('terms')?.checked;
      const roleInput = document.querySelector('#signupForm input[name="role"]:checked');
      const role = roleInput ? roleInput.value : 'customer';

      let isValid = true;

      if (!validateName(firstName)) document.getElementById('fnameGroup')?.classList.add('has-error');
      if (!validateName(lastName)) document.getElementById('lnameGroup')?.classList.add('has-error');
      if (!validateEmail(email)) document.getElementById('emailGroup')?.classList.add('has-error');
      if (!validatePassword(password)) document.getElementById('passwordGroup')?.classList.add('has-error');

      const confirmGroup = document.getElementById('confirmPasswordGroup');
      if (confirmPassword !== password || !confirmPassword) {
        confirmGroup?.classList.add('has-error');
        isValid = false;
      }

      if (!terms) {
        document.getElementById('termsGroup')?.classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('termsGroup')?.classList.remove('has-error');
      }

      if (!validateName(firstName) || !validateName(lastName) || !validateEmail(email) || !validatePassword(password)) {
        isValid = false;
      }

      if (!isValid) {
        showAuthToast('signupToast', 'Please fix the errors in the form.', 'error');
        return;
      }

      const submitBtn = document.getElementById('signupSubmit');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
      }

      showAuthToast('signupToast', 'Account created successfully! Redirecting...', 'success');

      setTimeout(() => {
        window.location.href = 'signin.html';
      }, 1500);
    });

    const firstNameEl = document.getElementById('firstName');
    if (firstNameEl) {
      firstNameEl.addEventListener('blur', function() {
        if (this.value.trim() && !validateName(this.value.trim())) {
          document.getElementById('fnameGroup')?.classList.add('has-error');
        }
      });
    }

    const lastNameEl = document.getElementById('lastName');
    if (lastNameEl) {
      lastNameEl.addEventListener('blur', function() {
        if (this.value.trim() && !validateName(this.value.trim())) {
          document.getElementById('lnameGroup')?.classList.add('has-error');
        }
      });
    }

    const emailEl = document.getElementById('email');
    if (emailEl) {
      emailEl.addEventListener('blur', function() {
        if (this.value.trim() && !validateEmail(this.value.trim())) {
          document.getElementById('emailGroup')?.classList.add('has-error');
        }
      });
    }

    const passwordEl = document.getElementById('password');
    if (passwordEl) {
      passwordEl.addEventListener('blur', function() {
        if (this.value && !validatePassword(this.value)) {
          document.getElementById('passwordGroup')?.classList.add('has-error');
        }
      });
    }

    const confirmPasswordEl = document.getElementById('confirmPassword');
    if (confirmPasswordEl) {
      confirmPasswordEl.addEventListener('blur', function() {
        const pw = document.getElementById('password')?.value || '';
        if (this.value && this.value !== pw) {
          document.getElementById('confirmPasswordGroup')?.classList.add('has-error');
        }
      });
    }

    const termsEl = document.getElementById('terms');
    if (termsEl) {
      termsEl.addEventListener('change', function() {
        if (this.checked) document.getElementById('termsGroup')?.classList.remove('has-error');
      });
    }
  }
}

function showAuthToast(toastId, msg, type = 'success') {
  const t = document.getElementById(toastId);
  if (!t) return;

  const messageEl = t.querySelector('.toast-message');
  const iconEl = t.querySelector('i');
  if (messageEl) messageEl.textContent = msg;
  t.className = 'auth-toast ' + type + ' show';

  if (iconEl) {
    iconEl.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
  }

  setTimeout(() => t.classList.remove('show'), 3500);
}

function validateName(name) {
  return /^[a-zA-Z\s]+$/.test(name) && name.trim().length >= 1;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(pw) {
  return pw.trim().length >= 1;
}

function initActiveNavLink() {
  let currentPath = window.location.pathname.split('/').pop();
  if (!currentPath || currentPath === '') currentPath = 'index.html';

  document.querySelectorAll('.mainmenu ul li a, .offcanvas-nav ul li a').forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === currentPath);
  });
}

function initCustomSelects() {
  const customSelects = document.querySelectorAll('select.custom-select');

  customSelects.forEach((select) => {
    if (select.dataset.customSelectReady === 'true') return;
    select.dataset.customSelectReady = 'true';
    select.style.display = 'none';

    const selectedOption = select.options[select.selectedIndex];
    const wrapper = document.createElement('div');
    wrapper.classList.add('custom-select-wrapper');

    const trigger = document.createElement('div');
    trigger.classList.add('custom-select-trigger');
    trigger.innerHTML = '<span>' + (selectedOption ? selectedOption.text : 'Select...') + '</span>';

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('custom-options');

    Array.from(select.options).forEach((option, index) => {
      const customOption = document.createElement('div');
      customOption.classList.add('custom-option');
      if (index === select.selectedIndex) customOption.classList.add('selected');
      customOption.textContent = option.text;

      customOption.addEventListener('click', function(e) {
        e.stopPropagation();
        select.selectedIndex = index;
        const label = trigger.querySelector('span');
        if (label) label.textContent = option.text;
        wrapper.querySelectorAll('.custom-option').forEach((opt) => opt.classList.remove('selected'));
        this.classList.add('selected');
        wrapper.classList.remove('open');
      });

      optionsContainer.appendChild(customOption);
    });

    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      document.querySelectorAll('.custom-select-wrapper').forEach((w) => {
        if (w !== wrapper) w.classList.remove('open');
      });
      wrapper.classList.toggle('open');
    });

    wrapper.appendChild(trigger);
    wrapper.appendChild(optionsContainer);
    if (select.parentNode) {
      select.parentNode.insertBefore(wrapper, select.nextSibling);
    }
  });

  if (!document.body.dataset.customSelectBound) {
    document.body.dataset.customSelectBound = 'true';
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.custom-select-wrapper')) {
        document.querySelectorAll('.custom-select-wrapper').forEach((w) => w.classList.remove('open'));
      }
    });
  }
}

function initDeadLinksRouting() {
  const allLinks = document.querySelectorAll('a[href], .card, .blog-card, .tilt-card, .tj-primary-btn, .hero-secondary-btn, .pricing_item');

  allLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === null) return;

    if (href === '#' || href === '' || href === '404.html') {
      link.addEventListener('click', (e) => {
        if (
          !link.classList.contains('service_item')
          && !link.hasAttribute('data-bs-toggle')
          && !link.classList.contains('db-menu-link')
          && !link.hasAttribute('data-dashboard-tab')
          && !link.closest('.dashboard-layout')
        ) {
          e.preventDefault();
          window.location.href = '404.html';
        }
      });
    }
  });
}

function initDashboardPage() {
  const page = document.querySelector('[data-dashboard-page]');
  if (!page) return;

  const isAdmin = page.getAttribute('data-dashboard-page') === 'admin';
  const sectionKey = isAdmin ? 'stackly_admin_section' : 'stackly_customer_section';
  const prevKey = isAdmin ? 'stackly_admin_prev_section' : 'stackly_customer_prev_section';
  const returnKey = isAdmin ? 'stackly_admin_return' : 'stackly_customer_return';
  const defaultSection = page.getAttribute('data-default-section') || 'overview';

  const sessionUser = sessionStorage.getItem('stackly_user');
  const localUser = localStorage.getItem('stackly_user');
  const rawUser = sessionUser || localUser;
  if (!rawUser) {
    window.location.replace('signin.html');
    return;
  }

  let parsedUser = null;
  try {
    parsedUser = JSON.parse(rawUser);
  } catch (err) {
    window.location.replace('signin.html');
    return;
  }

  const requestedName = 'Raj Kumar';
  const requestedEmail = 'rajesh.kumar.admin.longest.email';
  const activeUser = {
    name: parsedUser?.name || requestedName,
    email: parsedUser?.email || requestedEmail,
    role: parsedUser?.role || (isAdmin ? 'Admin' : 'Customer'),
  };

  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const toggleBtn = document.getElementById('dashboardMenuToggle');
  const goBackBtn = document.getElementById('dashboardGoBack');
  const logoutBtn = document.getElementById('logoutBtn');
  const menuLinks = Array.from(document.querySelectorAll('.db-menu-link[data-dashboard-tab]'));
  const panels = Array.from(document.querySelectorAll('.db-panel[data-dashboard-panel]'));
  const topbarTitle = document.getElementById('dashboardTopbarTitle');
  const topbarBreadcrumb = document.getElementById('dashboardTopbarBreadcrumb');
  const heroTitle = document.getElementById('dashboardHeroTitle');
  const heroCopy = document.getElementById('dashboardHeroCopy');
  const sidebarName = document.getElementById('sidebarUserName');
  const sidebarEmail = document.getElementById('sidebarUserEmail');
  const sidebarInitial = document.getElementById('sidebarUserInitial');
  const heroName = document.getElementById('dashboardHeroName');
  const heroEmail = document.getElementById('dashboardHeroEmail');
  const topbarName = document.getElementById('dashboardTopbarName');
  const topbarRole = document.getElementById('dashboardTopbarRole');

  if (sidebarName) sidebarName.textContent = activeUser.name;
  if (sidebarEmail) sidebarEmail.textContent = activeUser.email;
  if (sidebarInitial) sidebarInitial.textContent = (activeUser.name || 'R').trim().charAt(0).toUpperCase();
  if (heroName) heroName.textContent = activeUser.name;
  if (heroEmail) heroEmail.textContent = activeUser.email;
  if (topbarName) topbarName.textContent = activeUser.name;
  if (topbarRole) topbarRole.textContent = `${activeUser.role} Workspace`;

  function lockScroll() {
    document.documentElement.classList.add('db-no-scroll');
    document.body.classList.add('db-no-scroll');
  }

  function unlockScroll() {
    document.documentElement.classList.remove('db-no-scroll');
    document.body.classList.remove('db-no-scroll');
  }

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('active');
    overlay?.classList.add('active');
    toggleBtn?.classList.add('open');
    toggleBtn?.setAttribute('aria-expanded', 'true');
    toggleBtn?.setAttribute('aria-label', 'Close menu');
    lockScroll();
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('active');
    overlay?.classList.remove('active');
    toggleBtn?.classList.remove('open');
    toggleBtn?.setAttribute('aria-expanded', 'false');
    toggleBtn?.setAttribute('aria-label', 'Open menu');
    unlockScroll();
  }

  function sectionMeta(sectionId) {
    const link = menuLinks.find((item) => item.getAttribute('data-dashboard-tab') === sectionId);
    const panel = panels.find((item) => item.getAttribute('data-dashboard-panel') === sectionId);
    const title = panel?.getAttribute('data-section-title') || link?.querySelector('.db-menu-text')?.textContent?.trim() || 'Dashboard';
    const breadcrumb = panel?.getAttribute('data-section-breadcrumb') || `Dashboard / ${title}`;
    let hero = panel?.getAttribute('data-section-hero') || title;
    
    if (hero.includes('<span>Rajesh Kumar</span>')) {
      hero = hero.replace('<span>Rajesh Kumar</span>', `<span>${activeUser.name}</span>`);
    } else if (hero.includes('<span>Rajkumar S</span>')) {
      hero = hero.replace('<span>Rajkumar S</span>', `<span>${activeUser.name}</span>`);
    }

    const copy = panel?.getAttribute('data-section-copy') || 'Operational insights and curated metrics are available in this workspace.';
    return { title, breadcrumb, hero, copy };
  }

  function setPreviousSection(nextSectionId) {
    const current = sessionStorage.getItem(sectionKey);
    if (current && current !== nextSectionId) {
      sessionStorage.setItem(prevKey, current);
    }
  }

  function updateGoBackVisibility() {
    const prev = sessionStorage.getItem(prevKey);
    if (!goBackBtn) return;
    if (prev && prev !== sessionStorage.getItem(sectionKey)) {
      goBackBtn.removeAttribute('hidden');
      goBackBtn.disabled = false;
    } else {
      goBackBtn.setAttribute('hidden', 'hidden');
      goBackBtn.disabled = true;
    }
  }

  function activateSection(sectionId, options = {}) {
    const { storePrevious = true, closeMobile = true } = options;
    const targetPanel = panels.find((panel) => panel.getAttribute('data-dashboard-panel') === sectionId);
    const targetLink = menuLinks.find((link) => link.getAttribute('data-dashboard-tab') === sectionId);
    if (!targetPanel || !targetLink) return;

    if (storePrevious) setPreviousSection(sectionId);

    menuLinks.forEach((link) => {
      const active = link === targetLink;
      link.classList.toggle('active', active);
      link.setAttribute('aria-current', active ? 'page' : 'false');
    });

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel === targetPanel);
    });

    const meta = sectionMeta(sectionId);
    if (topbarTitle) topbarTitle.innerHTML = meta.title;
    if (topbarBreadcrumb) topbarBreadcrumb.textContent = meta.breadcrumb;
    if (heroTitle) heroTitle.innerHTML = meta.hero;
    if (heroCopy) heroCopy.textContent = meta.copy;

    sessionStorage.setItem(sectionKey, sectionId);
    sessionStorage.setItem(returnKey, sectionId);
    updateGoBackVisibility();

    if (closeMobile && window.innerWidth <= 992) closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  menuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      activateSection(link.getAttribute('data-dashboard-tab'));
    });
  });

  toggleBtn?.addEventListener('click', () => {
    if (sidebar?.classList.contains('active')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay?.addEventListener('click', closeSidebar);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) closeSidebar();
  });

  goBackBtn?.addEventListener('click', () => {
    const previous = sessionStorage.getItem(prevKey);
    const current = sessionStorage.getItem(sectionKey);
    if (!previous || previous === current) return;
    sessionStorage.setItem(prevKey, current || defaultSection);
    activateSection(previous, { storePrevious: false });
  });

  const logoutModal = document.getElementById('logoutModal');
  const logoutCancelBtn = document.getElementById('logoutCancelBtn');
  const logoutConfirmBtn = document.getElementById('logoutConfirmBtn');

  function executeLogout() {
    localStorage.removeItem('stackly_user');
    sessionStorage.removeItem('stackly_user');
    sessionStorage.removeItem(sectionKey);
    sessionStorage.removeItem(prevKey);
    sessionStorage.removeItem(returnKey);
    window.location.replace('signin.html');
  }

  logoutBtn?.addEventListener('click', () => {
    if (logoutModal) {
      logoutModal.classList.add('active');
    } else if (window.confirm('Are you sure you want to log out?')) {
      executeLogout();
    }
  });

  logoutCancelBtn?.addEventListener('click', () => {
    logoutModal?.classList.remove('active');
  });

  logoutConfirmBtn?.addEventListener('click', () => {
    executeLogout();
  });

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
    const url = new URL(href, window.location.href);
    const isDash = url.pathname.endsWith('/admin-dashboard.html') || url.pathname.endsWith('/customer-dashboard.html');
    const isSafe = url.pathname.endsWith('/404.html')
      || url.pathname.endsWith('/signin.html')
      || url.pathname.endsWith('/signup.html');
    if (!isDash && !isSafe) {
      localStorage.removeItem('stackly_user');
      sessionStorage.removeItem('stackly_user');
    }
  });

  const requestedSection = sessionStorage.getItem(returnKey)
    || sessionStorage.getItem(sectionKey)
    || defaultSection;
  sessionStorage.removeItem(returnKey);
  activateSection(requestedSection, { storePrevious: false, closeMobile: false });
}

function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const currentContent = header.nextElementSibling;
      if (!currentContent) return;
      const currentIcon = header.querySelector('i');

      document.querySelectorAll('.accordion-content').forEach(content => {
        if (content !== currentContent) {
          content.style.maxHeight = null;
          content.classList.remove('active');
          content.closest('.accordion-item')?.classList.remove('active');
          const icon = content.previousElementSibling?.querySelector('i');
          if (icon) icon.className = 'fas fa-chevron-down';
        }
      });

      if (currentContent.classList.contains('active')) {
        currentContent.style.maxHeight = null;
        currentContent.classList.remove('active');
        header.closest('.accordion-item')?.classList.remove('active');
        if (currentIcon) currentIcon.className = 'fas fa-chevron-down';
      } else {
        currentContent.style.maxHeight = currentContent.scrollHeight + "px";
        currentContent.classList.add('active');
        header.closest('.accordion-item')?.classList.add('active');
        if (currentIcon) currentIcon.className = 'fas fa-chevron-up';
      }
    });
  });
}

function initIntegrationGravity() {
  const container = document.querySelector('.integration-grid');
  if (!container) return;

  const section = container.closest('.integration-section');
  const headerEl = section?.querySelector('.integration-header');
  const MOBILE_BP = 768;
  const MIN_WIDTH = 240;
  const DRAG_THRESHOLD = 12;
  const MOBILE_DRAG_THRESHOLD = 22;

  let physics = null;
  let isBuilding = false;
  let resizeTimer = null;
  let bootResizeObserver = null;
  let intersectionObserver = null;

  function getChips() {
    return Array.from(container.querySelectorAll('.integration-chip'));
  }

  function getMode(boundsW) {
    return boundsW <= MOBILE_BP ? 'mobile' : 'desktop';
  }

  function syncChipTransform(chip, x, y, w, h, angle = 0) {
    const rotate = angle ? ` rotate(${angle}rad)` : '';
    chip.style.transform = `translate3d(${x - w / 2}px, ${y - h / 2}px, 0)${rotate}`;
  }

  function getLayout(boundsW, chipCount = 12) {
    const isMobile = boundsW <= MOBILE_BP;
    const gap = isMobile ? 10 : 12;
    const pad = isMobile ? 10 : 16;
    const chipH = isMobile ? 50 : 64;

    let cols;
    if (isMobile) {
      cols = 2;
    } else if (boundsW <= 1100) {
      cols = 5;
    } else {
      cols = 6;
    }

    const available = boundsW - pad * 2 - gap * (cols - 1);
    const rawChipW = Math.floor(available / cols);
    const minChipW = isMobile ? 80 : 110;

    if (rawChipW < minChipW) {
      return null;
    }

    return {
      chipW: rawChipW,
      chipH,
      cols,
      gap,
      pad,
      rows: Math.ceil(chipCount / cols),
      isMobile,
    };
  }

  function getHeaderOverlap(boundsW) {
    if (!headerEl) return boundsW <= MOBILE_BP ? 108 : 152;
    const extra = boundsW <= MOBILE_BP ? 4 : 16;
    return Math.ceil(headerEl.offsetHeight) + extra;
  }

  function getPlayHeight(boundsW, layout, chipCount) {
    const stackRows = Math.ceil(chipCount / layout.cols);
    const stackHeight = stackRows * layout.chipH * 0.86;
    const throwRoom = layout.chipH * 2.4;

    if (boundsW <= MOBILE_BP) {
      const rowStride = layout.chipH + layout.gap * 0.22;
      const settledHeight = stackRows * rowStride + layout.pad;
      const throwRoomMobile = layout.chipH * 0.7;
      return Math.ceil(settledHeight + throwRoomMobile + 6);
    }
    return Math.max(stackHeight + throwRoom + 36, window.innerHeight * 0.28);
  }

  function resetChipStyles() {
    getChips().forEach((chip) => {
      chip.style.transform = '';
      chip.style.width = '';
      chip.style.height = '';
      chip.style.zIndex = '';
      chip.style.visibility = '';
      chip.style.opacity = '';
      chip.style.display = '';
      chip.classList.remove('is-dragging');
    });
  }

  function getContainerWidth() {
    return container.clientWidth || container.offsetWidth || window.innerWidth;
  }

  function canBuild() {
    const chips = getChips();
    const width = getContainerWidth();
    if (!chips.length || width < MIN_WIDTH) return false;
    return Boolean(getLayout(width, chips.length));
  }

  function fallbackToStatic() {
    destroyPhysics();
    container.classList.add('is-static');
    container.classList.remove('is-physics-ready');
    container.style.marginTop = '';
    container.style.paddingTop = '';
    container.style.height = '';
    container.style.touchAction = '';
    resetChipStyles();
  }

  function isAnyChipVisible() {
    const arena = container.getBoundingClientRect();
    if (!arena.width || !arena.height) return false;
    return getChips().some((chip) => {
      const rect = chip.getBoundingClientRect();
      return rect.width > 8 && rect.height > 8
        && rect.bottom > arena.top + 4
        && rect.top < arena.bottom - 4;
    });
  }

  function destroyPhysics() {
    if (!physics) return;

    const { runner, engine, onResize, onOrientation, chipCleanups, visibilityTimer } = physics;

    if (visibilityTimer) window.clearTimeout(visibilityTimer);

    try {
      Matter.Runner.stop(runner);
      Matter.Events.off(engine);
      Matter.Engine.clear(engine);
    } catch (err) {
      
    }

    window.removeEventListener('resize', onResize);
    window.removeEventListener('orientationchange', onOrientation);
    chipCleanups.forEach((cleanup) => cleanup());

    physics = null;
    container.classList.remove('is-physics-ready');
    container.style.touchAction = 'pan-y';
    document.body.style.overflow = '';
    resetChipStyles();
  }

  function applyArenaLayout(boundsW, layout, chipCount) {
    const headerOverlap = getHeaderOverlap(boundsW);
    const playHeight = getPlayHeight(boundsW, layout, chipCount);
    const totalHeight = Math.round(playHeight + headerOverlap);

    container.style.marginTop = `-${headerOverlap}px`;
    container.style.paddingTop = `${headerOverlap}px`;
    container.style.height = `${totalHeight}px`;

    return { headerOverlap, boundsH: totalHeight };
  }

  function buildPhysics() {
    if (isBuilding) return false;

    const chips = getChips();
    if (!chips.length || typeof Matter === 'undefined') {
      if (typeof Matter === 'undefined') fallbackToStatic();
      return false;
    }

    const width = getContainerWidth();
    const layout = getLayout(width, chips.length);
    if (!layout || width < MIN_WIDTH) {
      fallbackToStatic();
      return false;
    }

    isBuilding = true;
    destroyPhysics();
    container.classList.remove('is-static');

    const mode = getMode(width);
    const { headerOverlap } = applyArenaLayout(width, layout, chips.length);

    const boundsW = getContainerWidth();
    let boundsH = container.clientHeight;
    if (boundsH < 80) {
      isBuilding = false;
      fallbackToStatic();
      return false;
    }

    let visibilityTimer = null;

    try {
      const Engine = Matter.Engine;
      const Runner = Matter.Runner;
      const Bodies = Matter.Bodies;
      const Body = Matter.Body;
      const Composite = Matter.Composite;
      const Events = Matter.Events;
      const Sleeping = Matter.Sleeping;

      const { chipW, chipH, cols, gap, pad } = layout;
      const wall = 50;

      const engine = Engine.create({
        enableSleeping: true,
        positionIterations: layout.isMobile ? 7 : 8,
        velocityIterations: layout.isMobile ? 5 : 6,
      });
      engine.gravity.y = layout.isMobile ? 1.05 : 1.2;

      const world = engine.world;
      const chipBodies = [];
      const chipCleanups = [];

      const walls = {
        ground: Bodies.rectangle(
          boundsW / 2,
          boundsH - (layout.isMobile ? 1 : 8) + wall / 2,
          boundsW * 2,
          wall,
          { isStatic: true, friction: 0.95, restitution: 0.05, label: 'wall' }
        ),
        left: Bodies.rectangle(-wall / 2, boundsH / 2, wall, boundsH * 3, { isStatic: true, label: 'wall' }),
        right: Bodies.rectangle(boundsW + wall / 2, boundsH / 2, wall, boundsH * 3, { isStatic: true, label: 'wall' }),
        top: Bodies.rectangle(boundsW / 2, -wall / 2, boundsW * 2, wall, { isStatic: true, label: 'wall' }),
      };
      Composite.add(world, Object.values(walls));

      function bringToFront(item) {
        item.dom.classList.add('is-dragging');
        item.dom.style.zIndex = '120';
      }

      function releaseChip(item) {
        item.dom.classList.remove('is-dragging');
      }

      chips.forEach((chip, index) => {
        chip.style.width = `${chipW}px`;
        chip.style.height = `${chipH}px`;
        chip.style.display = 'inline-flex';
        chip.style.opacity = '1';
        chip.style.visibility = 'visible';

        let startX;
        let startY;

        if (layout.isMobile) {
          const col = index % cols;
          const spawnRow = Math.floor(index / cols);
          const baseX = pad + col * (chipW + gap) + chipW / 2;
          startX = baseX + (Math.random() - 0.5) * (gap * 0.4);
          startY = 18 + spawnRow * 10 + Math.random() * chipH * 0.25;
        } else {
          const usableW = Math.max(0, boundsW - pad * 2 - chipW);
          const scatterRow = Math.floor(index / cols);
          startX = pad + chipW / 2 + Math.random() * usableW;
          startY = 24 + scatterRow * 16 + (index % cols) * 6 + Math.random() * chipH * 0.35;
        }

        const body = Bodies.rectangle(startX, startY, chipW, chipH, {
          restitution: layout.isMobile ? 0.12 : 0.11,
          friction: layout.isMobile ? 0.62 : 0.66,
          frictionStatic: layout.isMobile ? 0.78 : 0.8,
          frictionAir: layout.isMobile ? 0.05 : 0.032,
          chamfer: { radius: chipH / 2.05 },
          slop: layout.isMobile ? 0.02 : 0.05,
          density: layout.isMobile ? 0.0022 : 0.0026,
          sleepThreshold: layout.isMobile ? 35 : 28,
          label: 'chip',
        });

        if (layout.isMobile) {
          Body.setInertia(body, Infinity);
          Body.setAngle(body, 0);
        } else {
          Body.setInertia(body, Infinity);
          const tilt = (Math.random() - 0.5) * 0.28;
          Body.setAngle(body, tilt);
          Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 1.6,
            y: Math.random() * 0.6,
          });
        }

        chipBodies.push({ dom: chip, body, w: chipW, h: chipH });
        Composite.add(world, body);
        syncChipTransform(
          chip,
          startX,
          startY,
          chipW,
          chipH,
          layout.isMobile ? 0 : body.angle
        );
      });

      let draggingPointer = null;
      let dragItem = null;
      let throwVelocity = { x: 0, y: 0 };
      let pointerStart = null;
      let isDragging = false;
      let settleFrames = 0;
      let hasSettled = false;

      function clearWindowDragListeners() {
        window.removeEventListener('pointermove', onWindowPointerMove, true);
        window.removeEventListener('pointerup', onWindowPointerEnd, true);
        window.removeEventListener('pointercancel', onWindowPointerEnd, true);
      }

      function moveDraggedChip(item, clientX, clientY) {
        const rect = container.getBoundingClientRect();
        const liveW = container.clientWidth;
        const liveH = container.clientHeight;
        const minY = item.h / 2 + 2;
        const maxY = liveH - item.h / 2 - 2;
        const x = Math.max(item.w / 2, Math.min(liveW - item.w / 2, clientX - rect.left));
        const y = Math.max(minY, Math.min(maxY, clientY - rect.top));
        const now = performance.now();
        const prev = item._lastMove || { x, y, t: now };
        const dt = Math.max(now - prev.t, 8);
        throwVelocity = {
          x: Math.max(-26, Math.min(26, ((x - prev.x) / dt) * 22)),
          y: Math.max(-26, Math.min(26, ((y - prev.y) / dt) * 22)),
        };
        item._lastMove = { x, y, t: now };
        Body.setPosition(item.body, { x, y });
        Body.setVelocity(item.body, { x: 0, y: 0 });
        syncChipTransform(
          item.dom,
          x,
          y,
          item.w,
          item.h,
          layout.isMobile ? 0 : item.body.angle
        );
      }

      function beginDrag(item, event) {
        isDragging = true;
        dragItem = item;
        draggingPointer = event.pointerId;
        bringToFront(item);
        container.style.touchAction = 'none';
        document.body.style.overflow = 'hidden';
        Sleeping.set(item.body, false);
        Body.setStatic(item.body, false);
        Body.setVelocity(item.body, { x: 0, y: 0 });
        throwVelocity = { x: 0, y: 0 };
        item._lastMove = null;
        try { item.dom.setPointerCapture(event.pointerId); } catch (e) {  }
      }

      const onWindowPointerMove = (event) => {
        if (!pointerStart || draggingPointer !== event.pointerId) return;

        if (!isDragging) {
          const dx = event.clientX - pointerStart.x;
          const dy = event.clientY - pointerStart.y;
          const dist = Math.hypot(dx, dy);
          const threshold = event.pointerType === 'touch' ? MOBILE_DRAG_THRESHOLD : DRAG_THRESHOLD;
          if (dist < threshold) return;

          const item = chipBodies.find((entry) => entry.dom === pointerStart.chip);
          if (!item) return;
          beginDrag(item, event);
        }

        if (!dragItem) return;
        moveDraggedChip(dragItem, event.clientX, event.clientY);
        event.preventDefault();
      };

      const onWindowPointerEnd = (event) => {
        if (pointerStart && pointerStart.pointerId === event.pointerId && !isDragging) {
          pointerStart = null;
          draggingPointer = null;
          clearWindowDragListeners();
          return;
        }

        if (!isDragging || draggingPointer !== event.pointerId || !dragItem) return;

        const item = dragItem;
        Body.setVelocity(item.body, throwVelocity);
        draggingPointer = null;
        dragItem = null;
        pointerStart = null;
        isDragging = false;
        item._lastMove = null;
        releaseChip(item);
        container.style.touchAction = 'pan-y';
        document.body.style.overflow = '';
        clearWindowDragListeners();

        window.setTimeout(() => {
          const speed = Math.hypot(item.body.velocity.x, item.body.velocity.y);
          if (speed < 0.35) {
            Body.setVelocity(item.body, { x: 0, y: 0 });
            Sleeping.set(item.body, true);
          }
        }, 1400);

        try { item.dom.releasePointerCapture(event.pointerId); } catch (e) {  }
        event.preventDefault();
      };

      function tightenMobileArena() {
        if (!layout.isMobile) return;
        let maxBottom = 0;
        chipBodies.forEach((item) => {
          maxBottom = Math.max(maxBottom, item.body.position.y + item.h / 2);
        });
        const newPlayH = Math.ceil(maxBottom + 8);
        const newTotal = newPlayH + headerOverlap;
        if (newTotal < container.clientHeight - 4 && newPlayH > 72) {
          container.style.height = `${newTotal}px`;
          boundsH = newTotal;
        }
      }

      Events.on(engine, 'afterUpdate', () => {
        chipBodies.forEach((item) => {
          const { x, y } = item.body.position;
          const angle = layout.isMobile ? 0 : item.body.angle;
          syncChipTransform(item.dom, x, y, item.w, item.h, angle);
          if (!item.dom.classList.contains('is-dragging')) {
            item.dom.style.zIndex = String(10 + Math.round((y / boundsH) * 60));
          }
        });

        if (!hasSettled && !isDragging) {
          let maxSpeed = 0;
          chipBodies.forEach((item) => {
            maxSpeed = Math.max(maxSpeed, Math.hypot(item.body.velocity.x, item.body.velocity.y));
          });

          if (maxSpeed < 0.2) {
            settleFrames += 1;
            if (settleFrames > 40) {
              hasSettled = true;
              chipBodies.forEach((item) => {
                Body.setVelocity(item.body, { x: 0, y: 0 });
                Sleeping.set(item.body, true);
              });
              tightenMobileArena();
            }
          } else {
            settleFrames = 0;
          }
        }
      });

      const runner = Runner.create();
      Runner.run(runner, engine);

      chipBodies.forEach((item) => {
        const { x, y } = item.body.position;
        syncChipTransform(item.dom, x, y, item.w, item.h, layout.isMobile ? 0 : item.body.angle);
      });

      visibilityTimer = window.setTimeout(() => {
        if (!physics || physics.engine !== engine) return;
        if (!isAnyChipVisible()) fallbackToStatic();
      }, 1800);

      chips.forEach((chip) => {
        const onPointerDown = (event) => {
          if (event.pointerType === 'mouse' && event.button !== 0) return;
          pointerStart = {
            x: event.clientX,
            y: event.clientY,
            pointerId: event.pointerId,
            chip,
          };
          isDragging = false;
          draggingPointer = event.pointerId;
          window.addEventListener('pointermove', onWindowPointerMove, { capture: true, passive: false });
          window.addEventListener('pointerup', onWindowPointerEnd, { capture: true, passive: false });
          window.addEventListener('pointercancel', onWindowPointerEnd, { capture: true, passive: false });
          if (event.pointerType === 'touch') {
            event.preventDefault();
          }
        };

        chip.addEventListener('pointerdown', onPointerDown, { passive: false });

        chipCleanups.push(() => {
          chip.removeEventListener('pointerdown', onPointerDown);
        });
      });

      const endDragCleanup = () => {
        clearWindowDragListeners();
        container.style.touchAction = 'pan-y';
        document.body.style.overflow = '';
        draggingPointer = null;
        dragItem = null;
        pointerStart = null;
        isDragging = false;
      };

      chipCleanups.push(endDragCleanup);

      const state = {
        mode,
        initialW: boundsW,
        boundsH,
        chipCount: chips.length,
      };

      const onResize = () => {
        if (isBuilding) return;
        const nextW = container.clientWidth;
        if (nextW < MIN_WIDTH) return;

        const nextMode = getMode(nextW);
        const nextLayout = getLayout(nextW, state.chipCount);
        if (!nextLayout) return;

        const nextTotal = Math.round(getPlayHeight(nextW, nextLayout, state.chipCount) + getHeaderOverlap(nextW));
        const modeChanged = nextMode !== state.mode;
        const widthChanged = Math.abs(nextW - state.initialW) > 36;
        const heightChanged = Math.abs(nextTotal - state.boundsH) > (nextMode === 'mobile' ? 28 : 52);

        if (modeChanged || widthChanged || heightChanged) {
          scheduleRebuild();
        }
      };

      const onOrientation = () => {
        scheduleRebuild();
      };

      window.addEventListener('resize', onResize);
      window.addEventListener('orientationchange', onOrientation);

      physics = {
        runner,
        engine,
        onResize,
        onOrientation,
        chipCleanups,
        visibilityTimer,
      };

      container.classList.add('is-physics-ready');
      isBuilding = false;
      return true;
    } catch (err) {
      console.error('Integration gravity failed:', err);
      if (visibilityTimer) window.clearTimeout(visibilityTimer);
      isBuilding = false;
      destroyPhysics();
      fallbackToStatic();
      return false;
    }
  }

  function scheduleRebuild() {
    if (isBuilding) return;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (!canBuild()) {
        fallbackToStatic();
        return;
      }
      if (!buildPhysics()) fallbackToStatic();
    }, 220);
  }

  function bootWhenReady() {
    if (physics || isBuilding) return;

    const attempt = () => {
      if (!canBuild()) return false;
      return buildPhysics();
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!attempt()) {
          window.setTimeout(() => {
            if (!physics && !isBuilding) attempt();
          }, 120);
        }
      });
    });
  }

  if (!bootResizeObserver) {
    bootResizeObserver = new ResizeObserver(() => {
      if (!physics && !isBuilding && canBuild()) bootWhenReady();
    });
    bootResizeObserver.observe(container);
  }

  if (!intersectionObserver) {
    intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && !physics && !isBuilding) bootWhenReady();
    }, { threshold: 0.02 });
    intersectionObserver.observe(container);
  }

  bootWhenReady();
  window.addEventListener('load', bootWhenReady, { once: true });

  window.setTimeout(() => {
    if (!physics && !container.classList.contains('is-static')) {
      if (canBuild()) {
        if (!buildPhysics()) fallbackToStatic();
      } else {
        fallbackToStatic();
      }
    } else if (physics && !isAnyChipVisible()) {
      fallbackToStatic();
    }
  }, 3000);
}

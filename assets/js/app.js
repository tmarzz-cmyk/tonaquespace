document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. MOBILE HAMBURGER TOGGLE MENU
  // ==========================================
  const hamb = document.querySelector('.hamb');
  const navlinks = document.querySelector('.navlinks');

  if (hamb && navlinks) {
    hamb.addEventListener('click', () => {
      navlinks.classList.toggle('active');
      hamb.textContent = navlinks.classList.contains('active') ? '✕' : '☰';
    });

    navlinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navlinks.classList.remove('active');
        hamb.textContent = '☰';
      });
    });
  }

  // ==========================================
  // 2. COUNTER ANIMATION FOR METRICS PANELS
  // ==========================================
  const metricsSection = document.getElementById('studio');
  const counters = document.querySelectorAll('.metric b');
  let animated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const targetText = counter.innerText;
      const target = parseFloat(targetText.replace(/,/g, ''));
      const isFourDigit = target > 1000;
      
      let count = 0;
      const speed = isFourDigit ? 30 : 15;
      const increment = target / speed;

      const updateCount = () => {
        count += increment;
        if (count < target) {
          if (isFourDigit) {
            counter.innerText = Math.floor(count).toLocaleString();
          } else {
            counter.innerText = Math.floor(count).toString().padStart(2, '0');
          }
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = targetText;
        }
      };
      updateCount();
    });
  };

  if (metricsSection && counters.length > 0) {
    const observerOptions = { root: null, threshold: 0.3 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animateCounters();
          animated = true;
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(metricsSection);
  }

  // ==========================================
  // 3. SMOOTH NAVIGATION TRANSITIONS W/ NAV OFFSET
  // ==========================================
  document.querySelectorAll('.navlinks a[href^="#"], .actions a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navHeight = document.querySelector('.nav').offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        window.history.pushState(null, null, targetId);
      }
    });
  });

  // ==========================================
  // 4. LUMINESCENT CARD CURSOR TRACKING
  // ==========================================
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        glow.style.opacity = '1';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const glow = card.querySelector('.card-glow');
      if (glow) glow.style.opacity = '0';
    });
  });

  // ==========================================
  // 5. SPACE MODULE DETAILS MODAL
  // ==========================================
  const spaceData = {
    SpaceCart: {
      title: 'SpaceCart',
      kicker: 'Retail Space',
      text: 'Retail, POS, ecommerce, orders, inventory and customer loyalty working from one connected system.',
      features: ['POS & Checkout', 'Stock Control', 'Orders Dashboard', 'Customer Loyalty']
    },
    SpaceCampus: {
      title: 'SpaceCampus',
      kicker: 'Education Space',
      text: 'Admissions, students, parents, staff, timetables, attendance, exams, fees and reports for schools and colleges.',
      features: ['Admissions', 'Student Records', 'Attendance', 'Reports']
    },
    SpaceFinance: {
      title: 'SpaceFinance',
      kicker: 'Finance Space',
      text: 'Accounting, invoicing, expenses, payroll, budgets and financial intelligence for growing organisations.',
      features: ['Invoices', 'Budgets', 'Payroll', 'Dashboards']
    },
    SpaceAI: {
      title: 'SpaceAI',
      kicker: 'Intelligence Space',
      text: 'Automation, insights, recommendations and intelligent assistance across the whole TonaqueSpace ecosystem.',
      features: ['AI Assistant', 'Automation', 'Insights', 'Recommendations']
    },
    SpaceHealth: {
      title: 'SpaceHealth',
      kicker: 'Healthcare Space',
      text: 'Patient records, appointments, medical billing, pharmacy workflows and healthcare analytics.',
      features: ['Patient Records', 'Appointments', 'Billing', 'Pharmacy']
    },
    SpaceFarm: {
      title: 'SpaceFarm',
      kicker: 'Agriculture Space',
      text: 'Crop management, livestock, field operations, inventory, market insights and farm planning tools.',
      features: ['Crop Planning', 'Livestock', 'Field Tasks', 'Market Insights']
    },
    SpaceHR: {
      title: 'SpaceHR',
      kicker: 'People Space',
      text: 'Employee management, payroll, leave, performance tracking and organisation growth tools.',
      features: ['Employees', 'Leave', 'Payroll', 'Performance']
    },
    SpaceLogistics: {
      title: 'SpaceLogistics',
      kicker: 'Logistics Space',
      text: 'Fleet management, tracking, deliveries, routes and supply chain optimisation.',
      features: ['Fleet', 'Tracking', 'Routes', 'Deliveries']
    },
    SpaceInventory: {
      title: 'SpaceInventory',
      kicker: 'Inventory Space',
      text: 'Stock control, warehouses, suppliers, reorder alerts and real-time inventory visibility.',
      features: ['Warehouses', 'Suppliers', 'Reorder Alerts', 'Live Stock']
    }
  };

  const modal = document.getElementById('spaceModal');
  const modalTitle = document.getElementById('spaceModalTitle');
  const modalKicker = document.getElementById('spaceModalKicker');
  const modalText = document.getElementById('spaceModalText');
  const modalFeatures = document.getElementById('spaceModalFeatures');

  const openModal = (spaceName) => {
    activeSpaceName = spaceName || 'TonaqueSpace';
    const data = spaceData[spaceName];
    if (!modal || !data) return;
    modalTitle.textContent = data.title;
    modalKicker.textContent = data.kicker;
    modalText.textContent = data.text;
    modalFeatures.innerHTML = data.features.map(feature => `<span>${feature}</span>`).join('');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setActiveOrbitNode('');
  };

  const orbitStage = document.querySelector('.orbitstage');
  const spaceTriggers = document.querySelectorAll('[data-space]');
  const setActiveOrbitNode = (spaceName) => {
    spaceTriggers.forEach(trigger => {
      trigger.classList.toggle('is-active', trigger.dataset.space === spaceName && trigger.classList.contains('node'));
    });
    if (orbitStage) orbitStage.classList.toggle('has-active-space', !!spaceName);
  };

  spaceTriggers.forEach(button => {
    button.addEventListener('click', () => {
      setActiveOrbitNode(button.dataset.space);
      openModal(button.dataset.space);
    });

    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveOrbitNode(button.dataset.space);
        openModal(button.dataset.space);
      }
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(button => {
    button.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });


  // ==========================================
  // 6. SPACE FILTERS
  // ==========================================
  const filterButtons = document.querySelectorAll('.space-filter');
  const spaceCards = document.querySelectorAll('#spaceCards .card');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      spaceCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  // ==========================================
  // 7. CONTACT ACTIONS / WHATSAPP & EMAIL
  // ==========================================
  const leadForm = document.getElementById('leadForm');
  const leadSpace = document.getElementById('leadSpace');
  const leadMessage = document.getElementById('leadMessage');
  const mailLead = document.getElementById('mailLead');
  const modalStartBtn = document.getElementById('modalStartBtn');
  let activeSpaceName = 'TonaqueSpace';

  const setLeadSpace = (spaceName) => {
    activeSpaceName = spaceName || 'TonaqueSpace';
    if (leadSpace) leadSpace.value = [...leadSpace.options].some(o => o.value === activeSpaceName) ? activeSpaceName : 'TonaqueSpace';
    if (leadMessage && !leadMessage.value.trim()) leadMessage.value = `I am interested in ${activeSpaceName}. Please contact me.`;
  };

  document.querySelectorAll('[data-space]').forEach(button => {
    button.addEventListener('click', () => setLeadSpace(button.dataset.space));
  });

  if (modalStartBtn) {
    modalStartBtn.addEventListener('click', () => {
      setLeadSpace(activeSpaceName);
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 80);
    });
  }

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('leadName')?.value.trim() || 'Website visitor';
      const contact = document.getElementById('leadContact')?.value.trim() || 'Not provided';
      const space = leadSpace?.value || activeSpaceName;
      const message = leadMessage?.value.trim() || `I am interested in ${space}.`;
      const text = `Hello TonaqueSpace, my name is ${name}. Contact: ${contact}. Space: ${space}. Message: ${message}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    });
  }

  if (mailLead) {
    mailLead.addEventListener('click', () => {
      const space = leadSpace?.value || activeSpaceName;
      const body = leadMessage?.value || `I am interested in ${space}. Please contact me.`;
      mailLead.href = `mailto:hello@tonaquespace.co.zw?subject=${encodeURIComponent('TonaqueSpace enquiry: ' + space)}&body=${encodeURIComponent(body)}`;
    });
  }

  // ==========================================
  // 8. COPY MODULE LINK + TOAST
  // ==========================================
  const toast = document.createElement('div');
  toast.className = 'space-toast';
  document.body.appendChild(toast);
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 1800);
  };

  const copySpaceLink = document.getElementById('copySpaceLink');
  if (copySpaceLink) {
    copySpaceLink.addEventListener('click', async () => {
      const url = `${window.location.origin}${window.location.pathname}#${activeSpaceName.toLowerCase()}`;
      try {
        await navigator.clipboard.writeText(url);
        showToast(`${activeSpaceName} link copied`);
      } catch (_) {
        showToast(activeSpaceName);
      }
    });
  }

  // ==========================================
  // 9. BACK TO TOP + PWA INSTALL PROMPT
  // ==========================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 700);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  let deferredInstallPrompt = null;
  const installBtn = document.getElementById('installApp');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    installBtn?.classList.add('visible');
  });
  installBtn?.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installBtn.classList.remove('visible');
  });

});

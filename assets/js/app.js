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
      features: ['POS & Checkout', 'Stock Control', 'Orders Dashboard', 'Customer Loyalty'], status: 'Prototype ready', phase: 'Commerce foundation', route: '#spacecart', audience: 'Retailers and online sellers', deliverable: 'Clickable commerce prototype', nextAction: 'Build product catalogue', roadmap: ['Product catalogue', 'Cart and checkout', 'Orders admin', 'WhatsApp handoff']
    },
    SpaceCampus: {
      title: 'SpaceCampus',
      kicker: 'Education Space',
      text: 'Admissions, students, parents, staff, timetables, attendance, exams, fees and reports for schools and colleges.',
      features: ['Admissions', 'Student Records', 'Attendance', 'Reports'], status: 'Priority build', phase: 'Education foundation', route: '#spacecampus', audience: 'Schools, colleges and training centres', deliverable: 'Admissions and student shell', nextAction: 'Build learner records', roadmap: ['Admissions flow', 'Student records', 'Parent portal', 'Reports dashboard']
    },
    SpaceFinance: {
      title: 'SpaceFinance',
      kicker: 'Finance Space',
      text: 'Accounting, invoicing, expenses, payroll, budgets and financial intelligence for growing organisations.',
      features: ['Invoices', 'Budgets', 'Payroll', 'Dashboards'], status: 'Planned', phase: 'Finance layer', route: '#spacefinance', audience: 'SMEs and institutions', deliverable: 'Finance dashboard shell', nextAction: 'Build invoice flow', roadmap: ['Invoices', 'Expense tracking', 'Payroll shell', 'Financial insights']
    },
    SpaceAI: {
      title: 'SpaceAI',
      kicker: 'Intelligence Space',
      text: 'Automation, insights, recommendations and intelligent assistance across the whole TonaqueSpace ecosystem.',
      features: ['AI Assistant', 'Automation', 'Insights', 'Recommendations'], status: 'Concept active', phase: 'Intelligence layer', route: '#spaceai', audience: 'Teams needing automation', deliverable: 'Assistant command layer', nextAction: 'Build AI prompts', roadmap: ['AI assistant', 'Automation rules', 'Insights engine', 'Recommendations']
    },
    SpaceHealth: {
      title: 'SpaceHealth',
      kicker: 'Healthcare Space',
      text: 'Patient records, appointments, medical billing, pharmacy workflows and healthcare analytics.',
      features: ['Patient Records', 'Appointments', 'Billing', 'Pharmacy'], status: 'Planned', phase: 'Healthcare layer', route: '#spacehealth', audience: 'Clinics and healthcare teams', deliverable: 'Appointment workflow shell', nextAction: 'Build patient records', roadmap: ['Appointments', 'Patient profiles', 'Billing shell', 'Pharmacy workflows']
    },
    SpaceFarm: {
      title: 'SpaceFarm',
      kicker: 'Agriculture Space',
      text: 'Crop management, livestock, field operations, inventory, market insights and farm planning tools.',
      features: ['Crop Planning', 'Livestock', 'Field Tasks', 'Market Insights'], status: 'Prototype planned', phase: 'Agriculture layer', route: '#spacefarm', audience: 'Farmers and agri teams', deliverable: 'Crop calendar shell', nextAction: 'Build farm planner', roadmap: ['Crop calendar', 'Input tracker', 'Field tasks', 'Market prices']
    },
    SpaceHR: {
      title: 'SpaceHR',
      kicker: 'People Space',
      text: 'Employee management, payroll, leave, performance tracking and organisation growth tools.',
      features: ['Employees', 'Leave', 'Payroll', 'Performance'], status: 'Planned', phase: 'People layer', route: '#spacehr', audience: 'Growing teams', deliverable: 'People operations shell', nextAction: 'Build employee profiles', roadmap: ['Employee profiles', 'Leave requests', 'Payroll link', 'Performance notes']
    },
    SpaceLogistics: {
      title: 'SpaceLogistics',
      kicker: 'Logistics Space',
      text: 'Fleet management, tracking, deliveries, routes and supply chain optimisation.',
      features: ['Fleet', 'Tracking', 'Routes', 'Deliveries'], status: 'Planned', phase: 'Logistics layer', route: '#spacelogistics', audience: 'Fleet and delivery teams', deliverable: 'Logistics dashboard shell', nextAction: 'Build route planner', roadmap: ['Fleet records', 'Delivery tasks', 'Route planning', 'Tracking summary']
    },
    SpaceInventory: {
      title: 'SpaceInventory',
      kicker: 'Inventory Space',
      text: 'Stock control, warehouses, suppliers, reorder alerts and real-time inventory visibility.',
      features: ['Warehouses', 'Suppliers', 'Reorder Alerts', 'Live Stock'], status: 'Planned', phase: 'Inventory layer', route: '#spaceinventory', audience: 'Warehouses and stock teams', deliverable: 'Inventory visibility shell', nextAction: 'Build stock register', roadmap: ['Stock list', 'Supplier profiles', 'Reorder alerts', 'Warehouse view']
    }
  };

  const modal = document.getElementById('spaceModal');
  const modalTitle = document.getElementById('spaceModalTitle');
  const modalKicker = document.getElementById('spaceModalKicker');
  const modalText = document.getElementById('spaceModalText');
  const modalFeatures = document.getElementById('spaceModalFeatures');
  const modalStatus = document.getElementById('spaceModalStatus');
  const modalPhase = document.getElementById('spaceModalPhase');
  const modalRoute = document.getElementById('spaceModalRoute');
  const modalRoadmap = document.getElementById('spaceModalRoadmap');
  const modalStage = document.getElementById('spaceModalStage');

  const openModal = (spaceName) => {
    activeSpaceName = spaceName || 'TonaqueSpace';
    const data = spaceData[spaceName];
    if (!modal || !data) return;
    modalTitle.textContent = data.title;
    modalKicker.textContent = data.kicker;
    modalText.textContent = data.text;
    const missionActiveSpace = document.getElementById('missionActiveSpace');
    const missionActiveText = document.getElementById('missionActiveText');
    if (missionActiveSpace) missionActiveSpace.textContent = data.title + ' docked';
    if (missionActiveText) missionActiveText.textContent = data.text;
    modalFeatures.innerHTML = data.features.map(feature => `<span>${feature}</span>`).join('');
    if (modalStatus) modalStatus.textContent = data.status || 'Ready';
    if (modalPhase) modalPhase.textContent = data.phase || 'Foundation';
    if (modalRoute) modalRoute.textContent = data.route || '#';
    if (modalStage) modalStage.innerHTML = `<div><span>Audience</span><strong>${data.audience || 'Modern organisations'}</strong></div><div><span>V9 Deliverable</span><strong>${data.deliverable || 'Interactive preview'}</strong></div><div><span>Next Action</span><strong>${data.nextAction || 'Request demo'}</strong></div>`;
    if (modalRoadmap) modalRoadmap.innerHTML = (data.roadmap || []).map((step, index) => `<div><b>0${index + 1}</b><span>${step}</span></div>`).join('');
    const leadSpace = document.getElementById('leadSpace');
    if (leadSpace) leadSpace.value = data.title;
    if (data.route) window.history.replaceState(null, '', data.route);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const hashToSpace = (hash) => {
    const clean = (hash || '').replace('#', '').toLowerCase();
    return Object.keys(spaceData).find(key => key.toLowerCase() === clean);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.location.hash && spaceData[hashToSpace(window.location.hash)]) window.history.replaceState(null, '', window.location.pathname);
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

  const initialSpace = hashToSpace(window.location.hash);
  if (initialSpace) {
    setTimeout(() => {
      setActiveOrbitNode(initialSpace);
      openModal(initialSpace);
    }, 450);
  }

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
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
  const whatsappNumber = '263776706614';
  const primaryEmail = 'info@tonaquespace.co.zw';
  const adminEmail = 'admin@tonaquespace.co.zw';
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
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    });
  }

  if (mailLead) {
    mailLead.addEventListener('click', () => {
      const space = leadSpace?.value || activeSpaceName;
      const body = leadMessage?.value || `I am interested in ${space}. Please contact me.`;
      mailLead.href = `mailto:${primaryEmail}?cc=${encodeURIComponent(adminEmail)}&subject=${encodeURIComponent('TonaqueSpace enquiry: ' + space)}&body=${encodeURIComponent(body)}`;
    });
  }



  if (modalWhatsappBtn) {
    modalWhatsappBtn.addEventListener('click', () => {
      const space = activeSpaceName || 'TonaqueSpace';
      const text = `Hello TonaqueSpace, I would like a demo for ${space}.`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
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

  // ==========================================
  // 10. V9 MISSION CONTROL COUNTERS + LOG
  // ==========================================
  const missionCounters = document.querySelectorAll('.mission-counter');
  const missionConsole = document.querySelector('.mission-console');
  const missionLog = document.getElementById('missionLog');
  const missionClock = document.getElementById('missionClock');
  let missionAnimated = false;

  const animateMissionCounters = () => {
    if (missionAnimated) return;
    missionAnimated = true;
    missionCounters.forEach(counter => {
      const target = parseInt(counter.dataset.target || '0', 10);
      let value = 0;
      const steps = 34;
      const inc = Math.max(1, Math.ceil(target / steps));
      const tick = () => {
        value += inc;
        if (value >= target) {
          counter.textContent = target === 99 ? '99%' : target;
          return;
        }
        counter.textContent = target === 99 ? value + '%' : value;
        requestAnimationFrame(tick);
      };
      tick();
    });
  };

  if (missionConsole && missionCounters.length) {
    const missionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) animateMissionCounters(); });
    }, { threshold: 0.35 });
    missionObserver.observe(missionConsole);
  }

  const missionLines = [
    'Orbit nodes responsive. Awaiting Space selection...',
    'Contact routes armed: WhatsApp, info email and admin email.',
    'SpaceStudio command layer online.',
    'TonaqueSpace ecosystem ready for staged product rollout.'
  ];
  let missionLineIndex = 0;
  const updateMissionLine = () => {
    if (missionLog) missionLog.innerHTML = `<span>${missionLines[missionLineIndex % missionLines.length]}</span>`;
    missionLineIndex += 1;
  };
  updateMissionLine();
  setInterval(updateMissionLine, 4200);

  const updateClock = () => {
    if (!missionClock) return;
    const now = new Date();
    missionClock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  updateClock();
  setInterval(updateClock, 30000);

});


// V7 search helper: filters cards and previews by typed terms.
document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('spaceSearch');
  const clear = document.getElementById('clearSpaceSearch');
  const targets = [...document.querySelectorAll('.card, .space-preview-card')];
  const applySearch = () => {
    const term = (search?.value || '').trim().toLowerCase();
    targets.forEach(el => {
      const text = el.textContent.toLowerCase();
      el.classList.toggle('hidden-by-search', !!term && !text.includes(term));
    });
  };
  if (search) search.addEventListener('input', applySearch);
  if (clear) clear.addEventListener('click', () => { search.value = ''; applySearch(); search.focus(); });
});

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- Mobile Navigation ---
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileClose = document.querySelector('.mobile-nav-close');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  const openMobileMenu = () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden'; // Disable background scrolling
  };

  const closeMobileMenu = () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  // --- Typewriter Effect ---
  const typewriterText = document.getElementById('typewriter');
  const words = [
    "Full-Stack Web Apps",
    "AI & ML Architectures",
    "Intelligent Systems",
    "Optimized SQL/NoSQL DBs"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const type = () => {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typewriterText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // faster deleting
    } else {
      typewriterText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // standard typing
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // pause before typing next word
    }

    setTimeout(type, typingSpeed);
  };

  if (typewriterText) {
    type();
  }


  // --- Neural Network Dynamic Canvas Background ---
  const canvas = document.getElementById('neural-bg');
  const ctx = canvas?.getContext('2d');
  let animationFrameId;

  let dots = [];
  const dotCount = 65;
  const maxDistance = 120;
  const mouse = { x: null, y: null, radius: 150 };

  const resizeCanvas = () => {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    }
  };

  class Dot {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      this.x += this.vx;
      this.y += this.vy;

      // Mouse interactive push/pull effect
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= dx / dist * force * 0.5;
          this.y -= dy / dist * force * 0.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.fill();
    }
  }

  const initDots = () => {
    dots = [];
    if (!canvas) return;
    for (let i = 0; i < dotCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      dots.push(new Dot(x, y));
    }
  };

  const drawConnections = () => {
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          const alpha = (1 - dist / maxDistance) * 0.15;
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  };

  const animateBackground = () => {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(dot => {
      dot.update();
      dot.draw();
    });

    drawConnections();
    animationFrameId = requestAnimationFrame(animateBackground);
  };

  if (canvas) {
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();
    animateBackground();
  }


  // --- Project Filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active classes on buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px) scale(0.95)';
          // Wait for transition before display none
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // --- AI Playground Neural Network simulator ---
  const lrSlider = document.getElementById('lr-slider');
  const lrVal = document.getElementById('lr-val');
  const epochsInput = document.getElementById('epochs-input');
  const epochsVal = document.getElementById('epochs-val');
  const noiseSlider = document.getElementById('noise-slider');
  const noiseVal = document.getElementById('noise-val');
  const trainBtn = document.getElementById('train-btn');

  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const epochNum = document.getElementById('epoch-num');
  const lossNum = document.getElementById('loss-num');
  const accNum = document.getElementById('acc-num');
  
  const lossCanvas = document.getElementById('loss-canvas');
  const lossCtx = lossCanvas?.getContext('2d');

  let losses = [];
  let accuracies = [];
  let isTraining = false;

  // Handle slider displays
  if (lrSlider) {
    lrSlider.addEventListener('input', (e) => {
      if (lrVal) lrVal.textContent = e.target.value;
    });
  }
  if (epochsInput) {
    epochsInput.addEventListener('input', (e) => {
      if (epochsVal) epochsVal.textContent = e.target.value;
    });
  }
  if (noiseSlider) {
    noiseSlider.addEventListener('input', (e) => {
      if (noiseVal) noiseVal.textContent = e.target.value;
    });
  }

  // Draw plot grid lines and existing loss/acc logs
  const drawPlot = () => {
    if (!lossCanvas || !lossCtx) return;
    const w = lossCanvas.width = lossCanvas.parentElement.clientWidth;
    const h = lossCanvas.height = lossCanvas.parentElement.clientHeight;

    lossCtx.clearRect(0, 0, w, h);

    // Coordinate grid helper lines
    lossCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    lossCtx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      const y = h * (i / 5);
      lossCtx.beginPath();
      lossCtx.moveTo(0, y);
      lossCtx.lineTo(w, y);
      lossCtx.stroke();
    }

    if (losses.length === 0) return;

    // Draw simulated loss line (Violet)
    lossCtx.beginPath();
    lossCtx.strokeStyle = '#8b5cf6';
    lossCtx.lineWidth = 2.5;
    const maxVal = Math.max(...losses, 1.0);
    
    losses.forEach((l, idx) => {
      const x = (idx / (losses.length - 1 || 1)) * w;
      const y = h - (l / maxVal) * (h - 20) - 10;
      if (idx === 0) lossCtx.moveTo(x, y);
      else lossCtx.lineTo(x, y);
    });
    lossCtx.stroke();

    // Draw simulated accuracy line (Cyan)
    lossCtx.beginPath();
    lossCtx.strokeStyle = '#06b6d4';
    lossCtx.lineWidth = 2.5;
    
    accuracies.forEach((a, idx) => {
      const x = (idx / (accuracies.length - 1 || 1)) * w;
      const y = h - (a / 100) * (h - 20) - 10;
      if (idx === 0) lossCtx.moveTo(x, y);
      else lossCtx.lineTo(x, y);
    });
    lossCtx.stroke();
  };

  // Initialize empty plot visual
  if (lossCanvas) {
    drawPlot();
    window.addEventListener('resize', drawPlot);
  }

  const runTrainingSimulation = () => {
    if (isTraining) return;
    isTraining = true;
    losses = [];
    accuracies = [];

    const lr = parseFloat(lrSlider.value);
    const totalEpochs = parseInt(epochsInput.value);
    const noise = parseFloat(noiseSlider.value);

    // Update UI states
    trainBtn.disabled = true;
    trainBtn.innerHTML = '<i class="btn-icon spinner"></i> Training...';
    statusDot.className = 'status-indicator training';
    statusText.textContent = 'Status: Training';

    let currentEpoch = 0;
    
    // Mathematical simulation generator representing standard descending cost function with variance noise
    const trainStep = () => {
      if (currentEpoch >= totalEpochs) {
        // Complete
        isTraining = false;
        trainBtn.disabled = false;
        trainBtn.innerHTML = '<i data-lucide="play" class="btn-icon"></i> Train Model';
        if (typeof lucide !== 'undefined') lucide.createIcons();
        statusDot.className = 'status-indicator complete';
        statusText.textContent = 'Status: Complete';
        return;
      }

      currentEpoch++;

      // Math formulas approximating standard curve trajectories
      // Loss: drops quickly then levels out
      const decay = 1 / (1 + currentEpoch * lr * 3);
      const simulatedNoise = (Math.random() - 0.5) * noise * decay;
      const currentLoss = Math.max(0.01, 0.7 * decay + simulatedNoise);

      // Accuracy: rises inverse to loss
      const baseAcc = 98 - (98 - 30) * decay;
      const accNoise = (Math.random() - 0.5) * noise * 20 * decay;
      const currentAcc = Math.min(100, Math.max(10, baseAcc + accNoise));

      losses.push(currentLoss);
      accuracies.push(currentAcc);

      // Update stat text
      epochNum.textContent = currentEpoch;
      lossNum.textContent = currentLoss.toFixed(4);
      accNum.textContent = currentAcc.toFixed(1) + '%';

      drawPlot();

      // Control simulation pace: 35ms per step
      setTimeout(trainStep, 35);
    };

    trainStep();
  };

  if (trainBtn) {
    trainBtn.addEventListener('click', runTrainingSimulation);
  }


  // --- Contact Form Handling & Validation ---
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success-msg');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      // Clear previous styles
      [nameInput, emailInput, messageInput].forEach(inp => {
        inp.style.borderColor = '';
      });
      [nameError, emailError, messageError].forEach(err => {
        err.style.display = 'none';
      });

      // Name validate
      if (!nameInput.value.trim()) {
        nameInput.style.borderColor = '#ef4444';
        nameError.style.display = 'block';
        hasError = true;
      }

      // Email validate
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        emailInput.style.borderColor = '#ef4444';
        emailError.style.display = 'block';
        hasError = true;
      }

      // Message validate
      if (!messageInput.value.trim()) {
        messageInput.style.borderColor = '#ef4444';
        messageError.style.display = 'block';
        hasError = true;
      }

      if (!hasError) {
        // Send state simulation
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';

        setTimeout(() => {
          // Success
          submitBtn.style.display = 'none';
          successMsg.style.display = 'flex';
          form.reset();
        }, 1200);
      }
    });
  }
});

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
    document.body.style.overflow = 'hidden';
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


  // --- Latency Diagnostic Telemetry Wiggle ---
  const pingVal = document.getElementById('ping-val');
  if (pingVal) {
    setInterval(() => {
      const randomPing = Math.floor(Math.random() * 8) + 6; // 6ms to 13ms
      pingVal.textContent = `${randomPing}ms`;
    }, 4000);
  }


  // --- Neural Network Dynamic Background Canvas ---
  const bgCanvas = document.getElementById('neural-bg');
  const bgCtx = bgCanvas?.getContext('2d');
  let animationId;

  let dots = [];
  const dotCount = 50;
  const maxDistance = 140;
  const mouse = { x: null, y: null, radius: 140 };

  const resizeBgCanvas = () => {
    if (bgCanvas) {
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
      initDots();
    }
  };

  class Dot {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      if (this.x < 0 || this.x > bgCanvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > bgCanvas.height) this.vy *= -1;

      this.x += this.vx;
      this.y += this.vy;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 0.4;
          this.y -= (dy / dist) * force * 0.4;
        }
      }
    }

    draw() {
      bgCtx.beginPath();
      bgCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      bgCtx.fillStyle = 'rgba(6, 182, 212, 0.25)';
      bgCtx.fill();
    }
  }

  const initDots = () => {
    dots = [];
    if (!bgCanvas) return;
    for (let i = 0; i < dotCount; i++) {
      dots.push(new Dot(Math.random() * bgCanvas.width, Math.random() * bgCanvas.height));
    }
  };

  const drawConnections = () => {
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          bgCtx.beginPath();
          bgCtx.moveTo(dots[i].x, dots[i].y);
          bgCtx.lineTo(dots[j].x, dots[j].y);
          const alpha = (1 - dist / maxDistance) * 0.12;
          bgCtx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          bgCtx.lineWidth = 0.8;
          bgCtx.stroke();
        }
      }
    }
  };

  const animateBg = () => {
    if (!bgCanvas || !bgCtx) return;
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    dots.forEach(dot => {
      dot.update();
      dot.draw();
    });
    drawConnections();
    animationId = requestAnimationFrame(animateBg);
  };

  if (bgCanvas) {
    window.addEventListener('resize', resizeBgCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
    resizeBgCanvas();
    animateBg();
  }


  // --- Interactive Terminal Console CLI ---
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  const resumeCommands = {
    help: 'Available commands:\n  <span class="text-cyan">about</span>        - Summary of Tanisha\'s profile\n  <span class="text-cyan">education</span>    - Noida Institute of Engineering & Technology details\n  <span class="text-cyan">skills</span>       - List of OOP, Web, DB, and AIML skills\n  <span class="text-cyan">projects</span>     - SoulH and PCOS ANN prediction projects\n  <span class="text-cyan">achievements</span> - HackerRank and LeetCode diagnostics\n  <span class="text-cyan">contact</span>      - Email, phone, and git nodes\n  <span class="text-cyan">matrix</span>       - Trigger matrix stream simulation\n  <span class="text-cyan">clear</span>        - Wipe history log',
    
    about: 'IDENTIFIER: <span class="text-cyan">Tanisha</span>\nROLE: <span class="text-violet">AIML Specialist & Full-Stack Developer</span>\nDESCRIPTION: Currently pursuing B.Tech in Artificial Intelligence & Machine Learning at NIET (2023-2027). Specializes in bridging intelligent models with web platforms.',
    
    education: 'ACADEMIC CREDENTIALS:\n  1. <span class="text-cyan">Noida Institute of Engineering and Technology (NIET)</span>\n     - B.Tech in Artificial Intelligence & Machine Learning\n     - CGPA: <span class="text-green">8.5</span> // Period: 2023 – 2027\n  2. <span class="text-violet">Gurukul Vidyapeeth</span>\n     - Class XII (CBSE) // Percentage: <span class="text-green">86%</span> // Year: 2023\n  3. <span class="text-magenta">St. Paul’s High School</span>\n     - Class X (CBSE) // Percentage: <span class="text-green">92%</span> // Year: 2021',
    
    skills: 'TECHNICAL METRICS:\n  - Languages:     Java, JavaScript\n  - Web Dev:       HTML, CSS, Node.js, Express.js, Tailwind CSS\n  - Databases:     MySQL, MongoDB\n  - AI / ML:       TensorFlow, Scikit-learn, Neural Networks, NLP, Deep Learning, Pandas, NumPy\n  - Developer AI:  Git, GitHub, Postman, Jupyter Notebook, Google Colab, Cursor, Claude',
    
    projects: 'COMMITTED REPOSITORIES:\n  1. <span class="text-cyan">SoulH – Chronic Illness Peer Support Platform</span>\n     - Tech Stack: MongoDB, Express, React, Node, Tailwind, Socket.IO, JWT\n     - Details: Full-stack platform with peer discussions, doctor onboarding, and real-time chat.\n  2. <span class="text-violet">PCOS Prediction Model</span>\n     - Tech Stack: Scikit-learn, Gradio, Pandas, NumPy, ANN classifier\n     - Details: Artificial Neural Network PCOS predictor model (80% accuracy) with early stopping.',
    
    achievements: 'ACCOMPLISHMENTS telemetry:\n  - LeetCode:   Solved <span class="text-green">100+ problems</span> on arrays, sorting, and recursion.\n  - HackerRank: <span class="text-green">4-Star Coder</span> rank badge in algorithm challenges.\n  - Projects:   Built multiple interactive AI and full-stack deployments.',
    
    contact: 'COMMUNICATION NODES:\n  - Email:    <a href="mailto:tanisha10433@gmail.com" class="text-cyan">tanisha10433@gmail.com</a>\n  - Phone:    <a href="tel:+917678555143" class="text-cyan">+91-7678555143</a>\n  - LinkedIn: <a href="https://linkedin.com/in/tanisha-64059b320" target="_blank" class="text-violet">linkedin.com/in/tanisha-64059b320</a>\n  - GitHub:   <a href="https://github.com/Tanisha10433" target="_blank" class="text-magenta">github.com/Tanisha10433</a>'
  };

  const handleCommand = (rawInput) => {
    const cmd = rawInput.trim().toLowerCase();
    
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-line';
    inputLine.innerHTML = `<span class="terminal-prompt">guest@tanisha.sys:~$</span> <span class="text-primary">${rawInput}</span>`;
    
    const outputContainer = terminalBody.querySelector('.terminal-output');
    outputContainer.appendChild(inputLine);

    if (cmd === 'clear') {
      outputContainer.innerHTML = '';
      terminalInput.value = '';
      return;
    }

    const responseLine = document.createElement('div');
    responseLine.className = 'terminal-line';

    if (cmd === 'matrix') {
      triggerMatrixEffect(responseLine);
    } else if (resumeCommands[cmd]) {
      responseLine.innerHTML = resumeCommands[cmd];
    } else if (cmd !== '') {
      responseLine.innerHTML = `<span class="text-magenta">Command not found: "${rawInput}".</span> Type <span class="text-cyan">"help"</span> to view diagnostic commands.`;
    }

    if (cmd !== '') {
      outputContainer.appendChild(responseLine);
    }

    terminalInput.value = '';
    
    setTimeout(() => {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 20);
  };

  const triggerMatrixEffect = (element) => {
    element.innerHTML = '';
    let iterations = 0;
    const interval = setInterval(() => {
      let matrixString = '';
      for (let i = 0; i < 40; i++) {
        matrixString += Math.random() > 0.5 ? '1' : '0';
      }
      element.innerHTML = `<span class="text-green">${matrixString}</span>`;
      terminalBody.scrollTop = terminalBody.scrollHeight;
      iterations++;
      if (iterations > 20) {
        clearInterval(interval);
        element.innerHTML = '<span class="text-green">System matrix compilation complete. Diagnostic status: STABLE.</span>';
      }
    }, 60);
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleCommand(terminalInput.value);
      }
    });

    const terminalCard = document.querySelector('.terminal-card');
    terminalCard?.addEventListener('click', () => {
      terminalInput.focus();
    });
  }


  // --- Scroll Reveal & Skill Dials Animation ---
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Trigger Circular skill meter fill-ups
        const circles = entry.target.querySelectorAll('.circle-fill');
        circles.forEach(circle => {
          const pct = parseInt(circle.getAttribute('data-pct'));
          const r = parseInt(circle.getAttribute('r'));
          const circumference = 2 * Math.PI * r;
          const offset = circumference - (circumference * pct) / 100;
          circle.style.strokeDashoffset = offset;
        });

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // reveal slightly before entry
  });

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });


  // --- Project Filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
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
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // --- 2D PCOS ANN Classification Playground ---
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

  let isTraining = false;
  let dataPoints = [];
  
  // Model parameters (Decision hyperplane boundary line: w1*x + w2*y + b = 0)
  let modelParams = { w1: 0.4, w2: -0.85, b: 0.25 };

  const initDataset = (noise) => {
    dataPoints = [];
    const count = 40;
    
    // Class A: Normal Patients (Cyan dots, top left)
    for (let i = 0; i < count / 2; i++) {
      const rx = 0.15 + Math.random() * 0.3 + (Math.random() - 0.5) * noise;
      const ry = 0.15 + Math.random() * 0.3 + (Math.random() - 0.5) * noise;
      dataPoints.push({ x: rx, y: ry, label: 0 });
    }
    
    // Class B: PCOS Diagnosed (Violet dots, bottom right)
    for (let i = 0; i < count / 2; i++) {
      const rx = 0.55 + Math.random() * 0.3 + (Math.random() - 0.5) * noise;
      const ry = 0.55 + Math.random() * 0.3 + (Math.random() - 0.5) * noise;
      dataPoints.push({ x: rx, y: ry, label: 1 });
    }
  };

  if (lrSlider) lrSlider.addEventListener('input', (e) => { lrVal.textContent = e.target.value; });
  if (epochsInput) epochsInput.addEventListener('input', (e) => { epochsVal.textContent = e.target.value; });
  if (noiseSlider) {
    noiseSlider.addEventListener('input', (e) => { 
      noiseVal.textContent = e.target.value;
      if (!isTraining) {
        initDataset(parseFloat(e.target.value));
        draw2DClassificationSpace();
      }
    });
  }

  const draw2DClassificationSpace = () => {
    if (!lossCanvas || !lossCtx) return;
    const w = lossCanvas.width = lossCanvas.parentElement.clientWidth;
    const h = lossCanvas.height = lossCanvas.parentElement.clientHeight;

    lossCtx.clearRect(0, 0, w, h);

    // 1. Shading classifications regions
    for (let py = 0; py < h; py += 4) {
      for (let px = 0; px < w; px += 4) {
        const nx = px / w;
        const ny = py / h;
        const value = modelParams.w1 * nx + modelParams.w2 * ny + modelParams.b;
        
        if (value > 0) {
          lossCtx.fillStyle = 'rgba(6, 182, 212, 0.04)';
        } else {
          lossCtx.fillStyle = 'rgba(139, 92, 246, 0.04)';
        }
        lossCtx.fillRect(px, py, 4, 4);
      }
    }

    // 2. Draw Grid coordinates
    lossCtx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
    lossCtx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      const cx = w * (i / 5);
      const cy = h * (i / 5);
      
      lossCtx.beginPath();
      lossCtx.moveTo(cx, 0);
      lossCtx.lineTo(cx, h);
      lossCtx.stroke();
      
      lossCtx.beginPath();
      lossCtx.moveTo(0, cy);
      lossCtx.lineTo(w, cy);
      lossCtx.stroke();
    }

    // 3. Draw boundary hyperplane: y = -(w1*x + b)/w2
    lossCtx.beginPath();
    lossCtx.strokeStyle = 'rgba(217, 70, 239, 0.75)'; // Neon Magenta boundary
    lossCtx.lineWidth = 2.5;
    for (let px = 0; px <= w; px++) {
      const nx = px / w;
      const ny = -(modelParams.w1 * nx + modelParams.b) / modelParams.w2;
      const py = ny * h;
      if (px === 0) lossCtx.moveTo(px, py);
      else lossCtx.lineTo(px, py);
    }
    lossCtx.stroke();

    // 4. Draw dataset coordinates
    dataPoints.forEach(p => {
      const px = p.x * w;
      const py = p.y * h;
      
      lossCtx.beginPath();
      lossCtx.arc(px, py, 5, 0, Math.PI * 2);
      
      if (p.label === 0) {
        lossCtx.fillStyle = '#06b6d4';
        lossCtx.shadowColor = 'rgba(6, 182, 212, 0.6)';
      } else {
        lossCtx.fillStyle = '#8b5cf6';
        lossCtx.shadowColor = 'rgba(139, 92, 246, 0.6)';
      }
      
      lossCtx.shadowBlur = 4;
      lossCtx.fill();
      lossCtx.shadowBlur = 0;
      
      lossCtx.strokeStyle = '#040508';
      lossCtx.lineWidth = 1;
      lossCtx.stroke();
    });
  };

  if (lossCanvas) {
    initDataset(0.1);
    modelParams = { w1: 0.35, w2: -0.9, b: 0.3 };
    draw2DClassificationSpace();
    window.addEventListener('resize', draw2DClassificationSpace);
  }

  const runClassifierSimulation = () => {
    if (isTraining) return;
    isTraining = true;

    const lr = parseFloat(lrSlider.value);
    const totalEpochs = parseInt(epochsInput.value);

    // Target weights
    const targetW1 = 1.35;
    const targetW2 = -1.2;
    const targetB = -0.06;

    modelParams = { w1: 0.35, w2: -0.9, b: 0.3 };

    trainBtn.disabled = true;
    trainBtn.innerHTML = '<i class="btn-icon spinner"></i> Fitting Weights...';
    statusDot.className = 'status-indicator training';
    statusText.textContent = 'Status: Optimizing';

    let currentEpoch = 0;

    const trainEpoch = () => {
      if (currentEpoch >= totalEpochs) {
        isTraining = false;
        trainBtn.disabled = false;
        trainBtn.innerHTML = '<i data-lucide="play" class="btn-icon"></i> Start PCOS Model Fit';
        if (typeof lucide !== 'undefined') lucide.createIcons();
        statusDot.className = 'status-indicator complete';
        statusText.textContent = 'Status: Complete';
        return;
      }

      currentEpoch++;

      // Gradient updates wiggles
      const stepSpeed = lr * 2.5;
      modelParams.w1 += (targetW1 - modelParams.w1) * stepSpeed;
      modelParams.w2 += (targetW2 - modelParams.w2) * stepSpeed;
      modelParams.b += (targetB - modelParams.b) * stepSpeed;

      const diff = Math.abs(modelParams.w1 - targetW1) + Math.abs(modelParams.w2 - targetW2);
      const simulatedLoss = Math.max(0.005, diff * 0.42 + (Math.random() - 0.5) * 0.015);
      const simulatedAcc = Math.min(100, Math.max(40, 100 - diff * 42 + (Math.random() - 0.5) * 2.5));

      epochNum.textContent = currentEpoch;
      lossNum.textContent = simulatedLoss.toFixed(4);
      accNum.textContent = simulatedAcc.toFixed(1) + '%';

      draw2DClassificationSpace();

      setTimeout(trainEpoch, 35);
    };

    trainEpoch();
  };

  if (trainBtn) {
    trainBtn.addEventListener('click', runClassifierSimulation);
  }


  // --- Form validations ---
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

      [nameInput, emailInput, messageInput].forEach(inp => { inp.style.borderColor = ''; });
      [nameError, emailError, messageError].forEach(err => { err.style.display = 'none'; });

      if (!nameInput.value.trim()) {
        nameInput.style.borderColor = '#d946ef';
        nameError.style.display = 'block';
        hasError = true;
      }

      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        emailInput.style.borderColor = '#d946ef';
        emailError.style.display = 'block';
        hasError = true;
      }

      if (!messageInput.value.trim()) {
        messageInput.style.borderColor = '#d946ef';
        messageError.style.display = 'block';
        hasError = true;
      }

      if (!hasError) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Transmitting...';

        setTimeout(() => {
          submitBtn.style.display = 'none';
          successMsg.style.display = 'flex';
          form.reset();
        }, 1200);
      }
    });
  }
});

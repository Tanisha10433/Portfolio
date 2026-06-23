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
  if (mobileClose) mobileClose.addEventListener('click', mobileClose);
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  // --- Latency Diagnostic Telemetry Wiggle ---
  const pingVal = document.getElementById('ping-val');
  if (pingVal) {
    setInterval(() => {
      const randomPing = Math.floor(Math.random() * 8) + 8; // 8ms to 15ms
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

  const commands = {
    help: 'Available commands:\n  <span class="text-cyan">about</span>    - Diagnostics bio of Tanisha\n  <span class="text-cyan">skills</span>   - List specialized programming/AIML capabilities\n  <span class="text-cyan">projects</span> - View developed software modules\n  <span class="text-cyan">contact</span>  - Print direct connection links\n  <span class="text-cyan">matrix</span>   - Trigger visual code cascade\n  <span class="text-cyan">secret</span>   - Fetch neural network hidden weights\n  <span class="text-cyan">clear</span>    - Wipe screen history logs',
    
    about: 'IDENTIFIER: <span class="text-cyan">Tanisha</span>\nBRANCH: <span class="text-violet">Artificial Intelligence & Machine Learning (AIML)</span>\nSPECIALTIES:\n  - Core OOP Engineering (Java)\n  - Web Server architectures (Node.js, Express.js)\n  - Database engines (MySQL Relational schemas, MongoDB NoSQL)\n  - Pattern extraction, dataset classification and modeling.',
    
    skills: 'CORE DIAGNOSTIC SPECIFICATIONS:\n  [Java/OOP]       ■■■■■■■■■□ 85%\n  [JavaScript]     ■■■■■■■■■■ 90%\n  [DBMS Relational]■■■■■■■■■□ 88%\n  [Node.js Engine] ■■■■■■■■■□ 85%\n  [Express Web]    ■■■■■■■■■□ 88%\n  [MySQL Schema]   ■■■■■■■■■■ 90%\n  [MongoDB NoSQL]  ■■■■■■■■□□ 82%\n  [AI/ML Models]   ■■■■■■■■□□ 80%',
    
    projects: 'ACTIVE REPOSITORIES:\n  1. <span class="text-cyan">NeuroPredict</span>\n     - Interactive 2D neural network classification boundary mapping simulator.\n  2. <span class="text-violet">QueryFlow DBMS</span>\n     - Java Swing utility analyzing indexing parameters in MySQL schemas.\n  3. <span class="text-magenta">SecureAuth Middleware</span>\n     - Express auth microservice backend backed by MongoDB clusters.',
    
    contact: 'COMMUNICATION DOCK:\n  - Email:    <a href="mailto:tanisha@example.com" class="text-cyan">tanisha@example.com</a>\n  - LinkedIn: <a href="#" target="_blank" class="text-violet">linkedin.com/in/tanisha</a>\n  - GitHub:   <a href="https://github.com/Tanisha10433" target="_blank" class="text-magenta">github.com/Tanisha10433</a>',
    
    secret: '🧠 [DIAGNOSTIC TRACE]: You have found the hidden node! \n  Weight multipliers configured successfully. AI Model accuracy increased to 99.9%. Keep coding!'
  };

  const handleCommand = (rawInput) => {
    const cmd = rawInput.trim().toLowerCase();
    
    // Create new elements for history
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-line';
    inputLine.innerHTML = `<span class="terminal-prompt">guest@tanisha.sys:~$</span> <span class="text-primary">${rawInput}</span>`;
    
    // Find output area and append input history before output
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
    } else if (commands[cmd]) {
      responseLine.innerHTML = commands[cmd];
    } else if (cmd !== '') {
      responseLine.innerHTML = `<span class="text-magenta">Command not found: "${rawInput}".</span> Type <span class="text-cyan">"help"</span> for catalog.`;
    }

    if (cmd !== '') {
      outputContainer.appendChild(responseLine);
    }

    terminalInput.value = '';
    
    // Auto Scroll to bottom
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
        element.innerHTML = '<span class="text-green">Matrix scan compilation finished. System integrity check: OK.</span>';
      }
    }, 60);
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleCommand(terminalInput.value);
      }
    });

    // Focus input on body click in the terminal area
    const terminalCard = document.querySelector('.terminal-card');
    terminalCard?.addEventListener('click', () => {
      terminalInput.focus();
    });
  }


  // --- Project Filter System ---
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


  // --- Interactive 2D Classification Playground ---
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

  // Visual dataset configuration: 2D coordinates classified into Class A (Cyan) and Class B (Violet)
  let dataPoints = [];
  
  const initDataset = (noise) => {
    dataPoints = [];
    const count = 40;
    
    // Class A (Top Left coordinates)
    for (let i = 0; i < count / 2; i++) {
      // Base center: x: 0.35, y: 0.35
      const rx = 0.15 + Math.random() * 0.3 + (Math.random() - 0.5) * noise;
      const ry = 0.15 + Math.random() * 0.3 + (Math.random() - 0.5) * noise;
      dataPoints.push({ x: rx, y: ry, label: 0 }); // Cyan
    }
    
    // Class B (Bottom Right coordinates)
    for (let i = 0; i < count / 2; i++) {
      // Base center: x: 0.70, y: 0.70
      const rx = 0.55 + Math.random() * 0.3 + (Math.random() - 0.5) * noise;
      const ry = 0.55 + Math.random() * 0.3 + (Math.random() - 0.5) * noise;
      dataPoints.push({ x: rx, y: ry, label: 1 }); // Violet
    }
  };

  // Model parameters (Linear weights representing: w1*x + w2*y + b = 0)
  let modelParams = { w1: 1, w2: -1.2, b: 0.1 };

  // Slider events
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

    // 1. Draw Decision Boundary f(x) shading
    // Shading Class A (Cyan, above/left of line) and Class B (Violet, below/right)
    for (let py = 0; py < h; py += 4) {
      for (let px = 0; px < w; px += 4) {
        const nx = px / w;
        const ny = py / h;
        // Eval model function: w1*x + w2*y + b
        const value = modelParams.w1 * nx + modelParams.w2 * ny + modelParams.b;
        
        if (value > 0) {
          lossCtx.fillStyle = 'rgba(6, 182, 212, 0.04)'; // Cyan tint
        } else {
          lossCtx.fillStyle = 'rgba(139, 92, 246, 0.04)'; // Violet tint
        }
        lossCtx.fillRect(px, py, 4, 4);
      }
    }

    // 2. Draw Grid coordinate lines
    lossCtx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
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

    // 3. Draw decision boundary line: w1*x + w2*y + b = 0 => y = -(w1*x + b)/w2
    lossCtx.beginPath();
    lossCtx.strokeStyle = 'rgba(217, 70, 239, 0.7)'; // Neon Magenta boundary
    lossCtx.lineWidth = 2;
    for (let px = 0; px <= w; px++) {
      const nx = px / w;
      const ny = -(modelParams.w1 * nx + modelParams.b) / modelParams.w2;
      const py = ny * h;
      if (px === 0) lossCtx.moveTo(px, py);
      else lossCtx.lineTo(px, py);
    }
    lossCtx.stroke();

    // 4. Draw data points
    dataPoints.forEach(p => {
      const px = p.x * w;
      const py = p.y * h;
      
      lossCtx.beginPath();
      lossCtx.arc(px, py, 5, 0, Math.PI * 2);
      
      if (p.label === 0) {
        lossCtx.fillStyle = '#06b6d4'; // Cyan
        lossCtx.shadowColor = 'rgba(6, 182, 212, 0.6)';
      } else {
        lossCtx.fillStyle = '#8b5cf6'; // Violet
        lossCtx.shadowColor = 'rgba(139, 92, 246, 0.6)';
      }
      
      lossCtx.shadowBlur = 4;
      lossCtx.fill();
      lossCtx.shadowBlur = 0; // reset shadow
      
      // Outline circle
      lossCtx.strokeStyle = '#040508';
      lossCtx.lineWidth = 1;
      lossCtx.stroke();
    });
  };

  // Initialize dataset and draw classifier space
  if (lossCanvas) {
    initDataset(0.1);
    // Initial bad model boundary params
    modelParams = { w1: 0.3, w2: -0.9, b: 0.3 };
    draw2DClassificationSpace();
    window.addEventListener('resize', draw2DClassificationSpace);
  }

  const runClassifierSimulation = () => {
    if (isTraining) return;
    isTraining = true;

    const lr = parseFloat(lrSlider.value);
    const totalEpochs = parseInt(epochsInput.value);

    // Target parameters that perfectly separate the dataset
    const targetW1 = 1.25;
    const targetW2 = -1.15;
    const targetB = -0.05;

    // Reset weights to bad start state
    modelParams = { w1: 0.3, w2: -0.9, b: 0.3 };

    trainBtn.disabled = true;
    trainBtn.innerHTML = '<i class="btn-icon spinner"></i> Optimizing...';
    statusDot.className = 'status-indicator training';
    statusText.textContent = 'Status: Training';

    let currentEpoch = 0;

    const trainEpoch = () => {
      if (currentEpoch >= totalEpochs) {
        isTraining = false;
        trainBtn.disabled = false;
        trainBtn.innerHTML = '<i data-lucide="play" class="btn-icon"></i> Start Classifier Fit';
        if (typeof lucide !== 'undefined') lucide.createIcons();
        statusDot.className = 'status-indicator complete';
        statusText.textContent = 'Status: Complete';
        return;
      }

      currentEpoch++;

      // Gradient descent wiggles: approach target weights at speed based on learning rate
      const stepSpeed = lr * 2.5;
      modelParams.w1 += (targetW1 - modelParams.w1) * stepSpeed;
      modelParams.w2 += (targetW2 - modelParams.w2) * stepSpeed;
      modelParams.b += (targetB - modelParams.b) * stepSpeed;

      // Simulated Loss / Accuracy calculations
      const diff = Math.abs(modelParams.w1 - targetW1) + Math.abs(modelParams.w2 - targetW2);
      const simulatedLoss = Math.max(0.005, diff * 0.45 + (Math.random() - 0.5) * 0.015);
      const simulatedAcc = Math.min(100, Math.max(45, 100 - diff * 45 + (Math.random() - 0.5) * 2));

      // Update HUD interface values
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


  // --- Form handling and validations ---
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

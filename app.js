/**
 * TECHNOCRACY (技術官僚) - INTERACTIVE ENGINE
 * Theme: Yin-Yang & Ancient-Cyber China
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initLandingAndLoader();
  initParticleCanvas();
  initDualityController();
  initBaguaMatrix();
  initTerminalOracle();
  initSealGenerator();
  initNavigationAndScroll();
  initFooterAndQuotes();
  initSoundToggle();
});

/* ==========================================================================
   1. CUSTOM YIN-YANG CURSOR & INK TRAIL
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const canvas = document.getElementById('cursor-canvas');
  if (!cursor || !canvas) return;

  const ctx = canvas.getContext('2d');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  const inkParticles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Generate subtle trailing ink droplets
    if (Math.random() < 0.35) {
      inkParticles.push({
        x: mouseX + (Math.random() - 0.5) * 8,
        y: mouseY + (Math.random() - 0.5) * 8,
        radius: Math.random() * 3 + 1,
        alpha: 0.6,
        isYang: Math.random() > 0.5,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  });

  // Hover detection for buttons and links
  const interactives = document.querySelectorAll('a, button, input, .interactive, .bagua-trigram-node, .duality-slider-input');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  function renderCursorTrail() {
    // Smooth lerp for main cursor element
    currentX += (mouseX - currentX) * 0.25;
    currentY += (mouseY - currentY) * 0.25;
    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;

    // Render ink particles
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = inkParticles.length - 1; i >= 0; i--) {
      const p = inkParticles[i];
      p.alpha -= p.decay;
      p.radius *= 0.96;

      if (p.alpha <= 0 || p.radius <= 0.2) {
        inkParticles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isYang ? `rgba(255, 255, 255, ${p.alpha})` : `rgba(30, 32, 40, ${p.alpha})`;
      ctx.shadowColor = p.isYang ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 4;
      ctx.fill();
    }

    requestAnimationFrame(renderCursorTrail);
  }
  renderCursorTrail();
}

/* ==========================================================================
   2. LANDING SCREEN & YIN-YANG SPLIT-GATE LOADER
   ========================================================================== */
function initLandingAndLoader() {
  const enterBtn = document.getElementById('enter-btn');
  const landingScreen = document.getElementById('landing-screen');
  const loaderOverlay = document.getElementById('loader-overlay');
  const loaderStatus = document.getElementById('loader-status');

  if (!enterBtn || !landingScreen || !loaderOverlay) return;

  enterBtn.addEventListener('click', () => {
    if (window.soundEngine) {
      window.soundEngine.init();
      window.soundEngine.playZenGong();
      window.soundEngine.playSwoosh();
    }

    // Step 1: Open loader overlay and close Yin/Yang gates from left & right
    loaderOverlay.classList.add('active');
    setTimeout(() => {
      loaderOverlay.classList.add('doors-closed');
      if (loaderStatus) loaderStatus.innerText = "SYNCHRONIZING DUALITY — 陰陽合一";
    }, 50);

    // Step 2: Animate status text progression
    setTimeout(() => {
      if (loaderStatus) loaderStatus.innerText = "ALIGNING BAGUA PROTOCOLS — 八卦歸位";
      if (window.soundEngine) window.soundEngine.playChime(3);
    }, 900);

    setTimeout(() => {
      if (loaderStatus) loaderStatus.innerText = "EQUILIBRIUM ACHIEVED — 天人合一";
      if (window.soundEngine) window.soundEngine.playChime(6);
    }, 1500);

    // Step 3: Split open doors to reveal main site
    setTimeout(() => {
      loaderOverlay.classList.remove('doors-closed');
      loaderOverlay.classList.add('doors-opening');
      landingScreen.classList.add('hidden');
      if (window.soundEngine) window.soundEngine.playSwoosh();
    }, 2200);

    // Step 4: Hide loader overlay completely
    setTimeout(() => {
      loaderOverlay.classList.remove('active', 'doors-opening');
    }, 3200);
  });
}

/* ==========================================================================
   3. INTERACTIVE HERO YIN-YANG PARTICLE CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('hero-particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const PARTICLE_COUNT = 160;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let mouse = { x: width / 2, y: height / 2, active: false };

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
      mouse.x = e.clientX;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
  });

  class DualParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.isYang = Math.random() > 0.5; // True = Yang (White), False = Yin (Dark Grey)
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (Math.min(width, height) * 0.45);
      
      this.x = initial ? width / 2 + Math.cos(angle) * dist : width / 2 + (Math.random() - 0.5) * 50;
      this.y = initial ? height / 2 + Math.sin(angle) * dist : height / 2 + (Math.random() - 0.5) * 50;
      
      this.radius = Math.random() * 2.2 + 0.8;
      this.orbitRadius = dist;
      this.angle = angle;
      this.speed = (Math.random() * 0.006 + 0.003) * (this.isYang ? 1 : -1);
      this.opacity = Math.random() * 0.6 + 0.2;
    }

    update(dualityRatio) {
      this.angle += this.speed * (this.isYang ? (1 + dualityRatio) : (2 - dualityRatio));
      
      const centerX = mouse.active ? mouse.x : width / 2;
      const centerY = mouse.active ? mouse.y : height / 2;

      const targetX = centerX + Math.cos(this.angle) * this.orbitRadius;
      const targetY = centerY + Math.sin(this.angle) * this.orbitRadius;

      this.x += (targetX - this.x) * 0.04;
      this.y += (targetY - this.y) * 0.04;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.isYang 
        ? `rgba(255, 255, 255, ${this.opacity})` 
        : `rgba(40, 44, 58, ${this.opacity * 0.9})`;
      
      if (this.isYang) {
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 8;
      } else {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 4;
      }
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new DualParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const dualityValue = parseFloat(document.documentElement.style.getPropertyValue('--duality-balance') || '0.5');

    // Draw central ambient connection lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;

    for (let i = 0; i < particles.length; i++) {
      particles[i].update(dualityValue);
      particles[i].draw();

      // Connect nearby opposite particles
      for (let j = i + 1; j < particles.length; j += 4) {
        if (particles[i].isYang !== particles[j].isYang) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   4. DUALITY EQUILIBRIUM CONTROLLER (SLIDER)
   ========================================================================== */
function initDualityController() {
  const slider = document.getElementById('duality-slider');
  const yinPct = document.getElementById('yin-percent');
  const yangPct = document.getElementById('yang-percent');
  const entropyVal = document.getElementById('entropy-value');
  const pillarYang = document.querySelector('.pillar-yang');
  const pillarYin = document.querySelector('.pillar-yin');

  if (!slider) return;

  function updateDuality(val) {
    const yangRatio = val / 100;
    const yinRatio = 1 - yangRatio;

    document.documentElement.style.setProperty('--duality-balance', yangRatio);

    if (yinPct) yinPct.innerText = `${Math.round(yinRatio * 100)}%`;
    if (yangPct) yangPct.innerText = `${Math.round(yangRatio * 100)}%`;

    // Entropy calculation (minimum at 50% equilibrium)
    const deviation = Math.abs(yangRatio - 0.5);
    const entropy = (0.001 + deviation * 0.045).toFixed(4);
    if (entropyVal) entropyVal.innerText = `${entropy} ΔS`;

    // Highlight respective pillar
    if (pillarYang && pillarYin) {
      if (yangRatio > 0.6) {
        pillarYang.style.borderColor = 'rgba(255, 255, 255, 0.8)';
        pillarYin.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      } else if (yangRatio < 0.4) {
        pillarYin.style.borderColor = 'rgba(255, 255, 255, 0.6)';
        pillarYang.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      } else {
        pillarYang.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        pillarYin.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      }
    }
  }

  slider.addEventListener('input', (e) => {
    updateDuality(e.target.value);
    if (window.soundEngine && Math.random() < 0.2) {
      window.soundEngine.playClick();
    }
  });

  updateDuality(slider.value || 50);
}

/* ==========================================================================
   5. THE BAGUA MATRIX (8 TRIGRAMS INTERACTIVE TELEMETRY)
   ========================================================================== */
const BAGUA_DATA = [
  {
    name: "Qian",
    chinese: "乾",
    trigram: "☰",
    nature: "Heaven / Pure Yang (天)",
    domain: "Quantum Consensus & Master Kernel",
    quote: "The movement of heaven is full of power. The technocrat tirelessly strengthens the architecture.",
    lines: [1, 1, 1], // 1 = solid yang, 0 = broken yin
    specLatency: "< 0.4ms",
    specThroughput: "1.2M TPS",
    specSecurity: "Post-Quantum Dilithium",
    specNodeSync: "99.999%"
  },
  {
    name: "Kun",
    chinese: "坤",
    trigram: "☷",
    nature: "Earth / Pure Yin (地)",
    domain: "Decentralized Substrate & Vault Storage",
    quote: "The earth's condition is receptive devotion. The technocrat sustains all emergent data layers.",
    lines: [0, 0, 0],
    specLatency: "1.2ms",
    specThroughput: "500 PB/s",
    specSecurity: "Zero-Knowledge Rollups",
    specNodeSync: "99.98%"
  },
  {
    name: "Kan",
    chinese: "坎",
    trigram: "☵",
    nature: "Water / Abysmal Fluidity (水)",
    domain: "Event Streams & Real-Time Data Pipelines",
    quote: "Water flows unceasingly and arrives at its destination. Continuous flow preserves the matrix.",
    lines: [0, 1, 0],
    specLatency: "0.8ms",
    specThroughput: "8.4 GB/s",
    specSecurity: "Homomorphic Encryption",
    specNodeSync: "99.99%"
  },
  {
    name: "Li",
    chinese: "離",
    trigram: "☲",
    nature: "Fire / Illumination (火)",
    domain: "Neural Inference & Cognitive Synthesis",
    quote: "That which is bright rises. Technological intelligence illuminates the path of decision.",
    lines: [1, 0, 1],
    specLatency: "2.1ms",
    specThroughput: "450 TFLOPS",
    specSecurity: "Secure Enclaves (TEE)",
    specNodeSync: "99.95%"
  },
  {
    name: "Zhen",
    chinese: "震",
    trigram: "☳",
    nature: "Thunder / Arousing Spark (雷)",
    domain: "High-Frequency Smart Contract Execution",
    quote: "Shock brings terror, then follows smiling laughter. Instant state transitions trigger execution.",
    lines: [0, 0, 1],
    specLatency: "0.15ms",
    specThroughput: "2.8M Ops/s",
    specSecurity: "Formal Proof Verification",
    specNodeSync: "99.999%"
  },
  {
    name: "Xun",
    chinese: "巽",
    trigram: "☴",
    nature: "Wind / Gentle Penetration (風)",
    domain: "Global Mesh Routing & P2P Protocols",
    quote: "The wind disperses unseen yet everywhere. Resilient routing navigates all network partitions.",
    lines: [1, 1, 0],
    specLatency: "1.5ms",
    specThroughput: "100 Gbps Mesh",
    specSecurity: "Onion Routing v4",
    specNodeSync: "99.97%"
  },
  {
    name: "Gen",
    chinese: "艮",
    trigram: "☶",
    nature: "Mountain / Stillness & Vault (山)",
    domain: "Cryptographic Cold Storage & Air-Gap Vaults",
    quote: "Keeping still in one's place. Immutable state anchors the digital civilization.",
    lines: [1, 0, 0],
    specLatency: "Air-Gapped",
    specThroughput: "Immutable Store",
    specSecurity: "Hardware Security Modules",
    specNodeSync: "100.00%"
  },
  {
    name: "Dui",
    chinese: "兌",
    trigram: "☱",
    nature: "Lake / Joyous Resonance (澤)",
    domain: "Neural User Interface & Symbiosis",
    quote: "Lakes resting upon one another join in joy. Human-machine harmony completes the cycle.",
    lines: [0, 1, 1],
    specLatency: "120Hz Fluid",
    specThroughput: "Bionic Feedback",
    specSecurity: "Biometric Zero-Knowledge",
    specNodeSync: "99.99%"
  }
];

function initBaguaMatrix() {
  const wheel = document.getElementById('bagua-wheel');
  const previewBox = document.getElementById('trigram-symbol-box');
  const titleEl = document.getElementById('trigram-title');
  const domainEl = document.getElementById('trigram-domain');
  const quoteEl = document.getElementById('trigram-quote');
  const specLatency = document.getElementById('spec-latency');
  const specThroughput = document.getElementById('spec-throughput');
  const specSecurity = document.getElementById('spec-security');
  const specNodeSync = document.getElementById('spec-nodesync');

  if (!wheel) return;

  const totalNodes = BAGUA_DATA.length;
  const radius = 180; // Distance from center

  BAGUA_DATA.forEach((item, idx) => {
    const angle = (idx / totalNodes) * (Math.PI * 2) - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    const node = document.createElement('div');
    node.className = `bagua-trigram-node ${idx === 0 ? 'active' : ''}`;
    node.style.transform = `translate(${x}px, ${y}px)`;
    node.innerHTML = `
      <span class="node-glyph">${item.chinese}</span>
      <span class="node-name">${item.name}</span>
    `;

    node.addEventListener('click', () => {
      document.querySelectorAll('.bagua-trigram-node').forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      displayTrigramData(item);
      if (window.soundEngine) window.soundEngine.playChime(idx);
    });

    wheel.appendChild(node);
  });

  function displayTrigramData(item) {
    if (titleEl) titleEl.innerText = `${item.chinese} (${item.name}) — ${item.nature}`;
    if (domainEl) domainEl.innerText = item.domain;
    if (quoteEl) quoteEl.innerText = `"${item.quote}"`;

    if (specLatency) specLatency.innerText = item.specLatency;
    if (specThroughput) specThroughput.innerText = item.specThroughput;
    if (specSecurity) specSecurity.innerText = item.specSecurity;
    if (specNodeSync) specNodeSync.innerText = item.specNodeSync;

    // Render 3 bars (Yang solid or Yin broken)
    if (previewBox) {
      previewBox.innerHTML = '';
      item.lines.forEach(isYang => {
        const bar = document.createElement('div');
        if (isYang === 1) {
          bar.className = 'bar-yang';
        } else {
          bar.className = 'bar-yin';
          bar.innerHTML = '<span></span><span></span>';
        }
        previewBox.appendChild(bar);
      });
    }
  }

  // Display initial trigram
  displayTrigramData(BAGUA_DATA[0]);
}

/* ==========================================================================
   6. INTERACTIVE SANCTUM TERMINAL & I CHING ORACLE
   ========================================================================== */
const ORACLE_HEXAGRAMS = [
  {
    number: 1,
    name: "乾 (Qian) - The Creative / Prime Origin",
    judgment: "Supreme success through perseverance in the code. A system of total yang alignment initiates monumental breakthroughs.",
    codeAdvice: "Deploy high-throughput algorithms. Confidence and direct deterministic execution are favored."
  },
  {
    number: 2,
    name: "坤 (Kun) - The Receptive / Pure Void",
    judgment: "Yielding brings auspicious outcomes. The void embraces and shelters all data transformations.",
    codeAdvice: "Refactor for extensibility. Listen to latency metrics and nurture distributed nodes without forceful override."
  },
  {
    number: 11,
    name: "泰 (Tai) - Peace / Perfect Equilibrium",
    judgment: "Heaven and Earth unite in flawless communication. Yin and Yang interchange with zero friction.",
    codeAdvice: "The system is harmonized. Ideal moment for major releases and cross-protocol integrations."
  },
  {
    number: 63,
    name: "既濟 (Ji Ji) - After Completion",
    judgment: "All tokens are in their rightful places. Order has been established; vigilance is required to prevent entropy.",
    codeAdvice: "Audit security boundaries and ensure automated failover tests are continuously active."
  },
  {
    number: 64,
    name: "未濟 (Wei Ji) - Before Completion",
    judgment: "The journey approaches fruition, yet the fox's tail is wet in the stream. Precision at the boundary determines victory.",
    codeAdvice: "Perform rigorous integration tests before final deployment. Balance speed with mathematical proofs."
  }
];

function initTerminalOracle() {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const quickBtns = document.querySelectorAll('.terminal-quick-btn');

  if (!terminalBody || !terminalInput) return;

  function appendLog(text, className = 'system') {
    const entry = document.createElement('div');
    entry.className = `terminal-log-entry ${className}`;
    entry.innerHTML = text;
    terminalBody.appendChild(entry);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    appendLog(`<span style="color:#ffffff;">❯ ${cmdRaw}</span>`, 'user');

    if (window.soundEngine) window.soundEngine.playClick();

    if (cmd === 'help') {
      appendLog(`
        <strong>AVAILABLE SANCTUM COMMANDS:</strong><br>
        • <code>oracle</code> / <code>divine</code> : Cast I Ching algorithmic divination coins.<br>
        • <code>balance</code> : Read current Yin-Yang systemic telemetry.<br>
        • <code>matrix</code> : List active Bagua trigram states.<br>
        • <code>manifesto</code> : Summarize the Four Principles of Technocracy.<br>
        • <code>clear</code> : Clear console log.<br>
        • <code>about</code> : Display version & architecture specs.
      `);
    } else if (cmd === 'oracle' || cmd === 'divine') {
      appendLog("<i>Casting 3 digital bronze coins into the quantum register...</i>", "system");
      setTimeout(() => {
        const hex = ORACLE_HEXAGRAMS[Math.floor(Math.random() * ORACLE_HEXAGRAMS.length)];
        appendLog(`
          <strong>[HEXAGRAM #${hex.number}: ${hex.name}]</strong><br>
          <em>Oracle Judgment:</em> ${hex.judgment}<br>
          <span style="color:#ffffff;"><em>Technocratic Guidance:</em> ${hex.codeAdvice}</span>
        `, 'oracle');
        if (window.soundEngine) window.soundEngine.playChime(4);
      }, 500);
    } else if (cmd === 'balance') {
      const balance = document.documentElement.style.getPropertyValue('--duality-balance') || '0.5';
      const yangPct = Math.round(balance * 100);
      const yinPct = 100 - yangPct;
      appendLog(`
        <strong>SYSTEM EQUILIBRIUM TELEMETRY:</strong><br>
        • Yin (Void / Neural / Fluid): ${yinPct}%<br>
        • Yang (Order / Logic / Proof): ${yangPct}%<br>
        • Status: ${Math.abs(yangPct - 50) < 15 ? 'HARMONIZED (中庸之道)' : 'ASYMMETRIC POLARITY'}
      `);
    } else if (cmd === 'matrix') {
      appendLog(`
        <strong>BAGUA OCTAGONAL MATRIX NODES:</strong><br>
        ☰ 乾 Qian (Heaven) | ☷ 坤 Kun (Earth) | ☵ 坎 Kan (Water) | ☲ 離 Li (Fire)<br>
        ☳ 震 Zhen (Thunder) | ☴ 巽 Xun (Wind) | ☶ 艮 Gen (Mountain) | ☱ 兌 Dui (Lake)<br>
        <em>All 8 nodes operating under sub-millisecond consensus.</em>
      `);
    } else if (cmd === 'manifesto') {
      appendLog(`
        <strong>THE FOUR PRINCIPLES OF SYNTHETIC DAOISM:</strong><br>
        1. Code is the manifestation of the Eternal Tao.<br>
        2. Absolute order decays without the generative void of Yin.<br>
        3. Autonomy through mathematical equilibrium.<br>
        4. Technology serves universal harmony (大同世界).
      `);
    } else if (cmd === 'about') {
      appendLog(`
        <strong>TECHNOCRACY PROTOCOL v4.0.8</strong><br>
        Architecture: Monochromatic Quantum-Daoist Governance<br>
        Core Engine: HTML5 / Vanilla CSS / Web Audio / JS Micro-kernel<br>
        Status: Equilibrium Active
      `);
    } else if (cmd === 'clear') {
      terminalBody.innerHTML = '';
      appendLog("Console initialized. Type <code>help</code> for commands.", "system");
    } else {
      appendLog(`Command not recognized: <code>${cmdRaw}</code>. Type <code>help</code> for list.`, "system");
    }
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand(terminalInput.value);
      terminalInput.value = '';
    }
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) handleCommand(cmd);
    });
  });
}

/* ==========================================================================
   7. IMPERIAL SEAL (HANKO / 篆刻) GENERATOR
   ========================================================================== */
function initSealGenerator() {
  const canvas = document.getElementById('sealCanvas');
  const nameInput = document.getElementById('seal-name-input');
  const styleSelect = document.getElementById('seal-style-select');
  const downloadBtn = document.getElementById('download-seal-btn');

  if (!canvas || !nameInput) return;
  const ctx = canvas.getContext('2d');

  function renderSeal() {
    const text = (nameInput.value || "技術").substring(0, 4);
    const style = styleSelect ? styleSelect.value : 'yang';
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    // Clear
    ctx.clearRect(0, 0, size, size);

    if (style === 'yang') {
      // Yang Style: White background, deep black ink border and characters
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      ctx.strokeStyle = '#050507';
      ctx.lineWidth = 14;
      ctx.strokeRect(10, 10, size - 20, size - 20);

      // Inner ornamental double line
      ctx.lineWidth = 2;
      ctx.strokeRect(22, 22, size - 44, size - 44);

      ctx.fillStyle = '#050507';
    } else {
      // Yin Style: Obsidian black background, luminous white border and characters
      ctx.fillStyle = '#0a0b0f';
      ctx.fillRect(0, 0, size, size);

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 14;
      ctx.strokeRect(10, 10, size - 20, size - 20);

      // Inner ornamental line
      ctx.lineWidth = 2;
      ctx.strokeRect(22, 22, size - 44, size - 44);

      ctx.fillStyle = '#ffffff';
    }

    // Grid quadrants if 4 characters, or centered if 1-2
    ctx.font = 'bold 84px "Noto Serif SC", "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (text.length === 1) {
      ctx.font = 'bold 140px "Noto Serif SC", "Cinzel", serif';
      ctx.fillText(text, size / 2, size / 2 + 5);
    } else if (text.length === 2) {
      ctx.font = 'bold 96px "Noto Serif SC", "Cinzel", serif';
      ctx.fillText(text[0], size / 2, size * 0.35);
      ctx.fillText(text[1], size / 2, size * 0.7);
    } else {
      // Traditional right-to-left, top-to-bottom seal quadrant layout
      const chars = text.padEnd(4, '印');
      ctx.fillText(chars[0], size * 0.72, size * 0.35);
      ctx.fillText(chars[1], size * 0.72, size * 0.72);
      ctx.fillText(chars[2], size * 0.28, size * 0.35);
      ctx.fillText(chars[3], size * 0.28, size * 0.72);
    }
  }

  nameInput.addEventListener('input', () => {
    renderSeal();
    if (window.soundEngine) window.soundEngine.playClick();
  });

  if (styleSelect) {
    styleSelect.addEventListener('change', () => {
      renderSeal();
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playStamp();
      const link = document.createElement('a');
      link.download = `technocracy-seal-${nameInput.value || 'dao'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  renderSeal();
}

/* ==========================================================================
   8. NAVIGATION & SMOOTH SCROLL
   ========================================================================== */
function initNavigationAndScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-item a');
  const sections = document.querySelectorAll('section[id]');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetSec = document.querySelector(targetId);
        if (targetSec) {
          e.preventDefault();
          targetSec.scrollIntoView({ behavior: 'smooth' });
          if (window.soundEngine) window.soundEngine.playClick();
        }
      }
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }
}

/* ==========================================================================
   9. FOOTER, TIME & QUOTES
   ========================================================================== */
const ZEN_QUOTES = [
  "The Tao that can be coded is not the eternal Tao.",
  "Yielding overcomes the rigid; fluid architectures endure the stress.",
  "In the stillness between clock cycles, pure intelligence manifests.",
  "Shape clay into a vessel; it is the void within that gives it utility.",
  "To govern code is to allow each algorithm to fulfill its natural Dao."
];

function initFooterAndQuotes() {
  const timeEl = document.getElementById('system-clock');
  const quoteEl = document.getElementById('footer-quote-text');

  function updateClock() {
    if (!timeEl) return;
    const now = new Date();
    timeEl.innerText = now.toUTCString().replace('GMT', 'UTC') + ` [${now.toLocaleTimeString()}]`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Rotate Zen quotes
  let qIdx = 0;
  if (quoteEl) {
    quoteEl.innerText = `"${ZEN_QUOTES[0]}"`;
    setInterval(() => {
      qIdx = (qIdx + 1) % ZEN_QUOTES.length;
      quoteEl.style.opacity = 0;
      setTimeout(() => {
        quoteEl.innerText = `"${ZEN_QUOTES[qIdx]}"`;
        quoteEl.style.opacity = 1;
      }, 500);
    }, 9000);
  }

  // Newsletter form
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value) {
        alert(`Welcome to Technocracy Guild: ${input.value}. Imperial clearance granted.`);
        input.value = '';
        if (window.soundEngine) window.soundEngine.playStamp();
      }
    });
  }
}

/* ==========================================================================
   10. SOUND TOGGLE BUTTON
   ========================================================================== */
function initSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (window.soundEngine) {
      const active = window.soundEngine.toggle();
      if (active) {
        soundBtn.classList.add('active');
        soundBtn.setAttribute('title', 'Sound Enabled');
        window.soundEngine.playChime(2);
      } else {
        soundBtn.classList.remove('active');
        soundBtn.setAttribute('title', 'Sound Muted');
      }
    }
  });
}

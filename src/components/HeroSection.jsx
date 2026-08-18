import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../utils/soundEngine';

export default function HeroSection({ dualityBalance, onDualityChange, onNavigate }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const PARTICLE_COUNT = 160;
    let animationFrameId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let mouse = { x: width / 2, y: height / 2, active: false };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouse.x = e.clientX;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    class DualParticle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.isYang = Math.random() > 0.5;
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * (Math.min(width, height) * 0.45);

        this.x = initial ? width / 2 + Math.cos(angle) * dist : width / 2 + (Math.random() - 0.5) * 50;
        this.y = initial ? height / 2 + Math.sin(angle) * dist : height / 2 + (Math.random() - 0.5) * 50;

        this.radius = Math.random() * 2.2 + 0.8;
        this.orbitRadius = dist;
        this.angle = angle;
        this.speed = (Math.random() * 0.005 + 0.003) * (this.isYang ? 1 : -1);
        this.opacity = Math.random() * 0.6 + 0.2;
      }

      update(ratio) {
        this.angle += this.speed * (this.isYang ? (1 + ratio) : (2 - ratio));

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

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const yangRatio = dualityBalance / 100;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(yangRatio);
        particles[i].draw();

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

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dualityBalance]);

  const yangPercent = dualityBalance;
  const yinPercent = 100 - dualityBalance;
  const entropy = (0.001 + Math.abs((dualityBalance / 100) - 0.5) * 0.045).toFixed(4);

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    onDualityChange(val);
    if (Math.random() < 0.2) soundEngine.playClick();
  };

  const handleNavClick = (e, selector) => {
    e.preventDefault();
    soundEngine.playClick();
    if (onNavigate) {
      onNavigate(selector);
    } else {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <canvas ref={canvasRef} id="hero-particle-canvas" />

      <div className="hero-container">
        <div className="hero-tag">
          <span className="tag-dot"></span>
          <span>NIT RAIPUR • TECHNICAL COMMITTEE • 陰陽技術</span>
        </div>

        <h1 className="hero-title">
          The Harmony of <br />
          <span className="hero-title-highlight">Innovation & Code</span>
        </h1>

        <p className="hero-subtitle">
          Welcome to the official portal of <strong>Team Technocracy</strong>, National Institute of Technology Raipur. 
          Where the ancient Taoist balance of <strong>Vigyaan (Science Genesis)</strong> and <strong>Aavartan (Applied Tech Fest)</strong> converges to inspire Central India's finest minds.
        </p>

        {/* Dynamic Duality Equilibrium Slider Card */}
        <div className="duality-controller-card">
          <div className="duality-header">
            <div className="duality-label-yin">
              <span>●</span>
              <span>YIN (陰) : <strong id="yin-percent">{yinPercent}%</strong> (Vigyaan / Research)</span>
            </div>
            <div className="duality-label-yang">
              <span>YANG (陽) : <strong id="yang-percent">{yangPercent}%</strong> (Aavartan / Tech Fest)</span>
              <span>○</span>
            </div>
          </div>

          <div className="duality-slider-track">
            <input 
              type="range" 
              id="duality-slider" 
              className="duality-slider-input interactive" 
              min="0" 
              max="100" 
              value={dualityBalance}
              onChange={handleSliderChange}
              aria-label="Adjust Vigyaan-Aavartan Duality Balance"
            />
          </div>

          <div className="duality-telemetry-row">
            <div>SYSTEM ENTROPY: <span id="entropy-value">{entropy} ΔS</span></div>
            <div>STATUS: <span>{Math.abs(dualityBalance - 50) < 15 ? 'HARMONIC EQUILIBRIUM' : 'POLAR SHIFT'}</span></div>
            <div>GOVERNANCE: <span>TECHNOCRACY NITRR</span></div>
          </div>
        </div>

        <div className="hero-actions">
          <a 
            href="#oracle" 
            className="btn-primary interactive" 
            onClick={(e) => handleNavClick(e, '#oracle')}
          >
            Consult Sanctum Terminal
          </a>
          <a 
            href="#bagua-timeline" 
            className="btn-secondary interactive" 
            onClick={(e) => handleNavClick(e, '#bagua-timeline')}
          >
            Explore Bagua Timeline
          </a>
        </div>
      </div>
    </section>
  );
}

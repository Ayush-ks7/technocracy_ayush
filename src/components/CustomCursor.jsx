import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !canvas) return;

    const ctx = canvas.getContext('2d');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    const inkParticles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Spawn occasional subtle ink droplet
      if (Math.random() < 0.3) {
        inkParticles.push({
          x: mouseX + (Math.random() - 0.5) * 6,
          y: mouseY + (Math.random() - 0.5) * 6,
          radius: Math.random() * 2.5 + 0.8,
          alpha: 0.5,
          isYang: Math.random() > 0.5,
          decay: Math.random() * 0.02 + 0.015
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Hover detection for interactive items
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, .interactive, .bagua-trigram-node, .clickable-card');
      if (target) {
        cursor.classList.add('hovering');
      } else {
        cursor.classList.remove('hovering');
      }
    };
    document.addEventListener('mouseover', handleMouseOver);

    const render = () => {
      currentX += (mouseX - currentX) * 0.25;
      currentY += (mouseY - currentY) * 0.25;
      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;

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

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="custom-cursor-container">
      <canvas ref={canvasRef} id="cursor-canvas" />
      <div ref={cursorRef} id="custom-cursor">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#000000" stroke="#ffffff" strokeWidth="2" />
          <path d="M50 2 A48 48 0 0 1 50 98 A24 24 0 0 1 50 50 A24 24 0 0 0 50 2" fill="#ffffff" />
          <circle cx="50" cy="26" r="7" fill="#000000" />
          <circle cx="50" cy="74" r="7" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}

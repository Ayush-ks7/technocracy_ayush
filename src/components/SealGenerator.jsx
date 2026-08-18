import React, { useState, useRef, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';

export default function SealGenerator() {
  const [sealName, setSealName] = useState('技術官僚');
  const [sealStyle, setSealStyle] = useState('yang');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    const text = (sealName || "技術").substring(0, 4);

    ctx.clearRect(0, 0, size, size);

    if (sealStyle === 'yang') {
      // Yang Style: White background, deep black ink
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      ctx.strokeStyle = '#050507';
      ctx.lineWidth = 14;
      ctx.strokeRect(10, 10, size - 20, size - 20);

      // Inner line
      ctx.lineWidth = 2;
      ctx.strokeRect(22, 22, size - 44, size - 44);

      ctx.fillStyle = '#050507';
    } else {
      // Yin Style: Obsidian black background, luminous white ink
      ctx.fillStyle = '#0a0b0f';
      ctx.fillRect(0, 0, size, size);

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 14;
      ctx.strokeRect(10, 10, size - 20, size - 20);

      // Inner line
      ctx.lineWidth = 2;
      ctx.strokeRect(22, 22, size - 44, size - 44);

      ctx.fillStyle = '#ffffff';
    }

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
      const chars = text.padEnd(4, '印');
      ctx.fillText(chars[0], size * 0.72, size * 0.35);
      ctx.fillText(chars[1], size * 0.72, size * 0.72);
      ctx.fillText(chars[2], size * 0.28, size * 0.35);
      ctx.fillText(chars[3], size * 0.28, size * 0.72);
    }
  }, [sealName, sealStyle]);

  const handleDownload = () => {
    soundEngine.playStamp();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `technocracy-nitrr-seal-${sealName || 'dao'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section id="seal" className="section-wrapper">
      <div className="seal-gen-card">
        <div className="seal-preview-box">
          <canvas ref={canvasRef} id="sealCanvas" />
          <button 
            id="download-seal-btn" 
            className="btn-primary interactive"
            onClick={handleDownload}
            style={{ fontSize: '0.85rem', padding: '0.7rem 1.8rem' }}
          >
            Download Seal Stamp PNG
          </button>
        </div>

        <div className="seal-inputs">
          <div className="section-eyebrow" style={{ marginBottom: '0.2rem' }}>CUSTOM HANKO EMBLEM</div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
            Imperial Seal Generator (篆刻)
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Inscribe your name or department monogram onto a traditional square seal with ornamental borders. 
            Generate your verified Technocracy NIT Raipur credentials badge.
          </p>

          <div className="input-group">
            <label htmlFor="seal-name-input">INSCRIPTION CHARACTERS (UP TO 4 CHARACTERS)</label>
            <input 
              type="text" 
              id="seal-name-input" 
              className="input-field interactive" 
              value={sealName}
              maxLength={4}
              onChange={(e) => {
                setSealName(e.target.value);
                if (Math.random() < 0.3) soundEngine.playClick();
              }}
              placeholder="Enter characters (e.g. 技術, 陰陽, NITR)"
            />
          </div>

          <div className="input-group">
            <label htmlFor="seal-style-select">SEAL INK POLARITY STYLE</label>
            <select 
              id="seal-style-select" 
              className="input-field interactive"
              value={sealStyle}
              onChange={(e) => {
                setSealStyle(e.target.value);
                soundEngine.playClick();
              }}
            >
              <option value="yang">Yang Polarity (White Parchment, Dark Ink)</option>
              <option value="yin">Yin Polarity (Obsidian Glass, Luminous White Ink)</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

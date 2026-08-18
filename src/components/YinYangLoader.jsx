import React, { useEffect, useState } from 'react';
import { soundEngine } from '../utils/soundEngine';

export default function YinYangLoader({ isActive, onComplete }) {
  const [statusText, setStatusText] = useState('INITIALIZING DUALITY...');
  const [phase, setPhase] = useState('idle'); // 'idle' | 'closed' | 'opening'

  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      return;
    }

    // Step 1: Close doors
    setPhase('closed');
    setStatusText('SYNCHRONIZING DUALITY — 陰陽合一');

    // Step 2: Protocol message
    const t1 = setTimeout(() => {
      setStatusText('INITIALIZING AAVARTAN & VIGYAAN — 八卦歸位');
      soundEngine.playChime(3);
    }, 800);

    // Step 3: Harmony achieved
    const t2 = setTimeout(() => {
      setStatusText('HARMONY ATTAINED — 進入技術官僚');
      soundEngine.playChime(6);
    }, 1500);

    // Step 4: Open doors (iris split)
    const t3 = setTimeout(() => {
      setPhase('opening');
      soundEngine.playSwoosh();
    }, 2200);

    // Step 5: Complete
    const t4 = setTimeout(() => {
      setPhase('idle');
      if (onComplete) onComplete();
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive, onComplete]);

  if (!isActive && phase === 'idle') return null;

  return (
    <div id="loader-overlay" className={`active ${phase === 'closed' ? 'doors-closed' : ''} ${phase === 'opening' ? 'doors-opening' : ''}`}>
      {/* Left Yang Gate (White background with dark watermark) */}
      <div className="loader-gate-yang">
        <div className="gate-watermark yang-wm">陽 • YANG</div>
        <svg viewBox="0 0 100 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%', fill: '#ffffff' }}>
          <rect width="100" height="200" fill="#ffffff" />
        </svg>
      </div>

      {/* Right Yin Gate (Black background with light watermark) */}
      <div className="loader-gate-yin">
        <div className="gate-watermark yin-wm">陰 • YIN</div>
        <svg viewBox="0 0 100 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%', fill: '#000000' }}>
          <rect width="100" height="200" fill="#000000" />
        </svg>
      </div>

      {/* Center Interlocking Taijitu Element */}
      <div className="loader-center-taijitu">
        <div className="loader-trigram-ring">
          <span className="loader-trigram-item" style={{ top: '-24px', left: '50%', transform: 'translateX(-50%)' }}>乾</span>
          <span className="loader-trigram-item" style={{ bottom: '-24px', left: '50%', transform: 'translateX(-50%)' }}>坤</span>
          <span className="loader-trigram-item" style={{ left: '-24px', top: '50%', transform: 'translateY(-50%)' }}>坎</span>
          <span className="loader-trigram-item" style={{ right: '-24px', top: '50%', transform: 'translateY(-50%)' }}>離</span>
        </div>

        <div className="loader-taijitu-disc">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#000000" stroke="#ffffff" strokeWidth="2"/>
            <path d="M50 2 A48 48 0 0 1 50 98 A24 24 0 0 1 50 50 A24 24 0 0 0 50 2" fill="#ffffff"/>
            <circle cx="50" cy="26" r="7" fill="#000000"/>
            <circle cx="50" cy="74" r="7" fill="#ffffff"/>
          </svg>
        </div>

        {/* Inverted / Difference Status Text: Black on White side, White on Black side */}
        <div id="loader-status" className="loader-status-text difference-blend">
          {statusText}
        </div>
      </div>
    </div>
  );
}

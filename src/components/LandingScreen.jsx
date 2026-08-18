import React from 'react';
import { soundEngine } from '../utils/soundEngine';
import bgImage from '../assets/images.png';

export default function LandingScreen({ onEnter, isHidden }) {
  const handleEnterClick = () => {
    soundEngine.init();
    soundEngine.playZenGong();
    soundEngine.playSwoosh();
    onEnter();
  };

  return (
    <div id="landing-screen" className={isHidden ? 'hidden' : ''}>
      <div className="landing-bg-wrapper">
        <img src={bgImage} alt="Ancient Pagoda Architecture - Technocracy" className="landing-bg-image" />
        <div className="landing-vignette"></div>
      </div>

      <div className="landing-content">
        <div className="seal-badge">技術</div>
        <h1 className="landing-title">TECHNOCRACY</h1>
        <div className="landing-subtitle-cn">NIT RAIPUR • 陰陽技術</div>
        <p className="landing-desc">
          The Official Technical Committee of the National Institute of Technology Raipur. 
          Pioneering innovation through <strong>Aavartan</strong>, Central India's largest tech-fest, 
          and <strong>Vigyaan</strong>, the premier national science exhibition.
        </p>

        <div className="enter-btn-wrap">
          <button 
            id="enter-btn" 
            className="enter-btn interactive" 
            onClick={handleEnterClick}
            aria-label="Enter the Technocracy Sanctum"
          >
            <span>Enter the Sanctum</span>
            <span className="btn-yinyang-icon">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <circle cx="50" cy="50" r="48" fill="#000000" stroke="#ffffff" strokeWidth="3"/>
                <path d="M50 2 A48 48 0 0 1 50 98 A24 24 0 0 1 50 50 A24 24 0 0 0 50 2" fill="#ffffff"/>
                <circle cx="50" cy="26" r="7" fill="#000000"/>
                <circle cx="50" cy="74" r="7" fill="#ffffff"/>
              </svg>
            </span>
          </button>
          <div className="enter-btn-pulse"></div>
        </div>
      </div>

      <div className="landing-telemetry">
        <div>ORIGIN: <span>NIT RAIPUR (EST. 2007)</span></div>
        <div>SANCTUM: <span>TECHNICAL COMMITTEE</span></div>
        <div>EQUILIBRIUM: <span>AAVARTAN ☯ VIGYAAN</span></div>
      </div>
    </div>
  );
}

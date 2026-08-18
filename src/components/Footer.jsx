import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';

const ZEN_QUOTES = [
  "The Tao that can be coded is not the eternal Tao.",
  "In the crucible of Vigyaan research, raw potential transforms into Aavartan breakthroughs.",
  "Yielding overcomes the rigid; fluid architectures endure the stress.",
  "Shape clay into a vessel; it is the void within that gives it utility.",
  "To govern code is to allow each algorithm to fulfill its natural Dao."
];

export default function Footer({ onNavigate }) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [clock, setClock] = useState('UTC 00:00:00');
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClock(`${now.toUTCString().replace('GMT', 'UTC')} [${now.toLocaleTimeString()}]`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIdx((prev) => (prev + 1) % ZEN_QUOTES.length);
        setQuoteVisible(true);
      }, 500);
    }, 8500);
    return () => clearInterval(quoteInterval);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    soundEngine.playStamp();
    alert(`Transmission registered for ${emailInput}. Imperial Technocracy clearances granted.`);
    setEmailInput('');
  };

  const handleLinkClick = (e, selector) => {
    e.preventDefault();
    soundEngine.playClick();
    if (onNavigate) {
      onNavigate(selector);
    } else {
      const target = document.querySelector(selector);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollTop = () => {
    soundEngine.playClick();
    if (onNavigate) {
      onNavigate('#hero');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" role="contentinfo">
      <div className="footer-top">
        <div className="footer-brand">
          <h3>TECHNOCRACY</h3>
          <p>
            The Official Technical Committee of the National Institute of Technology Raipur. 
            Synthesizing ancient Taoist equilibrium (陰陽之道) with high-order engineering excellence across Aavartan and Vigyaan.
          </p>
          <div className="footer-zen-quote">
            <span style={{ opacity: quoteVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
              "{ZEN_QUOTES[quoteIdx]}"
            </span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#hero" className="interactive" onClick={(e) => handleLinkClick(e, '#hero')}>About Committee</a></li>
            <li><a href="#pillars" className="interactive" onClick={(e) => handleLinkClick(e, '#pillars')}>Aavartan & Vigyaan</a></li>
            <li><a href="#bagua-timeline" className="interactive" onClick={(e) => handleLinkClick(e, '#bagua-timeline')}>Bagua Timeline</a></li>
            <li><a href="#domains" className="interactive" onClick={(e) => handleLinkClick(e, '#domains')}>Operational Wings</a></li>
            <li><a href="#events" className="interactive" onClick={(e) => handleLinkClick(e, '#events')}>Flagship Events</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Sanctum Console</h4>
          <ul>
            <li><a href="#oracle" className="interactive" onClick={(e) => handleLinkClick(e, '#oracle')}>Sanctum Terminal</a></li>
            <li><a href="#seal" className="interactive" onClick={(e) => handleLinkClick(e, '#seal')}>Imperial Seal Generator</a></li>
            <li><a href="#faq" className="interactive" onClick={(e) => handleLinkClick(e, '#faq')}>FAQ & Inquiries</a></li>
            <li><a href="https://technocracy.nitrr.ac.in" target="_blank" rel="noopener noreferrer" className="interactive">Official NITRR Portal</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Guild Transmissions</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
            Receive quarterly announcements, event schedules, and whitepapers directly from the committee.
          </p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              className="newsletter-input interactive" 
              placeholder="Enter your terminal email..." 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required 
            />
            <button type="submit" className="newsletter-btn interactive">Join</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2026 TEAM TECHNOCRACY • NIT RAIPUR • ALL PROTOCOLS RESERVED • 陰陽技術</div>
        <div>SYSTEM CLOCK: <span>{clock}</span></div>
        <button id="back-to-top" className="back-to-top-btn interactive" onClick={handleScrollTop} aria-label="Scroll to top of page">
          ↑ Back to Top
        </button>
      </div>
    </footer>
  );
}

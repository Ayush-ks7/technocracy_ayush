import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

export default function Navbar({ soundEnabled, onToggleSound, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sectionIds = ['hero', 'pillars', 'bagua-timeline', 'domains', 'events', 'oracle', 'seal', 'faq'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Pillars', href: '#pillars' },
    { name: 'Bagua Timeline', href: '#bagua-timeline' },
    { name: 'Domains', href: '#domains' },
    { name: 'Events', href: '#events' },
    { name: 'Oracle', href: '#oracle' },
    { name: 'Seal', href: '#seal' },
    { name: 'FAQ', href: '#faq' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    soundEngine.playClick();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''} role="navigation" aria-label="Main Navigation">
        <a href="#hero" className="nav-brand interactive" onClick={(e) => handleLinkClick(e, '#hero')}>
          <div className="nav-logo-icon">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
              <circle cx="50" cy="50" r="48" fill="#000000" stroke="#ffffff" strokeWidth="2" />
              <path d="M50 2 A48 48 0 0 1 50 98 A24 24 0 0 1 50 50 A24 24 0 0 0 50 2" fill="#ffffff" />
              <circle cx="50" cy="26" r="7" fill="#000000" />
              <circle cx="50" cy="74" r="7" fill="#ffffff" />
            </svg>
          </div>
          <div className="nav-brand-text">
            <span className="nav-brand-title">TECHNOCRACY</span>
            <span className="nav-brand-subtitle">NIT RAIPUR • 陰陽</span>
          </div>
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              <a
                href={link.href}
                className={`interactive ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            id="sound-toggle-btn"
            className={`sound-toggle-btn interactive ${soundEnabled ? 'active' : ''}`}
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            title={soundEnabled ? 'Sound FX Enabled' : 'Sound FX Muted'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <a
            href="#oracle"
            className="nav-cta-btn interactive"
            onClick={(e) => handleLinkClick(e, '#oracle')}
          >
            Sanctum Terminal
          </a>

          <button
            className="mobile-menu-btn interactive"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="interactive"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

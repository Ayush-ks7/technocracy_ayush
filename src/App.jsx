import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { soundEngine } from './utils/soundEngine';
import CustomCursor from './components/CustomCursor';
import LandingScreen from './components/LandingScreen';
import YinYangLoader from './components/YinYangLoader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DualPillars from './components/DualPillars';
import BaguaTimelineCombined from './components/BaguaTimelineCombined';
import DomainsSection from './components/DomainsSection';
import EventsSection from './components/EventsSection';
import SanctumTerminal from './components/SanctumTerminal';
import SealGenerator from './components/SealGenerator';
import FaqContactSection from './components/FaqContactSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [dualityBalance, setDualityBalance] = useState(50);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scroll and sync with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    // Lock scrolling while on intro landing screen
    lenis.stop();
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleEnterClick = () => {
    // 1. Lock position at top
    window.scrollTo(0, 0);
    setIsLoaderActive(true);

    // 2. Hide landing screen immediately as doors start closing so main site is directly underneath
    setTimeout(() => {
      setHasEntered(true);
      window.scrollTo(0, 0);
    }, 400);
  };

  const handleLoaderComplete = () => {
    setIsLoaderActive(false);

    // Unlock scrolling and start cleanly from top
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
    if (lenisRef.current) {
      lenisRef.current.start();
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 150);
  };

  const handleToggleSound = () => {
    const active = soundEngine.toggle();
    setSoundEnabled(active);
    if (active) soundEngine.playChime(2);
  };

  const handleDualityChange = (val) => {
    setDualityBalance(val);
    document.documentElement.style.setProperty('--duality-balance', val / 100);
  };

  const scrollToSection = (selector) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(selector, { offset: -70, duration: 1.3 });
    } else {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Custom Yin-Yang cursor */}
      <CustomCursor />

      <div className="noise-overlay" />

      {/* Landing Screen (removed underneath doors once enter clicked) */}
      {!hasEntered && (
        <LandingScreen 
          onEnter={handleEnterClick} 
          isHidden={hasEntered} 
        />
      )}

      {/* Split-Gate Yin-Yang Loader Transition */}
      <YinYangLoader 
        isActive={isLoaderActive} 
        onComplete={handleLoaderComplete} 
      />

      {/* Main Website Content (directly rendered underneath opening doors) */}
      <div 
        id="main-content" 
        style={{ 
          opacity: hasEntered ? 1 : 0, 
          visibility: hasEntered ? 'visible' : 'hidden',
          transition: 'opacity 0.6s ease' 
        }}
      >
        <Navbar 
          soundEnabled={soundEnabled} 
          onToggleSound={handleToggleSound} 
          onNavigate={scrollToSection}
        />

        <main>
          <HeroSection 
            dualityBalance={dualityBalance} 
            onDualityChange={handleDualityChange} 
            onNavigate={scrollToSection}
          />

          <DualPillars 
            dualityBalance={dualityBalance} 
          />

          <BaguaTimelineCombined />

          <DomainsSection />

          <EventsSection />

          <SanctumTerminal 
            dualityBalance={dualityBalance} 
          />

          <SealGenerator />

          <FaqContactSection />
        </main>

        <Footer onNavigate={scrollToSection} />
      </div>
    </div>
  );
}

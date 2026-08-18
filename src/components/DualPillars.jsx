import React from 'react';
import { soundEngine } from '../utils/soundEngine';
import { Zap, Compass, Award, Users, Cpu, ShieldCheck } from 'lucide-react';

export default function DualPillars({ dualityBalance }) {
  const yangActive = dualityBalance >= 50;

  return (
    <section id="pillars" className="section-wrapper">
      <div className="section-header">
        <div className="section-eyebrow">THE DUAL FLAGSHIPS OF NIT RAIPUR</div>
        <h2 className="section-title">The Twin Pillars of Technocracy</h2>
        <p className="section-subtitle">
          True innovation thrives through the absolute contrast and harmony of pure <strong>Yang (Luminous Action & Execution)</strong> and pure <strong>Yin (Deep Void & Research Genesis)</strong>.
        </p>
      </div>

      <div className="dual-pillars-grid">
        {/* YANG PILLAR: AAVARTAN (STARK PURE WHITE CARD) */}
        <div 
          className={`pillar-card pillar-yang-pure ${yangActive ? 'highlighted' : ''}`}
          onMouseEnter={() => soundEngine.playChime(1)}
        >
          <div className="pillar-badge-pure yang-badge">陽 • YANG ORDER</div>
          <h3 className="pillar-heading-pure yang-text-main">Aavartan : The Tech Fest</h3>
          <p className="pillar-desc-pure yang-text-sub">
            Central India's largest annual technical festival. Established in 2011, Aavartan attracts over 10,000+ participants nationwide for high-octane hackathons, heavy combat robotics, and global technology conclaves.
          </p>
          <ul className="pillar-features-pure">
            <li className="pillar-feature-item-pure yang-text-item">
              <div className="pillar-icon-box yang-icon-box">
                <Zap size={18} />
              </div>
              <span><strong>RoboWars & Combat Arena:</strong> High-impact bot battles, autonomous line-trackers, and terrain conquerors.</span>
            </li>
            <li className="pillar-feature-item-pure yang-text-item">
              <div className="pillar-icon-box yang-icon-box">
                <Cpu size={18} />
              </div>
              <span><strong>ByteCraft 36-Hr Hackathon:</strong> Real-world software problem statements solved under intense time constraints.</span>
            </li>
            <li className="pillar-feature-item-pure yang-text-item">
              <div className="pillar-icon-box yang-icon-box">
                <Users size={18} />
              </div>
              <span><strong>Guest Lectures & Conclaves:</strong> Keynotes by celebrated researchers, tech founders, and defense scientists.</span>
            </li>
          </ul>
        </div>

        {/* YIN PILLAR: VIGYAAN (STARK PURE BLACK CARD) */}
        <div 
          className={`pillar-card pillar-yin-pure ${!yangActive ? 'highlighted' : ''}`}
          onMouseEnter={() => soundEngine.playChime(4)}
        >
          <div className="pillar-badge-pure yin-badge">陰 • YIN GENESIS</div>
          <h3 className="pillar-heading-pure yin-text-main">Vigyaan : Science Exhibition</h3>
          <p className="pillar-desc-pure yin-text-sub">
            The foundational national-level science exhibition of NIT Raipur, established in 2007. The deep cradle of disruptive hardware prototypes and research across all 10 engineering branches.
          </p>
          <ul className="pillar-features-pure">
            <li className="pillar-feature-item-pure yin-text-item">
              <div className="pillar-icon-box yin-icon-box">
                <Compass size={18} />
              </div>
              <span><strong>10 Engineering Disciplines:</strong> Hardware exhibits from CSE, Mech, ECE, Bio-Med, Chem, Mining, and Metallurgy.</span>
            </li>
            <li className="pillar-feature-item-pure yin-text-item">
              <div className="pillar-icon-box yin-icon-box">
                <Award size={18} />
              </div>
              <span><strong>National Innovation Jury:</strong> Live project defense before esteemed faculty, DRDO scientists, and industry leaders.</span>
            </li>
            <li className="pillar-feature-item-pure yin-text-item">
              <div className="pillar-icon-box yin-icon-box">
                <ShieldCheck size={18} />
              </div>
              <span><strong>Incubation & Patents:</strong> Top prototypes receive seed support, patent guidance, and incubation at NIT Raipur.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

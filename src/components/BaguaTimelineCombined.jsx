import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/soundEngine';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BAGUA_TIMELINE_DATA = [
  {
    id: 0,
    year: "2007",
    chinese: "乾",
    trigram: "☰",
    name: "Qian (Heaven)",
    era: "The Prime Genesis: Inception of Vigyaan",
    domain: "National Science Exhibition Genesis",
    quote: "The movement of heaven is full of power. Sages and students lay the first foundation stone of innovation at NIT Raipur.",
    lines: [1, 1, 1],
    footfall: "1,200+",
    institutions: "15 Colleges",
    exhibits: "40 Prototypes",
    highlights: "Launched as a standalone science exhibition to ignite interdisciplinary engineering research across central India."
  },
  {
    id: 1,
    year: "2011",
    chinese: "坤",
    trigram: "☷",
    name: "Kun (Earth)",
    era: "The Great Metamorphosis: Birth of Aavartan",
    domain: "Foundational Tech-Fest Expansion",
    quote: "The earth supports and shelters all creations. Vigyaan expands into the mega multi-disciplinary festival Aavartan.",
    lines: [0, 0, 0],
    footfall: "4,500+",
    institutions: "35 Colleges",
    exhibits: "80 Prototypes",
    highlights: "Aavartan emerges as Central India's premier tech fest, integrating national-level robotics, coding, and design contests."
  },
  {
    id: 2,
    year: "2015",
    chinese: "坎",
    trigram: "☵",
    name: "Kan (Water)",
    era: "The Fluid Stream: Robotics Arena & Combat Wars",
    domain: "Autonomous Robotics & Hardware Surge",
    quote: "Water flows unceasingly through rocky valleys. Combat bots and autonomous line-trackers conquer the arena.",
    lines: [0, 1, 0],
    footfall: "7,000+",
    institutions: "55 Colleges",
    exhibits: "95 Prototypes",
    highlights: "Introduction of flagship RoboWars, Terrain Treaders, and Circuitrix, cementing NIT Raipur's hardware dominance."
  },
  {
    id: 3,
    year: "2019",
    chinese: "離",
    trigram: "☲",
    name: "Li (Fire)",
    era: "The Illuminating Peak: Decennial 10,000+ Milestone",
    domain: "Pan-National Apex & Corporate Alliance",
    quote: "Bright fire illuminates all directions. Aavartan achieves pan-India stature with record footfalls and industry partnerships.",
    lines: [1, 0, 1],
    footfall: "10,000+",
    institutions: "85 Colleges",
    exhibits: "120 Prototypes",
    highlights: "Celebrated landmark 10K+ footfall with high-profile guest lectures by defense luminaries and tech founders."
  },
  {
    id: 4,
    year: "2021",
    chinese: "巽",
    trigram: "☴",
    name: "Xun (Wind)",
    era: "The Gentle Wind: Digital Renaissance & Virtual Conclaves",
    domain: "Global Hackathons & Cloud Synchronization",
    quote: "The wind penetrates everywhere without physical boundaries. Technocracy transitions seamlessly to hybrid global paradigms.",
    lines: [1, 1, 0],
    footfall: "12,000+ (Virtual)",
    institutions: "120+ Pan-India",
    exhibits: "150 Digital Submissions",
    highlights: "Pioneered virtual 36-hour hackathons and nationwide online technical webinars with global mentors."
  },
  {
    id: 5,
    year: "2023",
    chinese: "震",
    trigram: "☳",
    name: "Zhen (Thunder)",
    era: "The Arousing Spark: AI, Web3 & Deep Tech Era",
    domain: "High-Frequency AI & Neural Compute",
    quote: "Shock brings awe, initiating breakthroughs. Modern cybernetics, machine intelligence, and Web3 integrate into Aavartan.",
    lines: [0, 0, 1],
    footfall: "13,500+",
    institutions: "90 Colleges",
    exhibits: "140 Prototypes",
    highlights: "ByteCraft Hackathon surges, dedicated Generative AI tracks and IoT problem statements from industry sponsors."
  },
  {
    id: 6,
    year: "2024",
    chinese: "艮",
    trigram: "☶",
    name: "Gen (Mountain)",
    era: "The Immutable Mountain: Aavartan '24 Apex",
    domain: "Institutional Preeminence & Patent Incubation",
    quote: "Keeping firm as a mountain amidst change. Vigyaan '24 witnesses record research submissions and multi-lakh prize pools.",
    lines: [1, 0, 0],
    footfall: "15,000+",
    institutions: "110 Colleges",
    exhibits: "160 Prototypes",
    highlights: "Highest recorded participation in Central India, fostering deep patent filings and startup incubation at NIT Raipur."
  },
  {
    id: 7,
    year: "2025-26",
    chinese: "兌",
    trigram: "☱",
    name: "Dui (Lake)",
    era: "The Joyous Concord: The Harmonized Future",
    domain: "Quantum-Daoist Technocratic Governance",
    quote: "Lakes joining together manifest eternal harmony. Technocracy embraces sustainable, human-aligned technological mastery.",
    lines: [0, 1, 1],
    footfall: "18,000+ (Projected)",
    institutions: "150+ Projected",
    exhibits: "200+ Next-Gen Projects",
    highlights: "Autonomous agent governance, clean-tech robotics, and global collegiate consortiums leading into the next decade."
  }
];

export default function BaguaTimelineCombined() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const wheelRef = useRef(null);

  const selectedTrigram = BAGUA_TIMELINE_DATA[activeIdx] || BAGUA_TIMELINE_DATA[0];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const wheel = wheelRef.current;
    if (!section || !track || !wheel) return;

    const cards = track.querySelectorAll('.timeline-side-card');
    const nodes = wheel.querySelectorAll('.bagua-side-node');

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const containerWidth = track.parentElement.offsetWidth;
        return -(trackWidth - containerWidth + 80);
      };

      const timelineMaster = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${Math.max(track.scrollWidth, 2400)}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * BAGUA_TIMELINE_DATA.length),
              BAGUA_TIMELINE_DATA.length - 1
            );
            setActiveIdx(index);
          }
        }
      });

      // 1. Rotate the Bagua circle on the left continuously as we scroll
      timelineMaster.to(wheel, {
        rotation: 360,
        ease: "none"
      }, 0);

      // 2. COUNTER-ROTATE each node to keep orientation of text/names locked upright!
      timelineMaster.to(nodes, {
        rotation: -360,
        ease: "none"
      }, 0);

      // 3. Horizontally translate the timeline track on the right
      timelineMaster.to(track, {
        x: getScrollAmount,
        ease: "none"
      }, 0);

      // 4. Slow reveal animation for each card as it enters view
      cards.forEach((card) => {
        gsap.fromTo(
          card.querySelector('.timeline-card-inner'),
          { opacity: 0.3, y: 35, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: timelineMaster,
              start: "left 85%",
              end: "left 45%",
              scrub: true
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleTrigramNodeClick = (idx) => {
    setActiveIdx(idx);
    soundEngine.playChime(idx);
  };

  const totalNodes = BAGUA_TIMELINE_DATA.length;
  const radius = 135;

  return (
    <section id="bagua-timeline" className="bagua-timeline-side-by-side-section" ref={sectionRef}>
      <div className="timeline-side-by-side-container">
        
        {/* LEFT COLUMN: THE ROTATING BAGUA CIRCLE & ACTIVE DETAILS */}
        <div className="timeline-left-col">
          <div className="timeline-left-header">
            <div className="timeline-eyebrow">BAGUA CHRONOLOGY (八卦編年史)</div>
            <h2 className="timeline-left-title">Technocracy Timeline</h2>
            <p className="timeline-left-subtitle">
              The rotating 8-Trigram matrix on the left harmonizes with the historical milestone cards unfolding on the right.
            </p>
          </div>

          {/* Interactive Rotating Bagua Circle */}
          <div className="bagua-side-wheel-wrap">
            <div className="bagua-side-outer-ring"></div>
            <div className="bagua-side-inner-ring"></div>
            <div 
              ref={wheelRef} 
              className="bagua-side-wheel"
            >
              {/* Center Taijitu Core */}
              <div 
                className="bagua-side-core interactive" 
                title="Central Taijitu Core"
                onClick={() => soundEngine.playZenGong()}
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                  <circle cx="50" cy="50" r="48" fill="#000000" stroke="#ffffff" strokeWidth="2"/>
                  <path d="M50 2 A48 48 0 0 1 50 98 A24 24 0 0 1 50 50 A24 24 0 0 0 50 2" fill="#ffffff"/>
                  <circle cx="50" cy="26" r="7" fill="#000000"/>
                  <circle cx="50" cy="74" r="7" fill="#ffffff"/>
                </svg>
              </div>

              {/* 8 Trigram Nodes positioned on circle (orientation locked via counter-rotation) */}
              {BAGUA_TIMELINE_DATA.map((item, idx) => {
                const angle = (idx / totalNodes) * (Math.PI * 2) - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isActive = activeIdx === idx;

                return (
                  <div
                    key={item.id}
                    className={`bagua-side-node interactive ${isActive ? 'active' : ''}`}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    onClick={() => handleTrigramNodeClick(idx)}
                    title={`${item.year} - ${item.chinese} (${item.name})`}
                  >
                    <span className="node-glyph">{item.chinese}</span>
                    <span className="node-year">{item.year}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Trigram Telemetry Box below Wheel */}
          <div className="bagua-side-telemetry-box">
            <div className="telemetry-top-line">
              <div className="telemetry-trigram-bars">
                {selectedTrigram.lines.map((isYang, lIdx) => (
                  isYang === 1 ? (
                    <div key={lIdx} className="bar-yang-sm"></div>
                  ) : (
                    <div key={lIdx} className="bar-yin-sm">
                      <span></span><span></span>
                    </div>
                  )
                ))}
              </div>
              <div className="telemetry-text-group">
                <span className="telemetry-current-era">
                  {selectedTrigram.chinese} ({selectedTrigram.name}) • {selectedTrigram.year}
                </span>
                <span className="telemetry-domain-tag">{selectedTrigram.domain}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HORIZONTALLY SCROLLING TIMELINE TRACK */}
        <div className="timeline-right-col">
          <div className="timeline-side-track" ref={trackRef}>
            {BAGUA_TIMELINE_DATA.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div key={item.id} className="timeline-side-card">
                  <div 
                    className={`timeline-card-inner interactive ${isActive ? 'active-border' : ''}`}
                    onClick={() => handleTrigramNodeClick(idx)}
                  >
                    <div className="card-top-row">
                      <span className="card-year-badge">{item.year}</span>
                      <span className="card-trigram-glyph">{item.chinese} {item.trigram}</span>
                    </div>

                    <h3 className="card-era-title">{item.era}</h3>
                    <div className="card-domain-tag">{item.domain}</div>
                    <p className="card-highlights">{item.highlights}</p>

                    <div className="card-metrics-grid">
                      <div className="card-metric-item">
                        <span className="metric-lbl">Footfall</span>
                        <span className="metric-val">{item.footfall}</span>
                      </div>
                      <div className="card-metric-item">
                        <span className="metric-lbl">Reach</span>
                        <span className="metric-val">{item.institutions}</span>
                      </div>
                    </div>

                    <div className="card-footer-quote">
                      <em>"{item.quote}"</em>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

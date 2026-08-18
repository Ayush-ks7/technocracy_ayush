import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { Bot, Terminal, Cpu, Lightbulb, PenTool, Flame, Layers, Rocket, Shield, Globe, Award, Database } from 'lucide-react';

const ALL_EVENTS_DATA = [
  {
    id: "robowars",
    category: "Robotics & Hardware",
    title: "RoboWars: Heavyweight Clash",
    chinese: "機甲爭鋒",
    icon: Bot,
    tag: "Flagship Combat",
    desc: "Heavyweight and featherweight combat bots collide in an enclosed steel cage. Test your pneumatic axes, spinners, armor resilience, and kinetic weaponry.",
    prize: "₹75,000+ Prize Pool",
    teamSize: "2 - 5 Members"
  },
  {
    id: "terrain-treaders",
    category: "Robotics & Hardware",
    title: "Terrain Treaders & Robo Race",
    chinese: "極速競逐",
    icon: Flame,
    tag: "All-Terrain Obstacle",
    desc: "Navigate custom-built RC bots through sand traps, mud pits, steep ramps, water hurdles, and bridge tracks in a race against the clock.",
    prize: "₹40,000+ Prize Pool",
    teamSize: "1 - 4 Members"
  },
  {
    id: "robosoccer",
    category: "Robotics & Hardware",
    title: "RoboSoccer Showdown",
    chinese: "機甲蹴鞠",
    icon: Shield,
    tag: "Bot Football Arena",
    desc: "Custom high-torque bots face off in an enclosed miniature football field. Precision control, agility, and defensive shielding dictate the champion.",
    prize: "₹30,000+ Prize Pool",
    teamSize: "2 - 4 Members"
  },
  {
    id: "bytecraft",
    category: "Software & Coding",
    title: "ByteCraft: 36-Hour Hackathon",
    chinese: "代碼駭客",
    icon: Terminal,
    tag: "Pan-India Hackathon",
    desc: "Build disruptive decentralized apps, AI assistants, smart city platforms, or FinTech systems during a non-stop 36-hour coding battle with industry mentors.",
    prize: "₹1,00,000+ Prize Pool",
    teamSize: "2 - 4 Members"
  },
  {
    id: "dsa-marathon",
    category: "Software & Coding",
    title: "DSA Marathon & Speed Clash",
    chinese: "算法神算",
    icon: Cpu,
    tag: "Competitive Coding",
    desc: "High-octane algorithmic challenges testing complex data structures, dynamic programming, segment trees, graph flows, and time-space efficiency.",
    prize: "₹35,000+ Prize Pool",
    teamSize: "Individual"
  },
  {
    id: "web-weaver",
    category: "Software & Coding",
    title: "Web Weaver & Debug Sprint",
    chinese: "網道編程",
    icon: Globe,
    tag: "Fullstack Challenge",
    desc: "Frontend UI/UX architecture and fullstack API debugging. Build responsive, glassmorphic, accessible web apps under strict time constraints.",
    prize: "₹25,000+ Prize Pool",
    teamSize: "1 - 2 Members"
  },
  {
    id: "vigyaan-expo",
    category: "Vigyaan & Research",
    title: "Vigyaan Science Exhibition",
    chinese: "格物致知",
    icon: Lightbulb,
    tag: "National Science Expo",
    desc: "The hallmark national exhibition since 2007. Present hardware working models across Bio-Med, Biotech, Chemical, Civil, CSE, ECE, EE, Mech, Mining, and Metallurgy.",
    prize: "₹1,20,000+ & Incubation",
    teamSize: "1 - 5 Members"
  },
  {
    id: "bio-genesis",
    category: "Vigyaan & Research",
    title: "Bio-Genesis & Health Tech",
    chinese: "生物創生",
    icon: Database,
    tag: "Bio-Med Prototype",
    desc: "Showcase breakthrough biomedical diagnostic devices, prosthetic prototypes, bio-sensors, and computational biochemistry models.",
    prize: "₹30,000+ Prize Pool",
    teamSize: "1 - 4 Members"
  },
  {
    id: "circuitrix",
    category: "Robotics & Hardware",
    title: "Circuitrix & IoT Forge",
    chinese: "電路玄機",
    icon: Cpu,
    tag: "Hardware Debugging",
    desc: "Live breadboard circuit design, micro-controller programming (ESP32/STM32/Arduino), and rapid hardware fault diagnosis.",
    prize: "₹30,000+ Prize Pool",
    teamSize: "1 - 3 Members"
  },
  {
    id: "cad-quest",
    category: "Design & CAD",
    title: "CAD Quest: 3D Mech Design",
    chinese: "機械制圖",
    icon: Layers,
    tag: "SolidWorks & AutoCAD",
    desc: "Draft complex mechanical assemblies, stress-strain FEA simulations, and generative aerodynamic hulls in AutoCAD and SolidWorks.",
    prize: "₹30,000+ Prize Pool",
    teamSize: "1 - 2 Members"
  },
  {
    id: "techno-graphix",
    category: "Design & CAD",
    title: "Techno Graphix & 3D Prototyping",
    chinese: "玄藝設計",
    icon: PenTool,
    tag: "UI/UX & Render",
    desc: "Solve real-world human-computer interaction challenges with Figma wireframing, Blender 3D rendering, and aesthetic narrative design.",
    prize: "₹25,000+ Prize Pool",
    teamSize: "1 - 2 Members"
  },
  {
    id: "bridge-gap",
    category: "Design & CAD",
    title: "Bridge the Gap: Truss Load Test",
    chinese: "巧奪天工",
    icon: Award,
    tag: "Structural Design",
    desc: "Design and build popsicle/balsa bridge trusses to withstand immense hydraulic point loads. Evaluated on load-to-weight efficiency ratios.",
    prize: "₹25,000+ Prize Pool",
    teamSize: "2 - 3 Members"
  },
  {
    id: "aqua-rocket",
    category: "Robotics & Hardware",
    title: "Hydrolift: Aqua Rocketry",
    chinese: "水箭沖天",
    icon: Rocket,
    tag: "Pneumatic Propulsion",
    desc: "Construct aerodynamic pressurized water rockets with staged deployment and parachute recovery mechanisms. Tested for altitude and flight stability.",
    prize: "₹20,000+ Prize Pool",
    teamSize: "1 - 3 Members"
  },
  {
    id: "pitch-perfect",
    category: "Innovation & Business",
    title: "Pitch Perfect: E-Summit",
    chinese: "商業縱橫",
    icon: Award,
    tag: "Startup Conclave",
    desc: "Pitch novel technological business models to venture capitalists and angel investors for seed funding, mentorship, and incubator entry.",
    prize: "₹50,000+ Seed Grants",
    teamSize: "1 - 4 Members"
  },
  {
    id: "cipher-quest",
    category: "Innovation & Business",
    title: "Cipher Quest & Tech Hunt",
    chinese: "尋真密碼",
    icon: Terminal,
    tag: "Cryptography Hunt",
    desc: "Crack multi-stage cryptographic ciphers, steganography riddles, and physical QR clues hidden across the NIT Raipur campus.",
    prize: "₹20,000+ Prize Pool",
    teamSize: "2 - 4 Members"
  }
];

export default function EventsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All', 
    'Robotics & Hardware', 
    'Software & Coding', 
    'Vigyaan & Research', 
    'Design & CAD', 
    'Innovation & Business'
  ];

  const filteredEvents = selectedCategory === 'All' 
    ? ALL_EVENTS_DATA 
    : ALL_EVENTS_DATA.filter(e => e.category === selectedCategory);

  return (
    <section id="events" className="section-wrapper">
      <div className="section-header">
        <div className="section-eyebrow">COMPETITIVE ARENA</div>
        <h2 className="section-title">All Flagship Competitions & Challenges</h2>
        <p className="section-subtitle">
          Explore the complete spectrum of technical showdowns organized by Team Technocracy at NIT Raipur, spanning combat robotics, hackathons, scientific research, and structural engineering.
        </p>

        {/* Filter Pills */}
        <div className="events-filter-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`events-filter-btn interactive ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                soundEngine.playClick();
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="events-grid">
        {filteredEvents.map((evt, idx) => {
          const IconComp = evt.icon;
          return (
            <div 
              key={evt.id} 
              className="event-card interactive"
              onMouseEnter={() => soundEngine.playChime(idx % 8)}
            >
              <div className="event-card-top">
                <div className="event-tag-badge">{evt.tag}</div>
                <div className="event-chinese-sub">{evt.chinese}</div>
              </div>

              <div className="event-icon-circle">
                <IconComp size={24} />
              </div>

              <h3 className="event-title">{evt.title}</h3>
              <p className="event-desc">{evt.desc}</p>

              <div className="event-meta-row">
                <div className="event-meta-item">
                  <span className="event-meta-lbl">Prize Bounty</span>
                  <span className="event-meta-val">{evt.prize}</span>
                </div>
                <div className="event-meta-item">
                  <span className="event-meta-lbl">Team Size</span>
                  <span className="event-meta-val">{evt.teamSize}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

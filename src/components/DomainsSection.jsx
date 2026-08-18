import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { Code, FlaskConical, Calendar, Palette, Radio, Briefcase, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DOMAINS_ROW_1 = [
  {
    chinese: "技",
    name: "Technical & Web Dev",
    icon: Code,
    desc: "Architecting high-scale event platforms, live leaderboard engines, IoT scoring setups, and server security for Technocracy NIT Raipur.",
    role: "Fullstack Systems • Cloud Infrastructure • DevOps"
  },
  {
    chinese: "研",
    name: "Vigyaan Core",
    icon: FlaskConical,
    desc: "Coordinating the national-level science exhibition, inter-departmental jury evaluations, project defense protocols, and prototype archiving.",
    role: "Research Liaison • Hardware Prototypes • Jury Panels"
  },
  {
    chinese: "籌",
    name: "Events & Operations",
    icon: Calendar,
    desc: "Executing 25+ flagship tech competitions, building the reinforced RoboWars arena, stage production, and venue management.",
    role: "On-Ground Execution • Arena Logistics • Crowd Safety"
  },
  {
    chinese: "藝",
    name: "Design & Creative Media",
    icon: Palette,
    desc: "Sculpting visual identities, motion graphics, 3D promotional assets, UI/UX designs, and official fest merchandise.",
    role: "Visual Identity • 3D Motion • Brand Aesthetics"
  }
];

const DOMAINS_ROW_2 = [
  {
    chinese: "宣",
    name: "Media, PR & Outreach",
    icon: Radio,
    desc: "Managing press relations, national publicity campaigns, and a campus ambassador network spanning 150+ colleges across India.",
    role: "Pan-India Outreach • Public Relations • Digital Campaigns"
  },
  {
    chinese: "商",
    name: "Sponsorship & Alliances",
    icon: Briefcase,
    desc: "Securing corporate partnerships, tech grants, hardware sponsorships, and title benefactors for multi-lakh prize pools.",
    role: "Corporate Alliances • Grant Securing • Industry Network"
  },
  {
    chinese: "文",
    name: "Documentation & Logistics",
    icon: FileText,
    desc: "Drafting official institute authorizations, rulebooks, judge scorecards, certificate issuance, and comprehensive post-fest reports.",
    role: "Institutional Compliance • Rulebooks • Fest Archives"
  }
];

export default function DomainsSection() {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!section || !row1 || !row2) return;

    const ctx = gsap.context(() => {
      // Row 1 animation triggers first
      gsap.fromTo(
        row1.querySelectorAll('.domain-card'),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row1,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Row 2 animation triggers sequentially as user scrolls further
      gsap.fromTo(
        row2.querySelectorAll('.domain-card'),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row2,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="domains" className="section-wrapper" ref={sectionRef}>
      <div className="section-header">
        <div className="section-eyebrow">COMMITTEE ARCHITECTURE</div>
        <h2 className="section-title">The Operational Domains</h2>
        <p className="section-subtitle">
          Team Technocracy operates through specialized functional wings that collaborate in seamless harmony to orchestrate Aavartan and Vigyaan.
        </p>
      </div>

      <div className="domains-container">
        {/* ROW 1: Revealed First */}
        <div className="domains-row" ref={row1Ref}>
          {DOMAINS_ROW_1.map((domain, idx) => {
            const IconComponent = domain.icon;
            return (
              <div 
                key={domain.name} 
                className="domain-card interactive"
                onMouseEnter={() => soundEngine.playChime(idx)}
              >
                <div className="domain-card-header">
                  <div className="domain-chinese-stamp">{domain.chinese}</div>
                  <div className="domain-icon-wrap">
                    <IconComponent size={22} />
                  </div>
                </div>

                <h3 className="domain-title">{domain.name}</h3>
                <p className="domain-desc">{domain.desc}</p>
                
                <div className="domain-footer-role">
                  <span>{domain.role}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ROW 2: Revealed Second */}
        <div className="domains-row row-2-grid" ref={row2Ref}>
          {DOMAINS_ROW_2.map((domain, idx) => {
            const IconComponent = domain.icon;
            return (
              <div 
                key={domain.name} 
                className="domain-card interactive"
                onMouseEnter={() => soundEngine.playChime(idx + 4)}
              >
                <div className="domain-card-header">
                  <div className="domain-chinese-stamp">{domain.chinese}</div>
                  <div className="domain-icon-wrap">
                    <IconComponent size={22} />
                  </div>
                </div>

                <h3 className="domain-title">{domain.name}</h3>
                <p className="domain-desc">{domain.desc}</p>
                
                <div className="domain-footer-role">
                  <span>{domain.role}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

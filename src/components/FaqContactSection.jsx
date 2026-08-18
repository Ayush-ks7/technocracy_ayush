import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { ChevronDown, MapPin, Mail, Globe, Sparkles } from 'lucide-react';

const FAQS_DATA = [
  {
    q: "What is the distinction between Aavartan and Vigyaan?",
    a: "Vigyaan is the flagship national-level science exhibition (founded in 2007) focusing on working hardware prototypes across 10 engineering disciplines. Aavartan is the broader annual technical fest (founded in 2011) that encompasses Vigyaan along with RoboWars, hackathons, guest lectures, and competitive coding marathons."
  },
  {
    q: "Who is eligible to participate in Aavartan and Vigyaan events?",
    a: "Students enrolled in any recognized undergraduate, postgraduate, or diploma program across India are eligible to participate. Cross-college and interdisciplinary teams are actively encouraged for hackathons and science exhibitions."
  },
  {
    q: "Are accommodations provided for outstation participants?",
    a: "Yes. Team Technocracy coordinates verified hostel and guest-house accommodations within the NIT Raipur campus for short-listed participants and traveling teams during fest days."
  },
  {
    q: "How are projects evaluated in the Vigyaan exhibition?",
    a: "Prototypes are judged by an esteemed panel comprising NIT Raipur senior professors, DRDO/CSIR scientists, and industry leaders based on innovation, feasibility, market impact, and working model defense."
  },
  {
    q: "How can NIT Raipur students join Team Technocracy?",
    a: "Recruitment drives are conducted annually for first- and second-year students across Technical, Vigyaan, Events, Design, PR, Sponsorship, and Documentation domains."
  }
];

export default function FaqContactSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    soundEngine.playClick();
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section-wrapper">
      <div className="section-header">
        <div className="section-eyebrow">SANCTUM INQUIRIES & CONTACT</div>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Everything you need to know regarding participation, team structure, and event guidelines for Aavartan & Vigyaan.
        </p>
      </div>

      <div className="faq-contact-grid">
        {/* Left: FAQ Accordion */}
        <div className="faq-accordion-wrap">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item interactive ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question-row">
                  <span className="faq-question-text">{faq.q}</span>
                  <ChevronDown className={`faq-chevron ${isOpen ? 'rotated' : ''}`} size={18} />
                </div>
                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Sanctum Contact Card */}
        <div className="contact-info-card">
          <div className="contact-card-header">
            <div className="contact-stamp-badge">總部</div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff' }}>Technocracy Sanctum</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>NIT RAIPUR CAMPUS</p>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.8rem' }}>
            For corporate sponsorships, institutional collaborations, and participation inquiries, reach out directly to the committee coordinators.
          </p>

          <div className="contact-details-list">
            <div className="contact-detail-item">
              <MapPin size={18} />
              <div>
                <strong>National Institute of Technology Raipur</strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>G.E. Road, Raipur, Chhattisgarh - 492010, India</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <Mail size={18} />
              <div>
                <strong>Official Communication Channels</strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>technocracy@nitrr.ac.in • aavartan@nitrr.ac.in</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <Globe size={18} />
              <div>
                <strong>Official Portal</strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>https://technocracy.nitrr.ac.in</p>
              </div>
            </div>
          </div>

          <div className="contact-card-footer">
            <Sparkles size={16} />
            <span>Harmonizing Science & Technology Since 2007</span>
          </div>
        </div>
      </div>
    </section>
  );
}

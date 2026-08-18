import React, { useState, useRef, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';

export default function SanctumTerminal({ dualityBalance }) {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState([
    {
      type: 'system',
      content: `[SYSTEM INITIATED] Connected to Technocracy Sanctum Mainframe (NIT Raipur).
[EQUILIBRIUM PROTOCOL] Yin-Yang balance active. 8 Bagua nodes synchronized.
Type 'help' to display available commands or use the quick buttons below.`
    }
  ]);

  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    soundEngine.playClick();

    const userEntry = { type: 'user', content: `❯ ${rawCmd}` };
    let responseEntry = null;

    if (cmd === 'help') {
      responseEntry = {
        type: 'system',
        content: `
<strong>AVAILABLE TECHNOCRACY COMMANDS:</strong><br>
• <code>about</code> : Overview of Team Technocracy NIT Raipur.<br>
• <code>aavartan</code> : Central India's largest technical festival.<br>
• <code>vigyaan</code> : National-level science exhibition (Est. 2007).<br>
• <code>timeline</code> : Bagua Chronology from 2007 to 2026.<br>
• <code>events</code> : Flagship competitions & hackathons.<br>
• <code>domains</code> : Operational wings & committee structure.<br>
• <code>oracle</code> : Cast digital I Ching algorithmic divination coins.<br>
• <code>balance</code> : Current Yin-Yang systemic telemetry.<br>
• <code>contact</code> : Sanctum coordinates and communication channels.<br>
• <code>clear</code> : Clear terminal history.
        `
      };
    } else if (cmd === 'about') {
      responseEntry = {
        type: 'info',
        content: `
<strong>[ABOUT TEAM TECHNOCRACY]</strong><br>
Team Technocracy is the official technical committee of the National Institute of Technology (NIT) Raipur. 
Established to cultivate technological excellence, interdisciplinary research, and leadership among students, 
the committee acts as the custodian of NIT Raipur's flagship technical identity.
        `
      };
    } else if (cmd === 'aavartan') {
      responseEntry = {
        type: 'info',
        content: `
<strong>[AAVARTAN — CENTRAL INDIA'S LARGEST TECH-FEST]</strong><br>
• <em>Inception:</em> 2011 (Evolved from Vigyaan)<br>
• <em>Footfall:</em> 10,000+ to 15,000+ students across India.<br>
• <em>Flagships:</em> RoboWars, ByteCraft 36-Hr Hackathon, Terrain Treaders, DSA Marathon.<br>
• <em>Impact:</em> 25+ events, national workshops, and keynote conclaves by top defense and industry titans.
        `
      };
    } else if (cmd === 'vigyaan') {
      responseEntry = {
        type: 'info',
        content: `
<strong>[VIGYAAN — NATIONAL SCIENCE EXHIBITION]</strong><br>
• <em>Inception:</em> 2007 (The foundational genesis of Technocracy)<br>
• <em>Departments:</em> Bio-Med, Biotech, Chemical, Civil, CSE/IT, ECE, EE, Mech, Metallurgy, Mining.<br>
• <em>Purpose:</em> Platform for students across India to defend working hardware prototypes before faculty & DRDO/industry juries.
        `
      };
    } else if (cmd === 'timeline') {
      responseEntry = {
        type: 'info',
        content: `
<strong>[THE BAGUA CHRONOLOGY SUMMARY (2007–2026)]</strong><br>
☰ <em>2007 (Qian):</em> Inception of Vigyaan science exhibition.<br>
☷ <em>2011 (Kun):</em> Metamorphosis into Aavartan Tech Fest.<br>
☵ <em>2015 (Kan):</em> Robotics Arena & Combat RoboWars surge.<br>
☲ <em>2019 (Li):</em> Decennial 10,000+ footfall landmark.<br>
☴ <em>2021 (Xun):</em> Digital Renaissance & Pan-India Virtual Hackathons.<br>
☳ <em>2023 (Zhen):</em> AI, Web3 & Deep Tech Cybernetics Era.<br>
☶ <em>2024 (Gen):</em> Aavartan '24 Apex with 15,000+ participants.<br>
☱ <em>2025-26 (Dui):</em> Quantum-Daoist Technocratic Governance.
        `
      };
    } else if (cmd === 'events') {
      responseEntry = {
        type: 'info',
        content: `
<strong>[FLAGSHIP COMPETITIONS & CHALLENGES]</strong><br>
1. <em>ByteCraft Hackathon:</em> 36-hour intense product development.<br>
2. <em>RoboWars:</em> High-impact combat robotics arena.<br>
3. <em>Vigyaan Exhibition:</em> 10-department hardware prototype expo.<br>
4. <em>DSA Marathon:</em> Algorithmic speed programming.<br>
5. <em>Circuitrix:</em> Embedded IoT & micro-controller debugging.<br>
6. <em>Techno Graphix:</em> UI/UX and 3D architectural rendering.
        `
      };
    } else if (cmd === 'domains') {
      responseEntry = {
        type: 'info',
        content: `
<strong>[TECHNOCRACY OPERATIONAL DOMAINS]</strong><br>
• <em>Technical & Web Dev:</em> Core server platforms & scoring apps.<br>
• <em>Vigyaan:</em> Prototype management & jury defense liaison.<br>
• <em>Events & Operations:</em> On-ground arena build & execution.<br>
• <em>Design & Media:</em> 3D motion, visual arts, and merchandise.<br>
• <em>PR & Outreach:</em> 150+ colleges campus ambassador network.<br>
• <em>Sponsorship:</em> Corporate grants & industry partnerships.<br>
• <em>Documentation:</em> Institute compliance & official archives.
        `
      };
    } else if (cmd === 'contact') {
      responseEntry = {
        type: 'info',
        content: `
<strong>[SANCTUM COORDINATES & CONTACT]</strong><br>
• <em>Sanctum:</em> National Institute of Technology, G.E. Road, Raipur, CG - 492010<br>
• <em>Portal:</em> https://technocracy.nitrr.ac.in/<br>
• <em>Email:</em> technocracy@nitrr.ac.in | aavartan@nitrr.ac.in<br>
• <em>Socials:</em> @technocracy.nitrr on Instagram, LinkedIn & YouTube
        `
      };
    } else if (cmd === 'balance') {
      const yangRatio = dualityBalance;
      const yinRatio = 100 - yangRatio;
      responseEntry = {
        type: 'info',
        content: `
<strong>[SYSTEM EQUILIBRIUM TELEMETRY]</strong><br>
• Yin (Vigyaan / Research / Genesis): ${yinRatio}%<br>
• Yang (Aavartan / Tech Fest / Order): ${yangRatio}%<br>
• System Status: ${Math.abs(yangRatio - 50) < 15 ? 'HARMONIZED (中庸之道)' : 'POLAR SHIFT DETECTED'}<br>
• Entropy Index: ${(0.001 + Math.abs((dualityBalance / 100) - 0.5) * 0.045).toFixed(4)} ΔS
        `
      };
    } else if (cmd === 'oracle' || cmd === 'divine') {
      const hexagrams = [
        {
          num: 1,
          name: "乾 (Qian) - The Creative Genesis",
          text: "Supreme success through unyielding perseverance. Deploy bold algorithmic solutions; the universe supports deterministic engineering."
        },
        {
          num: 2,
          name: "坤 (Kun) - The Receptive Substrate",
          text: "Yielding brings auspicious results. Embrace fluid refactoring; nurture all decentralized participants."
        },
        {
          num: 11,
          name: "泰 (Tai) - Peace / Perfect Synthesis",
          text: "Heaven and Earth unite in flawless communication. Vigyaan and Aavartan achieve total institutional harmony."
        },
        {
          num: 63,
          name: "既濟 (Ji Ji) - After Completion",
          text: "All tokens in their rightful places. Maintain vigilance against technical debt to preserve system longevity."
        }
      ];
      const picked = hexagrams[Math.floor(Math.random() * hexagrams.length)];
      soundEngine.playChime(4);
      responseEntry = {
        type: 'oracle',
        content: `
<strong>[I CHING ORACLE — HEXAGRAM #${picked.num}: ${picked.name}]</strong><br>
<em>Judgment:</em> ${picked.text}<br>
<span style="color:#ffffff;"><em>Technocratic Advice:</em> Balance theoretical research (Vigyaan) with intense competitive execution (Aavartan).</span>
        `
      };
    } else if (cmd === 'clear') {
      setLogs([]);
      return;
    } else {
      responseEntry = {
        type: 'system',
        content: `Command not recognized: <code>${rawCmd}</code>. Type <code>help</code> for available commands.`
      };
    }

    setLogs((prev) => [...prev, userEntry, responseEntry]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  return (
    <section id="oracle" className="section-wrapper">
      <div className="section-header">
        <div className="section-eyebrow">INTERACTIVE COMMAND INTERFACE</div>
        <h2 className="section-title">Sanctum Terminal & I Ching Oracle</h2>
        <p className="section-subtitle">
          Query the Technocracy mainframe to explore summaries of Aavartan, Vigyaan, Timeline, Domains, and algorithmic I Ching prophecies.
        </p>
      </div>

      <div className="terminal-wrapper">
        <div className="terminal-header">
          <div className="terminal-controls">
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
          </div>
          <div className="terminal-title">TECHNOCRACY_NITRR_OS v4.0.8 — [ONLINE]</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#888' }}>ENCRYPTED</div>
        </div>

        <div ref={bodyRef} id="terminal-body" className="terminal-body">
          {logs.map((log, index) => (
            <div key={index} className={`terminal-log-entry ${log.type}`}>
              <div dangerouslySetInnerHTML={{ __html: log.content }} />
            </div>
          ))}
        </div>

        <div className="terminal-quick-actions">
          {['about', 'aavartan', 'vigyaan', 'timeline', 'events', 'domains', 'oracle', 'balance', 'help', 'clear'].map((cmd) => (
            <button
              key={cmd}
              className="terminal-quick-btn interactive"
              onClick={() => handleCommand(cmd)}
            >
              {cmd}
            </button>
          ))}
        </div>

        <div className="terminal-input-row">
          <span className="terminal-prompt">technocrat@nitrr:~$</span>
          <input
            type="text"
            id="terminal-input"
            className="terminal-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (e.g. about, aavartan, vigyaan, timeline)..."
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </section>
  );
}

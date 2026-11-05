"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const phrases = [
  "Designing seamless user experiences.",
  "Building digital solutions.",
  "Exploring technology and creativity."
];

const projects = [
  { title: "Luna Finance", category: "Product design · Fintech", year: "2025", description: "A calm, confidence-building finance dashboard that turns complex money moments into clear next steps.", tech: ["Figma", "Design System", "Prototyping"], tone: "blue", no: "01" },
  { title: "Bloom Café", category: "Brand experience · Web", year: "2024", description: "A warm digital home for a neighborhood café, designed around discovery, community, and a little delight.", tech: ["UX Research", "UI Design", "Responsive Web"], tone: "rose", no: "02" },
  { title: "StudySphere", category: "Mobile app · EdTech", year: "2024", description: "A focused study companion that makes planning, peer learning, and progress feel beautifully achievable.", tech: ["User Flows", "Wireframes", "Usability Testing"], tone: "blue", no: "03" },
  { title: "Astro Portfolio", category: "Creative code · Personal", year: "2023", description: "An early exploration of turning a personal story into an interactive, navigable universe.", tech: ["HTML/CSS", "JavaScript", "Creative Direction"], tone: "gold", no: "04" }
];

const skillGroups = [
  { title: "Design Systems", icon: "✦", tone: "blue", skills: [["Figma", "Advanced", "Turning ideas into clear, scalable visual systems."], ["Prototyping", "Advanced", "Making interactions tangible before a line of code."], ["Design Thinking", "Advanced", "Balancing empathy, clarity, and possibility."]] },
  { title: "Development", icon: "⌘", tone: "rose", skills: [["HTML & CSS", "Advanced", "Crafting accessible, responsive foundations."], ["JavaScript", "Intermediate", "Adding thoughtful motion and behavior."], ["React / Next.js", "Learning", "Growing from interface to full experience."]] },
  { title: "Creative Practice", icon: "☾", tone: "gold", skills: [["Visual Storytelling", "Advanced", "Creating worlds people want to explore."], ["Brand Direction", "Intermediate", "Finding a distinct voice in every detail."], ["Communication", "Advanced", "Making complex things feel simple and human."]] }
];

function Stars() {
  const stars = useMemo(() => Array.from({ length: 68 }, (_, i) => ({ id: i, left: `${(i * 37) % 100}%`, top: `${(i * 61) % 100}%`, delay: `${(i % 9) * .6}s`, size: i % 4 === 0 ? 3 : 1 + (i % 2) })), []);
  return <div className="star-field" aria-hidden="true">{stars.map(s => <i key={s.id} style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }} />)}<span className="shooting-star one" /><span className="shooting-star two" /></div>;
}

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const [sound, setSound] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    const done = typed === phrase;
    const timer = window.setTimeout(() => {
      if (!deleting && !done) setTyped(phrase.slice(0, typed.length + 1));
      else if (!deleting && done) setDeleting(true);
      else if (deleting && typed) setTyped(phrase.slice(0, typed.length - 1));
      else { setDeleting(false); setPhraseIndex(i => (i + 1) % phrases.length); }
    }, done ? 1700 : deleting ? 30 : 62);
    return () => clearTimeout(timer);
  }, [typed, deleting, phraseIndex]);

  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach(el => { if (el.getBoundingClientRect().top < innerHeight * .86) el.classList.add("is-visible"); });
      const line = document.querySelector<HTMLElement>(".progress-line");
      if (line) line.style.width = `${(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100}%`;
    };
    reveal(); addEventListener("scroll", reveal, { passive: true }); return () => removeEventListener("scroll", reveal);
  }, []);

  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSent(true); };

  return <main>
    <div className="progress-track"><span className="progress-line" /><span className="progress-rocket">🚀</span></div>
    <Stars />
    <nav className="site-nav"><a className="wordmark" href="#top"><span className="wordmark-mark">✦</span>AGT<span className="muted-dot">.</span></a><div className="nav-links"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div><button className="sound-button" onClick={() => setSound(!sound)}><span className={sound ? "sound-bars active" : "sound-bars"}><b /><b /><b /></span>{sound ? "Sound on" : "Sound off"}</button></nav>

    <section className="hero shell" id="top"><div className="hero-copy reveal is-visible"><p className="eyebrow"><span className="eyebrow-line" /> A digital universe by Ashley</p><h1>QUEEN ASHLEY<br /><em>G. TOLEDO</em></h1><div className="hero-role"><span className="role-dot" />{typed}<span className="type-cursor">|</span></div><p className="hero-intro">I design and build thoughtful digital experiences where human needs meet a little cosmic wonder.</p><div className="hero-actions"><a className="button primary" href="#about">Explore My Universe <Arrow /></a><a className="button ghost" href="#projects">View Projects <Arrow /></a></div><a className="resume-link" href="#contact">Download Resume <span>↓</span></a></div><div className="hero-visual reveal is-visible"><div className="planet-orbit large"><div className="planet big" /></div><div className="planet-orbit small"><div className="planet little" /></div><div className="hero-glow" /><div className="hero-coordinate">14° 35&apos; 12&quot; N<br />120° 59&apos; 38&quot; E</div><div className="hero-caption">01 / THE BEGINNING</div></div><div className="scroll-cue"><span /> Scroll to explore</div></section>

    <section className="intro-band shell reveal"><span className="section-index">00 / 04</span><p>Every meaningful interaction begins with curiosity.<br /><strong>Let&apos;s make something worth remembering.</strong></p><span className="band-star">✦</span></section>

    <section className="content shell" id="about"><div className="section-heading reveal"><p className="eyebrow">01 / About me</p><h2>Grounded in purpose.<br /><em>Drawn to the stars.</em></h2></div><div className="about-grid"><div className="about-copy reveal"><p className="lead">I&apos;m Ashley — a UI/UX Designer and BS Information Technology student from the Philippines, turning ideas into interfaces that feel as good as they look.</p><p>My work lives at the intersection of empathy, visual storytelling, and technology. I love asking the right questions, finding the quiet details, and creating digital spaces that help people move through the world with more confidence.</p><p>Still learning, always exploring — I&apos;m on a mission to become the kind of developer who never loses sight of the human on the other side of the screen.</p></div><div className="timeline reveal"><div className="timeline-line" />{[["2023","First transmission","Started my BS Information Technology journey and discovered the joy of designing with code."],["2024","Finding my orbit","Deepened my practice in UI/UX, research, prototyping, and visual systems."],["2025","Building momentum","Creating purposeful projects and learning to turn concepts into polished experiences."],["2026","Next destination","Graduating, growing, and stepping into the world as a future web developer."]].map(([year,title,copy], i) => <div className="timeline-item" key={year}><span className="timeline-dot">{i + 1}</span><p className="timeline-year">{year}</p><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>

    <section className="content shell" id="skills"><div className="section-heading reveal"><p className="eyebrow">02 / Skills constellation</p><h2>A constellation of<br /><em>curiosity &amp; craft.</em></h2><p className="heading-note">Hover over a star to discover what I bring into orbit.</p></div><div className="skills-grid">{skillGroups.map(group => <div className="skill-card reveal" key={group.title}><div className={`skill-icon ${group.tone}`}>{group.icon}</div><h3>{group.title}</h3>{group.skills.map(([name, level, copy]) => <div className="skill-item" key={name}><div className="skill-name"><span>{name}</span><small>{level}</small></div><div className="skill-meter"><span style={{ width: level === "Advanced" ? "88%" : level === "Intermediate" ? "68%" : "45%" }} /></div><p>{copy}</p></div>)}</div>)}</div></section>

    <section className="project-section shell" id="projects"><div className="section-heading reveal"><p className="eyebrow">03 / Project galaxy</p><h2>Ideas that found<br /><em>their way to light.</em></h2><p className="heading-note">A selection of interfaces, identities, and experiments from my creative orbit.</p></div><div className="projects-grid">{projects.map(project => <button className={`project-card ${project.tone} reveal`} key={project.title} onClick={() => setSelected(project)}><div className="project-art"><span className="art-orbit" /><span className="art-core">{project.no}</span><span className="art-grid" /></div><div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div><h3>{project.title}</h3><p>{project.description}</p><span className="project-open">View case study <Arrow /></span></button>)}</div></section>

    <section className="credentials shell"><div className="credential-card reveal"><div className="badge-orbit"><div className="badge-planet">✦</div><span className="badge-ring" /></div><div><p className="eyebrow">Orbiting achievement</p><h2>Introduction to<br /><em>Cybersecurity</em></h2><p className="credential-copy">Cisco Networking Academy · 2024</p></div><a className="text-link" href="#contact">Verify achievement <Arrow /></a></div></section>

    <section className="content shell interests"><div className="section-heading reveal"><p className="eyebrow">A future in motion</p><h2>Career interests<br /><em>in orbit.</em></h2></div><div className="interest-orbit reveal"><span className="interest-center">ASHLEY</span><span className="interest i1">Web<br />Development</span><span className="interest i2">Product<br />Design</span><span className="interest i3">Creative<br />Technology</span><span className="interest i4">Human-Centered<br />Innovation</span></div></section>

    <section className="contact shell" id="contact"><div className="contact-copy reveal"><p className="eyebrow">04 / Mission control</p><h2>Have a signal<br /><em>to send?</em></h2><p>Whether you&apos;re building something new, imagining what&apos;s next, or just want to say hello — my inbox is always open.</p><div className="contact-details"><a href="mailto:ashleygtoledo@gmail.com">ashleygtoledo@gmail.com</a><a href="tel:+639123456789">+63 912 345 6789</a><span>Manila, Philippines</span></div><div className="social-links"><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://facebook.com/" target="_blank" rel="noreferrer">Facebook ↗</a></div></div><form className="contact-form reveal" onSubmit={submit}><label>Your name<input name="name" required placeholder="How should I call you?" /></label><label>Your email<input name="email" type="email" required placeholder="you@theuniverse.com" /></label><label>Your message<textarea name="message" required placeholder="Tell me what you&apos;re imagining..." rows={4} /></label><button className="button primary" type="submit">{sent ? "Transmission received ✓" : "Launch transmission"} <Arrow /></button></form></section>

    <footer className="site-footer shell"><a className="wordmark" href="#top"><span className="wordmark-mark">✦</span>AGT<span className="muted-dot">.</span></a><p>© 2025 Queen Ashley G. Toledo. Made with curiosity and a little cosmic dust.</p><a href="#top">Back to orbit ↑</a></footer>

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project details">×</button><div className={`modal-art ${selected.tone}`}><span>{selected.no}</span></div><p className="eyebrow">{selected.category} · {selected.year}</p><h2 id="modal-title">{selected.title}</h2><p>{selected.description}</p><h3>Process &amp; toolkit</h3><div className="tech-tags">{selected.tech.map(t => <span key={t}>{t}</span>)}</div><p className="modal-note">A thoughtful, research-led exploration from first sketch to final interaction.</p></div></div>}
  </main>;
}

"use client";

import { FormEvent, useEffect, useState } from "react";

const phrases = [
  "Designing seamless user experiences.",
  "Building digital solutions.",
  "Exploring technology and creativity."
];

const projects = [
  { title: "Vegetable Ordering System", category: "Desktop application · POS", year: "2025", description: "A Windows Forms ordering and point-of-sale system for managing produce sales, pricing, stock, and customer transactions.", tech: ["Visual Studio", "Windows Forms", "MySQL", "Barcode Generator"], features: ["Transaction History", "Sales Analytics", "Price Management", "Role-Based Access", "Order & POS System"], tone: "green", image: "/projects/vegetable-ordering-system.png", no: "01" },
  { title: "CliNexus", category: "Mobile app · Patient management", year: "2026", description: "A patient management app for a more connected dental-care journey, from registration and authentication to appointments and records.", tech: ["Kotlin", "Jetpack Compose", "Node.js", "Express.js", "MySQL", "REST APIs"], features: ["Appointment scheduling", "Dentist and service selection", "Chat and messaging", "Patient registration and authentication", "OTP verification", "File attachments", "Patient records and history"], tone: "navy", image: "/projects/clinexus.png", no: "02" },
  { title: "Memory Card Game", category: "Windows Forms application · Desktop", year: "2024", description: "Developed a desktop memory card game using C# and Windows Forms, implementing card matching mechanics and object-oriented programming concepts.", tech: ["C#", "Windows Forms", "Object-Oriented Programming", "Visual Studio"], features: ["Card matching mechanics", "Game state handling", "Score and progress logic", "Reusable object-oriented components"], tone: "blue", image: "", no: "03" },
  { title: "Web Development Projects", category: "Responsive web · Frontend", year: "2023—2026", description: "Created responsive web pages and interface experiments using HTML, CSS, JavaScript, React, and Next.js.", tech: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript"], features: ["Responsive layouts", "Interactive UI components", "Reusable React components", "Accessible page structure", "Mobile-first styling"], tone: "gold", image: "", no: "04" }
];

const skillGroups = [
  { title: "Programming", icon: "⌘", tone: "blue", skills: [["C# & C++", "Knowledgeable", "Object-oriented programming and Windows Forms application development."], ["Cybersecurity", "Foundational", "Understanding cybersecurity fundamentals and security best practices."], ["Networking", "Foundational", "Identifying common system and network vulnerabilities."]] },
  { title: "Security Practice", icon: "✦", tone: "rose", skills: [["Disaster Recovery", "Foundational", "Basic understanding of disaster recovery and business continuity planning."], ["IDS / IPS", "Foundational", "Familiar with security monitoring tools such as firewalls and IDS/IPS."], ["Access Control", "Foundational", "Knowledge of access control models including RBAC, DAC, and MAC."]] },
  { title: "Design Systems", icon: "☾", tone: "gold", skills: [["UI / UX Design", "Growing", "Turning ideas into clear, approachable digital experiences."], ["Visual Storytelling", "Growing", "Creating interfaces with personality and purpose."], ["Communication", "Strong", "Making complex technical ideas feel clear and human."]] }
];

function ThemeBackdrop() {
  return <div className="theme-backdrop" aria-hidden="true"><div className="backdrop-image swan" /><div className="backdrop-image flower" /><div className="backdrop-image water" /><span className="backdrop-grain" /></div>;
}

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
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
    <ThemeBackdrop />
    <nav className="site-nav"><a className="wordmark" href="#top"><span className="wordmark-mark">AG</span>ASHLEY<span className="muted-dot">.</span></a><div className="nav-links"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Work</a><a href="#contact">Contact</a></div><span className="nav-note">Selected work · 2023—2026</span></nav>

    <section className="hero shell" id="top"><div className="hero-copy reveal is-visible"><p className="eyebrow"><span className="eyebrow-line" /> Digital design · quiet details</p><h1>QUEEN ASHLEY<br /><em>G. TOLEDO</em></h1><div className="hero-role"><span className="role-dot" />{typed}<span className="type-cursor">|</span></div><p className="hero-intro">UI/UX Designer · BS Information Technology Student · Future Web Developer. I create calm, thoughtful digital experiences with clarity, character, and care.</p><div className="hero-actions"><a className="button primary" href="#about">Meet Ashley <Arrow /></a><a className="button ghost" href="#projects">View My Work <Arrow /></a></div><a className="resume-link" href="/resume.pdf" download>Download Resume <span>↓</span></a></div><div className="hero-visual reveal is-visible"><div className="hero-image-frame"><img src="/theme-swan.jpg" alt="Swan gliding across a deep blue lake" /></div><div className="hero-glow" /><div className="hero-coordinate">SAN ILDEFONSO<br />BULACAN, PH</div><div className="hero-caption">01 / A QUIET POINT OF VIEW</div></div><div className="scroll-cue"><span /> Scroll to explore</div></section>

    <section className="intro-band shell reveal"><span className="section-index">00 / 04</span><p>Good design gives people room to feel.<br /><strong>Let&apos;s make something worth remembering.</strong></p><span className="band-star">✦</span></section>

    <section className="content shell" id="about"><div className="section-heading reveal"><p className="eyebrow">01 / About me</p><h2>Grounded in purpose.<br /><em>Drawn to detail.</em></h2></div><div className="about-grid"><div className="about-copy reveal"><p className="lead">I&apos;m Ashley — a UI/UX Designer and BS Information Technology student at College of Our Lady of Mercy, turning ideas into interfaces that feel as good as they look.</p><p>My work lives at the intersection of empathy, visual storytelling, and technology. I love asking the right questions, finding the quiet details, and creating digital spaces that help people move through the world with more confidence.</p><p>Born January 20, 2005, I&apos;m from San Ildefonso, Bulacan. Still learning, always exploring — I&apos;m on a mission to become the kind of developer who never loses sight of the human on the other side of the screen.</p><div className="personal-facts"><span><b>Education</b>BS Information Technology<br />2023 — Present</span><span><b>Location</b>San Ildefonso, Bulacan<br />Philippines</span><span><b>Focus</b>Web development<br />Cybersecurity</span></div></div><div className="timeline reveal"><div className="timeline-line" />{[["2023","First transmission","Started my BS Information Technology journey at College of Our Lady of Mercy."],["2024","Finding my footing","Built a foundation in programming, cybersecurity, networking, and digital design."],["2025","Making things real","Creating purposeful projects and learning to turn concepts into polished experiences."],["2026","Next chapter","Graduating, growing, and stepping into the world as a future web developer."]].map(([year,title,copy], i) => <div className="timeline-item" key={year}><span className="timeline-dot">{i + 1}</span><p className="timeline-year">{year}</p><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>

    <section className="content shell" id="skills"><div className="section-heading reveal"><p className="eyebrow">02 / Skills</p><h2>A practice shaped by<br /><em>curiosity &amp; craft.</em></h2><p className="heading-note">Hover over each area to see the details behind my work.</p></div><div className="skills-grid">{skillGroups.map(group => <div className="skill-card reveal" key={group.title}><div className={`skill-icon ${group.tone}`}>{group.icon}</div><h3>{group.title}</h3>{group.skills.map(([name, level, copy]) => <div className="skill-item" key={name}><div className="skill-name"><span>{name}</span><small>{level}</small></div><div className="skill-meter"><span style={{ width: level === "Strong" || level === "Knowledgeable" ? "82%" : level === "Growing" ? "64%" : "48%" }} /></div><p>{copy}</p></div>)}</div>)}</div></section>

    <section className="project-section shell" id="projects"><div className="section-heading reveal"><p className="eyebrow">03 / Selected work</p><h2>Ideas made<br /><em>to feel useful.</em></h2><p className="heading-note">Tap a project to reveal its interface and technical story.</p></div><div className="projects-grid">{projects.map(project => <button className={`project-card ${project.tone} reveal`} key={project.title} onClick={() => setSelected(project)}><div className="project-art project-art-placeholder"><span className="art-orbit" /><span className="art-core">{project.no}</span><span className="art-grid" /><span className="art-label">Open project</span></div><div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div><h3>{project.title}</h3><p>{project.description}</p><span className="project-open">View case study <Arrow /></span></button>)}</div></section>

    <section className="credentials shell"><div className="credential-card reveal"><div className="badge-orbit"><div className="badge-planet">✦</div><span className="badge-ring" /></div><div><p className="eyebrow">Featured certificate</p><h2>Introduction to<br /><em>Cybersecurity</em></h2><p className="credential-copy">Cisco Networking Academy · Certificate</p></div><a className="text-link" href="/certificates/introduction-to-cybersecurity.pdf" target="_blank" rel="noreferrer">View certificate <Arrow /></a></div><div className="credential-card secondary reveal"><div className="badge-orbit"><div className="badge-planet">⌘</div><span className="badge-ring" /></div><div><p className="eyebrow">Technical certificate</p><h2>Hardware and<br /><em>Upgrade Support</em></h2><p className="credential-copy">Certificate of completion</p></div><a className="text-link" href="/certificates/hardware-upgrade-support.pdf" target="_blank" rel="noreferrer">View certificate <Arrow /></a></div></section>

    <section className="content shell interests"><div className="section-heading reveal"><p className="eyebrow">A future in motion</p><h2>Career interests<br /><em>with intention.</em></h2></div><div className="interest-orbit reveal"><span className="interest-center">AGT</span><span className="interest i1">Web<br />Development</span><span className="interest i2">Product<br />Design</span><span className="interest i3">Creative<br />Technology</span><span className="interest i4">Human-Centered<br />Innovation</span></div></section>

    <section className="contact shell" id="contact"><div className="contact-copy reveal"><p className="eyebrow">04 / Contact</p><h2>Have something<br /><em>to say?</em></h2><p>Whether you&apos;re building something new, imagining what&apos;s next, or just want to say hello — my inbox is always open.</p><div className="contact-details"><a href="mailto:queentoledo09@gmail.com">queentoledo09@gmail.com</a><a href="tel:+639283023454">0928 302 3454</a><span>San Ildefonso, Bulacan, Philippines</span></div><div className="social-links"><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://facebook.com/" target="_blank" rel="noreferrer">Facebook ↗</a></div></div><form className="contact-form reveal" onSubmit={submit}><label>Your name<input name="name" required placeholder="How should I call you?" /></label><label>Your email<input name="email" type="email" required placeholder="you@email.com" /></label><label>Your message<textarea name="message" required placeholder="Tell me what you&apos;re imagining..." rows={4} /></label><button className="button primary" type="submit">{sent ? "Message sent ✓" : "Send message"} <Arrow /></button></form></section>

    <footer className="site-footer shell"><a className="wordmark" href="#top"><span className="wordmark-mark">AG</span>ASHLEY<span className="muted-dot">.</span></a><p>© 2025 Queen Ashley G. Toledo. Designed with intention and a little blue.</p><a href="#top">Back to top ↑</a></footer>

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project details">×</button><div className={`modal-art ${selected.tone}`}>{selected.image ? <img src={selected.image} alt={`${selected.title} project screenshot`} /> : <span>{selected.no}</span>}</div><p className="eyebrow">{selected.category} · {selected.year}</p><h2 id="modal-title">{selected.title}</h2><p>{selected.description}</p><h3>Technology</h3><div className="tech-tags">{selected.tech.map(t => <span key={t}>{t}</span>)}</div><h3>Features</h3><div className="feature-tags">{selected.features?.map(feature => <span key={feature}>{feature}</span>)}</div><p className="modal-note">Select a project card to view its screenshot, stack, and feature overview.</p></div></div>}
  </main>;
}

"use client";

import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useState } from "react";

const phrases = [
  "Exploring technology and creativity."
];

const projects = [
  { title: "Vegetable Ordering System", category: "UI/UX Design · Ordering system", year: "2025", description: "Designed the user interface and experience for a vegetable ordering system, with a focus on usability, accessibility, and clear navigation. Also contributed to coding and keeping the SQL database manageable.", tech: ["Visual Studio", "SQL", "Database Management", "Software Developer"], features: ["Usability-focused layouts", "Accessible interface choices", "Clear navigation"], tone: "green", image: "", screenshots: ["/vegetable-dashboard.png", "/vegetable-order.jpg", "/vegetable-transactions.jpg", "/vegetable-receipt.png"], no: "01" },
  { title: "Dental Clinic Patient Management Mobile Application",
  category: "Team Project · Mobile Application",
  year: "2026",
  description: "Collaborated with a team to develop a dental clinic mobile application, contributing to UI design, feature planning, and system testing.",
  tech: ["Jetpack Compose", "Node.js", "Express.js", "MySQL", "REST APIs"],
  features: [
    "Patient Registration and Authentication",
    "Appointment Scheduling",
    "Appointment Rescheduling and Cancellation",
    "Dentist and Service Selection",
    "Messaging System",
    "Attachments",
    "Patient Records Management"
  ],
  tone: "navy",
  image: "",
  screenshots: ["/projects/clinexus1.jpg"],
  no: "02"
},
  { title: "Memory Card Game", category: "Windows Forms application · Desktop", year: "2024", description: "Developed a desktop memory card game using C# and Windows Forms, implementing card-matching mechanics and object-oriented programming concepts.", tech: ["C#", "Windows Forms", "Object-Oriented Programming"], features: ["Card-matching mechanics", "Desktop application development", "Points and Levels"], tone: "blue", image: "", screenshots: [], no: "03" },
  { title: "Web Development Projects", category: "Responsive web · Frontend", year: "2023—2026", description: "Created responsive web pages using HTML and CSS.", tech: ["HTML", "CSS", "JavaScript"], features: ["Responsive web pages", "Website development"], tone: "gold", image: "", screenshots: [], no: "04" }
];

const skillGroups = [
  { title: "Design & Communication", icon: "☾", tone: "gold", skills: [["UX/UI Design", "Growing", "Designing clear, user-friendly digital experiences."], ["Communication Skills", "Strong", "Collaborating and sharing ideas clearly." ]] },
  { title: "Development", icon: "⌘", tone: "blue", skills: [["Website and Application Development", "Growing", "Creating responsive websites and contributing to application projects."], ["Database Management (SQL)", "Foundational", "Foundational knowledge of SQL and database management." ]] },
  { title: "Information Technology", icon: "✦", tone: "rose", skills: [["Information Security", "Foundational", "Foundational knowledge of cybersecurity and information security."], ["Basic Networking", "Foundational", "Understanding basic networking concepts." ]] }
];

const exploreTabs = [
  { id: "skills", label: "Skills", number: "01", detail: "Areas I work in" },
  { id: "projects", label: "Projects", number: "02", detail: "Selected work" },
  { id: "certifications", label: "Certification", number: "03", detail: "Learning in practice" },
  { id: "tools", label: "Tech Stack", number: "04", detail: "Tools I use" }
] as const;

const certificates = [
  { title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", type: "Featured certificate", image: "/certificates/introduction-to-cybersecurity.png", pdf: "/certificates/introduction-to-cybersecurity.pdf", icon: "✦" },
  { title: "Hardware and Upgrade Support", issuer: "DICT-ITU DTC Initiative", type: "Technical certificate", image: "/certificates/hardware-upgrade-support.png", pdf: "/certificates/hardware-upgrade-support.pdf", icon: "⌘" }
] as const;

function ThemeBackdrop() {
  return <div className="theme-backdrop" aria-hidden="true"><div className="backdrop-image swan" /><div className="backdrop-image flower" /><div className="backdrop-image water" /><div className="backdrop-image cosmos" /><span className="backdrop-grain" /></div>;
}

const Arrow = () => <span aria-hidden="true">↗</span>;

const trackPointer = (event: ReactPointerEvent<HTMLElement>) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
};

export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const [projectImageIndex, setProjectImageIndex] = useState(0);
  const [sent, setSent] = useState(false);
  const [portraitPulse, setPortraitPulse] = useState(0);
  const [exploreTab, setExploreTab] = useState<(typeof exploreTabs)[number]["id"]>("skills");
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[number] | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

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
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle("is-visible", entry.isIntersecting));
    }, { threshold: 0.08, rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll<HTMLElement>(".reveal").forEach(el => revealObserver.observe(el));
    const reveal = () => {
      const line = document.querySelector<HTMLElement>(".progress-line");
      const progress = Math.min(100, (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100);
      if (line) line.style.width = `${progress}%`;
      document.documentElement.style.setProperty("--progress", `${progress}%`);
      document.documentElement.style.setProperty("--scroll-parallax-y", `${Math.max(-90, -scrollY * .035)}px`);
    };
    reveal(); addEventListener("scroll", reveal, { passive: true });
    return () => { removeEventListener("scroll", reveal); revealObserver.disconnect(); };
  }, []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const subject = `Portfolio message from ${formData.get("name")}`;
    const body = `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`;
    window.location.href = `mailto:queenntoledo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return <main>
    <div className="progress-track"><span className="progress-line" /><span className="progress-rocket">🚀</span></div>
    <ThemeBackdrop />
    <nav className="site-nav" aria-label="Main navigation"><a className="wordmark" href="#top"><span className="wordmark-mark">AG</span>ASHY<span className="muted-dot">.</span></a><div className="nav-links"><a href="#top">Home</a><a href="#about">About</a><a href="#explore" onClick={() => setExploreTab("skills")}>Expertise</a><a href="#explore" onClick={() => setExploreTab("projects")}>Projects</a><a href="#explore" onClick={() => setExploreTab("tools")}>Tech Stack</a><a href="#explore" onClick={() => setExploreTab("certifications")}>Certifications</a><a href="#resume">Resume</a><a href="#contact">Connect</a></div></nav>

    <section className="hero shell" id="top"><div className="hero-copy reveal is-visible"><p className="eyebrow"><span className="eyebrow-line" /> An eye for detail, a mind for systems.</p><h1>QUEEN ASHLEY<br /><em>G. TOLEDO</em></h1><div className="hero-role"><span className="role-dot" />{typed}<span className="type-cursor">|</span></div><p className="hero-intro">UI/UX Designer • BS Information Technology Student • Aspiring Software Developer</p><p className="hero-support">Guided by curiosity and driven by creation, I explore the intersection of design, technology, and innovation.</p><div className="hero-actions"><a className="button primary" href="#about">Meet Ashy <Arrow /></a><a className="button ghost" href="#explore" onClick={() => setExploreTab("projects")}>View My Work <Arrow /></a></div></div><div className="hero-visual reveal is-visible"><button className={`hero-image-frame${portraitPulse ? " is-pulsing" : ""}`} type="button" aria-label="Replay profile photo animation" onClick={() => setPortraitPulse(value => value + 1)}><span className={`portrait-image-wrap${portraitPulse ? " is-pulsing" : ""}`} key={portraitPulse}><img src="/profile.jpg" alt="Ashy Toledo" /></span><span className="portrait-corner-glow" key={`portrait-corners-${portraitPulse}`} aria-hidden="true"><i className="corner-tl" /><i className="corner-tr" /><i className="corner-bl" /><i className="corner-br" /></span></button><div className="hero-glow" /></div><div className="scroll-cue"><span /> Scroll to explore</div></section>

    <section className="content shell" id="about"><div className="section-heading reveal"><p className="eyebrow">01 / About me</p><h2 className="about-title">Exploring the intersection <em>of creativity and technology.</em></h2></div><div className="about-grid"><div className="about-copy reveal"><p className="lead">Hi, I&apos;m Ashy, a fourth-year Information Technology student with a passion for UI/UX design, software development, and cybersecurity.</p><p>I enjoy exploring emerging technologies, solving complex problems, and transforming ideas into functional digital solutions. By combining creativity with technical knowledge, I approach challenges from both design and development perspectives.</p><p>This portfolio showcases my projects, skills, certifications, and experiences throughout my journey in technology, highlighting my continuous growth, adaptability, and commitment to learning and innovation.</p><div className="personal-facts"><span><b>Education</b>Fourth-year BS Information Technology</span><span><b>Focus</b>Design · Development<br />Cybersecurity</span><span><b>Approach</b>Creative &amp; technical</span></div></div><div className="about-visual reveal" role="img" aria-label="Animated celestial design illustration"><div className="about-visual-glow" /><div className="about-orbit orbit-one"><span className="orbit-spark">✦</span><i className="orbit-satellite" /></div><div className="about-orbit orbit-two"><span className="orbit-node" /><i className="orbit-satellite satellite-two" /></div><div className="about-orbit orbit-three" /><span className="about-star star-a" aria-hidden="true">✦</span><span className="about-star star-b" aria-hidden="true">✧</span><span className="about-star star-c" aria-hidden="true">·</span><span className="about-star star-d" aria-hidden="true">✦</span><span className="about-comet comet-one" aria-hidden="true" /><span className="about-comet comet-two" aria-hidden="true" /><div className="about-core"><span>ASHY</span><small>DESIGN × TECHNOLOGY</small></div></div></div></section>

    <section className="explore-hub shell" id="explore" aria-labelledby="quick-jump-title">
      <div className="quick-jump-heading reveal"><p className="eyebrow">Explore my portfolio</p><h2 id="quick-jump-title">Choose a path.<br /><em>Stay right here.</em></h2></div>
      <div className="quick-jump-grid" role="group" aria-label="Portfolio content">
        {exploreTabs.map((item, i) => <button className={`quick-jump-card quick-jump-${item.id}${exploreTab === item.id ? " is-active" : ""}`} key={item.id} id={`explore-tab-${item.id}`} type="button" aria-pressed={exploreTab === item.id} aria-controls="explore-panel" onClick={() => setExploreTab(item.id)} style={{ animationDelay: `${i * 90}ms` }}><span className="quick-jump-number">{item.number}</span><span className="quick-jump-copy"><strong>{item.label}</strong><small>{item.detail}</small></span><span className="quick-jump-arrow" aria-hidden="true">{exploreTab === item.id ? "✦" : "↘"}</span></button>)}
      </div>
      <div className="explore-panel" id="explore-panel" aria-live="polite" aria-labelledby={`explore-tab-${exploreTab}`}>
        {exploreTab === "skills" && <div className="explore-panel-content" key="skills"><div className="hub-panel-heading"><p className="eyebrow">02 / Expertise</p><h3>A practice shaped by <em>curiosity &amp; craft.</em></h3></div><div className="skills-grid">{skillGroups.map(group => <div className="skill-card is-visible" key={group.title} onPointerMove={trackPointer}><div className={`skill-icon ${group.tone}`}>{group.icon}</div><h3>{group.title}</h3>{group.skills.map(([name, level, copy]) => <div className="skill-item" key={name}><div className="skill-name"><span>{name}</span><small>{level}</small></div><div className="skill-meter"><span style={{ width: level === "Strong" || level === "Knowledgeable" ? "82%" : level === "Growing" ? "64%" : "48%" }} /></div><p>{copy}</p></div>)}</div>)}</div></div>}
        {exploreTab === "projects" && <div className="explore-panel-content" key="projects"><div className="hub-panel-heading"><p className="eyebrow">03 / Selected work</p><h3>Ideas made to <em>feel useful.</em></h3></div><div className="projects-grid">{projects.map(project => <button className={`project-card ${project.tone}`} key={project.title} onClick={() => { setProjectImageIndex(0); setSelected(project); }} aria-label={`View ${project.title} project details`}><div className={`project-art ${project.image ? "has-project-image" : "project-art-concept"}`}>{project.image ? <img src={project.image} alt={`${project.title} preview`} /> : <><span className="concept-orbit" /><span className="concept-index">{project.no} <i>/ 04</i></span><span className="concept-title">{project.title}</span><span className="concept-caption">{project.category}</span></>}</div></button>)}</div></div>}
        {exploreTab === "certifications" && <div className="explore-panel-content" key="certifications"><div className="hub-panel-heading"><p className="eyebrow">05 / Certifications</p><h3>Learning in <em>practice.</em></h3></div>{certificates.map(certificate => <div className="credential-card" key={certificate.title}><div className="badge-orbit"><div className="badge-planet">{certificate.icon}</div><span className="badge-ring" /></div><div><p className="eyebrow">{certificate.type}</p><h2>{certificate.title}</h2><p className="credential-copy">{certificate.issuer}</p></div><button className="text-link certificate-open" type="button" onClick={() => setSelectedCertificate(certificate)}>View certificate <Arrow /></button></div>)}</div>}
        {exploreTab === "tools" && <div className="explore-panel-content" key="tools"><div className="hub-panel-heading"><p className="eyebrow">04 / Tech Stack</p><h3>Tools I use to <em>bring ideas to life.</em></h3></div><div className="tools-grid">{[{name:"Figma",mark:"F",logo:"figma"},{name:"Adobe Photoshop",mark:"Ps",logo:"photoshop"},{name:"Canva",mark:"C",logo:"canva"},{name:"Visual Studio Code",mark:"〈/〉",logo:"vscode"},{name:"Android Studio",mark:"A",logo:"android"},{name:"MySQL",mark:"DB",logo:"mysql"},{name:"PHP",mark:"php",logo:"php"},{name:"Kotlin",mark:"K",logo:"kotlin"},{name:"GitHub/Git",mark:"Git",logo:"git"}].map((tool, i) => <div className="tool-chip is-visible" key={tool.name} style={{ animationDelay: `${i * 80}ms` }}><span className={`tool-logo ${tool.logo}`} aria-hidden="true">{tool.mark}</span>{tool.name}</div>)}</div></div>}
      </div>
    </section>
    <section className="resume-section shell" id="resume"><div className="resume-panel reveal"><div className="resume-mark" aria-hidden="true"><span>AG</span><i /></div><div className="resume-copy"><p className="eyebrow">06 / Resume</p><h2>A closer look at<br /><em>my experience.</em></h2><p>Explore my education, projects, skills, and certifications in one place.</p></div><div className="resume-actions"><button className="button primary" type="button" onClick={() => setResumeOpen(true)}>View resume <Arrow /></button></div></div></section>

    <section className="contact shell" id="contact"><div className="contact-copy reveal"><p className="eyebrow">07 / Connect</p><h2>Have something<br /><em>to say?</em></h2><p>Whether you&apos;re building something new, imagining what&apos;s next, or just want to say hello — my inbox is always open.</p><div className="contact-details"><a href="mailto:queenntoledo@gmail.com">queenntoledo@gmail.com</a><a href="tel:+639283023454">0928 302 3454</a><span>San Ildefonso, Bulacan, Philippines</span></div><div className="social-links"><a href="https://github.com/ashytoledo" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/queen-toledo-5b8732434/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.facebook.com/ashy.toledo.2025" target="_blank" rel="noreferrer">Facebook ↗</a></div></div><form className="contact-form reveal" onSubmit={submit}><label className="contact-field" onPointerMove={trackPointer}>Your name<input name="name" required placeholder="How should I call you?" /></label><label className="contact-field" onPointerMove={trackPointer}>Your email<input name="email" type="email" required placeholder="you@email.com" /></label><label className="contact-field" onPointerMove={trackPointer}>Your message<textarea name="message" required placeholder="Tell me what you&apos;re imagining..." rows={4} /></label><button className="button primary" type="submit">{sent ? "Open email app again" : "Send message"} <Arrow /></button>{sent && <p className="modal-note" role="status">Your email app should open with your message ready. Press Send there to deliver it.</p>}</form></section>

    <footer className="site-footer shell"><a className="wordmark" href="#top"><span className="wordmark-mark">AG</span>ASHY<span className="muted-dot">.</span></a><p>© 2025 Ashy G. Toledo.</p><a href="#top">Back to top ↑</a></footer>

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project details">×</button>{selected.screenshots.length > 0 ? <div className="project-carousel" role="region" aria-label="Vegetable Ordering System screenshots"><div className={`modal-art project-carousel-art ${selected.tone}`}><img src={selected.screenshots[projectImageIndex]} alt={`${selected.title} screenshot ${projectImageIndex + 1} of ${selected.screenshots.length}`} /></div><div className="carousel-controls"><button type="button" className="carousel-arrow" onClick={() => setProjectImageIndex(index => (index - 1 + selected.screenshots.length) % selected.screenshots.length)}>← Previous</button><span aria-live="polite">{projectImageIndex + 1} / {selected.screenshots.length}</span><button type="button" className="carousel-arrow" onClick={() => setProjectImageIndex(index => (index + 1) % selected.screenshots.length)}>Next →</button></div></div> : <div className={`modal-art ${selected.tone}`}>{selected.image ? <img src={selected.image} alt={`${selected.title} project screenshot`} /> : <span>{selected.no}</span>}</div>}<p className="eyebrow">{selected.category} · {selected.year}</p><h2 id="modal-title">{selected.title}</h2><p>{selected.description}</p><h3>Technology</h3><div className="tech-tags">{selected.tech.map(t => <span key={t}>{t}</span>)}</div><h3>Features</h3><div className="feature-tags">{selected.features?.map(feature => <span key={feature}>{feature}</span>)}</div></div></div>}
    {selectedCertificate && <div className="modal-backdrop certificate-backdrop" onClick={() => setSelectedCertificate(null)}><div className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-title" onClick={event => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setSelectedCertificate(null)} aria-label="Close certificate preview">×</button><p className="eyebrow">Certificate preview</p><h2 id="certificate-title">{selectedCertificate.title}</h2><img className="certificate-image" src={selectedCertificate.image} alt={`${selectedCertificate.title} certificate awarded to Queen Ashley Toledo`} /></div></div>}
    {resumeOpen && <div className="modal-backdrop resume-preview-backdrop" onClick={() => setResumeOpen(false)}><div className="resume-image-modal" role="dialog" aria-modal="true" aria-label="Resume preview" onClick={event => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setResumeOpen(false)} aria-label="Close resume preview">×</button><img src="/resume-preview.png" alt="Queen Ashley G. Toledo resume" /></div></div>}
  </main>;
}

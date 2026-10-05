import { useCallback, useRef, useState } from 'react';
import Navbar from './components/Navbar/navbar';
import Intro from './components/Intro/intro';
import TextGenerate from './components/TextGenerate/text';
import Footer from './components/Footer/footer';
import Projects from './components/Projects/projects';
import Experience from './components/Experience/experience';
import Contact from './components/Contact/contact';
import PondExperience from './components/ImmersivePond/PondExperience';
import './pond-design.css';

const approach = [
  ['Understand', 'Start with people, their needs, and the context behind the problem.'],
  ['Explore', 'Map the journey, sketch possibilities, and make ideas tangible.'],
  ['Build', 'Bring thoughtful details together in prototypes and working interfaces.'],
  ['Refine', 'Listen to feedback, question assumptions, and keep improving.'],
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [contactOpen, setContactOpen] = useState(false);
  const contactTrigger = useRef(null);
  const closeContact = useCallback(() => setContactOpen(false), []);
  const openContact = (trigger) => { contactTrigger.current = trigger; setContactOpen(true); };
  const [pondOpen, setPondOpen] = useState(false);
  const pondTrigger = useRef(null);
  const closePond = useCallback(() => setPondOpen(false), []);
  return (
    <div className="pond-site" data-theme={theme}>
      <a className="skip-link" href="#projects-title">Skip to selected work</a>
      <Navbar theme={theme} onThemeChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} onContactOpen={openContact} />
      <main>
        <TextGenerate onPondOpen={(trigger) => { pondTrigger.current = trigger; setPondOpen(true); }} />
        <Projects />
        <Intro />
        <section className="approach-section" aria-labelledby="approach-title">
          <h2 id="approach-title" className="section-label">{'// my approach'}</h2>
          <p className="approach-lead">I bring a designer’s curiosity and a developer’s perspective to the same question: how can this work better for people?</p>
          <div className="approach-steps">{approach.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </section>
        <div className="experience-section"><Experience /></div>
        <Footer />
      </main>
      {contactOpen && <Contact theme={theme} onClose={closeContact} returnFocusRef={contactTrigger} />}
      {pondOpen && <PondExperience onClose={closePond} returnFocusRef={pondTrigger} />}
    </div>
  );
}

import {useEffect, useRef, useState} from 'react';
import {House, FolderSimple, Briefcase, Envelope} from '@phosphor-icons/react';
import Projects from './components/Projects/projects';
import Contact from './components/Contact/contact';
import PondBackground from './components/PondBackground';
import './case-study-design.css';
import './night-portfolio.css';

const sections = [['home', 'About', House], ['projects', 'Projects', FolderSimple], ['work', 'Experience', Briefcase], ['contact', 'Contact', Envelope]];
const readPage = () => {
 const value = window.location.hash.slice(1).split('/')[0];
 return value === 'project-journal' ? 'projects' : sections.some(([id]) => id === value) ? value : 'home';
};
const roles = [
 ['Raia', 'UI/UX Design & AI Product Development', '', 'Design UI/UX for raia Clarity, a client-facing platform for viewing and tracking AI agents.', [
 'Test new features and agent workflows, reporting usability issues to the product team.',
 'Refine agent experiences based on user and team feedback.',
 'Build custom web interfaces connected to raia AI agents.',
 ]],
 ['Esri', 'Frontend Software Development Intern', 'May – August 2026', 'Translated telecom engineer feedback into 10+ Figma screens and shipped ArcGIS interface improvements in React and TypeScript.'],
 ['TechSol', 'Technical Writer', 'January – September 2026', 'Redesigned documentation experiences supporting 7,000+ users and improved 30+ guides and support resources.'],
 ['EduTrend', 'Product Design Intern', 'December 2025 – March 2026', 'Designed responsive interfaces, built reusable components, and worked with engineers to bring design intent into React.'],
];

export default function App() {
 const [page, setPage] = useState(readPage);
 const content = useRef(null);
 useEffect(() => {
  const navigate = () => {setPage(readPage()); content.current?.scrollTo?.(0, 0);};
  window.addEventListener('hashchange', navigate);
  return () => window.removeEventListener('hashchange', navigate);
 }, []);
 useEffect(() => {document.title = 'Lynette Hemingway | ' + sections.find(([id]) => id === page)[1];}, [page]);
 return <div className="night-portfolio pixel-universe">
  <PondBackground/>
  <a className="skip-link" href="#main-content">Skip to content</a>
  <header className="site-header"><a href="#home" className="site-name" aria-label="Lynette home">lynette</a>
   <nav aria-label="Main navigation">{sections.map(([id,label,Icon]) => <a key={id} href={'#'+id} aria-current={page===id?'page':undefined}><Icon className="nav-icon" size={22} weight={page===id?'fill':'regular'} aria-hidden="true"/><span>{label}</span></a>)}</nav>
  </header>
  <main id="main-content" ref={content} className={'site-main page-'+page} tabIndex={-1} key={page}>
   {page==='home' && <section className="about-view">
    <div className="about-copy"><p className="intro-line">CS @ UF · studying product design</p><h1>Lynette<br/>Hemingway<span>.</span></h1><p className="about-description">a designer who engineers</p><a className="work-link" href="#projects">View selected work <span aria-hidden="true">↗</span></a></div>
    <figure className="about-portrait"><img src="/lynette-pixel-portrait.png" alt="Pixel portrait of Lynette"/></figure>

   </section>}
   {page==='projects' && <Projects theme="dark"/>}
   {page==='work' && <section className="experience-view"><header className="section-intro"><p>Where I've been</p><h1>Work experience<span>.</span></h1></header><div className="role-list">{roles.map(([company,role,dates,description,highlights]) => <article className="role-entry" key={company}><div className="role-company"><h2>{company}</h2>{dates && <p>{dates}</p>}</div><div className="role-description">{role && <h3>{role}</h3>}{description && <p>{description}</p>}{highlights && <ul className="role-highlights">{highlights.map(item => <li key={item}>{item}</li>)}</ul>}</div></article>)}</div></section>}
   {page==='contact' && <Contact/>}
  </main>
 </div>;
}

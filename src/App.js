import {lazy, Suspense, useEffect, useRef, useState} from 'react';
import {List, X} from '@phosphor-icons/react';
import AsciiAtmosphere from './components/AsciiAtmosphere';
import TypewriterName from './components/TypewriterName';
import './figma-design.css';
import './case-study-design.css';
import './projects-editorial.css';
import './work-design.css';
import './starfield-design.css';

const Projects = lazy(() => import('./components/Projects/projects'));
const Experience = lazy(() => import('./components/Experience/experience'));
const Contact = lazy(() => import('./components/Contact/contact'));
const pages = ['home', 'projects', 'work', 'contact'];
const readPage = () => {
  const value = window.location.hash.slice(1);
  return [...pages, 'project-journal'].includes(value) ? value : 'home';
};

export default function App() {
  const [page, setPage] = useState(readPage);
  const [menuOpen, setMenuOpen] = useState(false);
  const heading = useRef(null);
  const menuButton = useRef(null);
  useEffect(() => {
    document.documentElement.dataset.portfolioTheme = 'dark';
    document.documentElement.classList.add('atmosphere-active');
    return () => document.documentElement.classList.remove('atmosphere-active');
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('portfolio-home-active', page === 'home');
    document.title = `Lynette Hemingway | ${page === 'home' ? 'Product Designer' : page}`;
    return () => document.documentElement.classList.remove('portfolio-home-active');
  }, [page]);
  useEffect(() => {
    const navigate = () => {setPage(readPage()); setMenuOpen(false); window.scrollTo(0, 0);};
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  const closeMenu = event => {
    if (event.key === 'Escape') {setMenuOpen(false); menuButton.current?.focus();}
  };
  const pageClass = page === 'project-journal' ? 'projects' : page;
  return <div className={`pond-site figma-site atmosphere-site figma-site--${pageClass}`} data-theme="dark">
    <AsciiAtmosphere />
    <button ref={menuButton} className="sky-menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="portfolio-navigation" onClick={() => setMenuOpen(value => !value)} onKeyDown={closeMenu}>{menuOpen ? <X size={26} /> : <List size={26} />}</button>
    <aside className={`portfolio-sidebar${menuOpen ? ' is-open' : ''}`} onKeyDown={closeMenu}>
      <nav id="portfolio-navigation" aria-label="Main navigation" onClick={() => setMenuOpen(false)}>{pages.filter(item => page !== 'home' || item !== 'home').map(item => <a key={item} href={`#${item}`} aria-label={item[0].toUpperCase() + item.slice(1)} aria-current={(page === item || (page === 'project-journal' && item === 'projects')) ? 'page' : undefined}><span>{item}</span><span className="nav-direction" aria-hidden="true">↗</span></a>)}</nav>
    </aside>
    <main id="page-content" className={`portfolio-page portfolio-page--${pageClass}`} ref={heading} tabIndex={-1} key={page}>
      {page === 'home' && <div className="home-scene starfield-home">
        <div className="starfield-identity"><TypewriterName /><p className="starfield-role">Product Designer</p></div>
      </div>}
      <Suspense fallback={<div className="portfolio-loading" role="status">Loading...</div>}>
        {(page === 'projects' || page === 'project-journal') && <Projects theme="dark" archive={page === 'project-journal'} />}
        {page === 'work' && <><header className="work-page-heading"><h1>My work</h1><p>experience / 2025–2026</p></header><Experience /></>}
        {page === 'contact' && <Contact />}
      </Suspense>
    </main>
    <footer className="portfolio-copyright">© 2026 Lynette Hemingway</footer>

  </div>;
}

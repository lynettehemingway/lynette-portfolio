import { useEffect, useRef, useState } from 'react';
import Projects from './components/Projects/projects';
import Experience from './components/Experience/experience';
import Contact from './components/Contact/contact';
import mascot from './assets/figma/mascot 1 (1).png';
import home from './assets/new design/home 1.png';
import projectsIcon from './assets/new design/about 1.png';
import work from './assets/new design/work 1.png';
import contact from './assets/new design/contact 1.png';
import koi from './assets/new design/koilh-transparent.png';
import esri from './assets/figma/esri.png';
import './pond-design.css';
import './board-design.css';
import './figma-design.css';
import './case-study-design.css';
import './projects-editorial.css';
import './work-design.css';

const pages = ['home', 'projects', 'work', 'contact'];
const readPage = () => { const value = window.location.hash.slice(1); return [...pages, 'project-journal'].includes(value) ? value : 'home'; };

function TypingGreeting() {
  const text = 'hello, i’m lynette.';
  const [count, setCount] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? text.length : 0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let index = 0;
    const timer = window.setInterval(() => { index += 1; setCount(index); if (index >= text.length) window.clearInterval(timer); }, 95);
    return () => window.clearInterval(timer);
  }, []);
  return <h1 className="portfolio-greeting"><span className="sr-only">{text}</span><span className="typing-reserve" aria-hidden="true">hello, i’m <span>lynette.</span></span><span className="typing-visible" aria-hidden="true">{text.slice(0, Math.min(count, 11))}<span>{text.slice(11, count)}</span><i className="typing-caret" /></span></h1>;
}

export default function App() {
  const [page, setPage] = useState(readPage);
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'; } catch { return 'light'; } });
  useEffect(() => {
    document.documentElement.dataset.portfolioTheme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Storage may be unavailable in private browsing. */ }
  }, [theme]);
  useEffect(() => {
    document.documentElement.classList.toggle('portfolio-home-active', page === 'home');
    return () => document.documentElement.classList.remove('portfolio-home-active');
  }, [page]);
  const heading = useRef(null);
  const homeScene = useRef(null);
  useEffect(() => {
    const navigate = () => { setPage(readPage()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  useEffect(() => { document.title = `Lynette Hemingway — ${page}`; }, [page]);
  useEffect(() => {
    if (page !== 'home') return undefined;
    const fit = () => {
      const scene = homeScene.current;
      const main = heading.current;
      if (!scene || !main) return;
      const styles = getComputedStyle(main);
      const available = main.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
      main.style.setProperty('--home-scale', Math.min(1, available / Math.max(1, scene.offsetHeight)));
    };
    const observer = new ResizeObserver(fit);
    observer.observe(homeScene.current);
    observer.observe(heading.current);
    window.addEventListener('resize', fit);
    document.fonts?.ready.then(fit);
    fit();
    return () => { observer.disconnect(); window.removeEventListener('resize', fit); };
  }, [page]);
  const icons = [home, projectsIcon, work, contact];
  const pageClass = page === 'project-journal' ? 'projects' : page;
  return <>
    <div className={`pond-site figma-site figma-site--${pageClass}`} data-theme={theme}>
      <a href="#page-content" className="skip-link" onClick={event => { event.preventDefault(); heading.current?.focus(); }}>Skip to content</a>
      <aside className="portfolio-sidebar">
        <a className="portfolio-mascot" href="#home" aria-label="Lynette home"><img src={mascot} alt="" /></a>
        <nav aria-label="Main navigation">{pages.map((item, index) => <a key={item} href={`#${item}`} aria-label={item[0].toUpperCase() + item.slice(1)} aria-current={(page === item || (page === 'project-journal' && item === 'projects')) ? 'page' : undefined}><img src={icons[index]} alt="" /><span>[{item}]</span></a>)}</nav>
        <button className="portfolio-theme-toggle" type="button" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} aria-pressed={theme === 'dark'} onClick={() => setTheme(value => value === 'light' ? 'dark' : 'light')}><span aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span><span>{theme === 'light' ? 'dark' : 'light'}</span></button>
      </aside>
      <main id="page-content" className={`portfolio-page portfolio-page--${pageClass}`} ref={heading} tabIndex={-1} key={page}>
        {page === 'home' && <div className="home-scene" ref={homeScene}>
          <TypingGreeting />
          <ul className="portfolio-tags" aria-label="My background">{['product designer', 'computer science major', 'digital arts & sciences minor'].map(tag => <li key={tag}><span aria-hidden="true">×</span> {tag}</li>)}</ul>
          <div className="portfolio-intro">
            <a className="previous-experience" href="#work"><div><span aria-hidden="true">×</span><p><strong>prev. experience</strong><br />swe intern @ esri</p></div><img src={esri} alt="Esri headquarters sign" /></a>
            <div className="portfolio-bio">
              <p>hello, world!</p>
              <p>i’m lynette hemingway, a product designer at the university of florida.</p>
              <p>i enjoy creating thoughtful digital experiences that feel intuitive, useful, and visually engaging.</p>
              <p>with a background in computer science and digital arts, i’m especially interested in the space where design and technology overlap.</p>
              <p>outside of design, i love trying new food, making it myself, and blogging about whatever turns out good.</p>
            </div>
            <div className="portfolio-koi"><img src={koi} alt="Hand-drawn sage green koi fish" /></div>
          </div>
        </div>}
        {(page === 'projects' || page === 'project-journal') && <Projects theme={theme} archive={page === 'project-journal'} />}
        {page === 'work' && <><header className="work-page-heading"><h1>My work</h1><p>experience / 2025–2026</p></header><Experience /></>}
        {page === 'contact' && <Contact />}
      </main>
      <footer className="portfolio-copyright">© 2026 LYNETTE</footer>
    </div>
  </>;
}

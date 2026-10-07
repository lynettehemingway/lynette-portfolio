import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import './portfolio-base.css';

import './figma-design.css';
import './case-study-design.css';
import './projects-editorial.css';
import './work-design.css';
import './viewport-pages.css';

const pages = ['home', 'projects', 'work', 'contact'];
const readPage = () => { const value = window.location.hash.slice(1).split('/')[0]; return [...pages, 'project-journal'].includes(value) ? value : 'home'; };

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

function HomeKoi() {
  const artwork = useRef(null);
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame;
    const reset = () => {
      window.cancelAnimationFrame(frame);
      artwork.current?.style.removeProperty('--koi-x');
      artwork.current?.style.removeProperty('--koi-y');
    };
    const follow = event => {
      if (reducedMotion.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!artwork.current) return;
        const x = Math.max(-1, Math.min(1, event.clientX / window.innerWidth * 2 - 1));
        const y = Math.max(-1, Math.min(1, event.clientY / window.innerHeight * 2 - 1));
        artwork.current.style.setProperty('--koi-x', (-x * 12).toFixed(2) + 'px');
        artwork.current.style.setProperty('--koi-y', (y * 8).toFixed(2) + 'px');
      });
    };
    window.addEventListener('pointermove', follow);
    window.addEventListener('blur', reset);
    document.documentElement.addEventListener('pointerleave', reset);
    reducedMotion.addEventListener?.('change', reset);
    return () => {
      reset();
      window.removeEventListener('pointermove', follow);
      window.removeEventListener('blur', reset);
      document.documentElement.removeEventListener('pointerleave', reset);
      reducedMotion.removeEventListener?.('change', reset);
    };
  }, []);
  return <div className="portfolio-koi"><div className="koi-parallax" ref={artwork}><img className="koi-swimmer" src={koi} alt="Hand-drawn sage green koi fish" /></div></div>;
}

function HomeStory() {
  const [clear, setClear] = useState(false);
  return <section className="home-story" aria-labelledby="home-story-title">
    <p className="home-story-label">A little less inbox.</p>
    <h2 id="home-story-title">What if the important stuff found you?</h2>
    <div className="home-story-demo" data-clear={clear} aria-hidden="true">
      <div className="story-message story-message--email"><span>Email</span><strong>New course message</strong><i>Somewhere in your inbox.</i></div>
      <div className="story-message story-message--canvas"><span>Canvas</span><strong>Assignment due tomorrow</strong><i>One more tab to check.</i></div>
      <div className="story-message story-message--calendar"><span>Calendar</span><strong>What needs attention?</strong><i>Another place to look.</i></div>
      <div className="story-clear-message"><span>ClassMail / Up next</span><strong>Assignment due tomorrow</strong><i>One place. A clear next step.</i><b>View assignment →</b></div>
    </div>
    <button className="home-story-toggle" type="button" aria-pressed={clear} aria-controls="home-story-caption" onClick={() => setClear(value => !value)}>{clear ? 'Replay the before' : 'Find the important stuff'}<span aria-hidden="true">{clear ? '↺' : '→'}</span></button>
    <p id="home-story-caption" className="home-story-caption" aria-live="polite">{clear ? 'A small illustration of the ClassMail concept.' : 'Three places to check. One thing to miss.'}</p>
    <a className="home-story-link" href="#projects/classmail">Read the design story <span aria-hidden="true">↗</span></a>
  </section>;
}

export default function App() {
  const [page, setPage] = useState(readPage);
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'; } catch { return 'light'; } });
  useEffect(() => {
    document.documentElement.dataset.portfolioTheme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Storage may be unavailable in private browsing. */ }
  }, [theme]);
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('portfolio-home-active', page === 'home');
    document.documentElement.classList.toggle('portfolio-viewport-fixed', ['projects', 'work'].includes(page));
    return () => {document.documentElement.classList.remove('portfolio-home-active'); document.documentElement.classList.remove('portfolio-viewport-fixed');};
  }, [page]);
  const heading = useRef(null);
  const homeScene = useRef(null);
  const pageScene = useRef(null);
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
  useEffect(() => {
    if (!['projects', 'work'].includes(page)) return undefined;
    const scene = pageScene.current;
    const main = heading.current;
    if (!scene || !main) return undefined;
    const fit = () => {
      const styles = getComputedStyle(main);
      const available = main.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
      main.style.setProperty('--page-scale', Math.min(1, available / Math.max(1, scene.offsetHeight)));
    };
    const observer = new ResizeObserver(fit);
    observer.observe(scene);
    observer.observe(main);
    window.addEventListener('resize', fit);
    document.fonts?.ready.then(fit);
    fit();
    return () => {observer.disconnect(); window.removeEventListener('resize', fit);};
  }, [page]);
  const icons = [home, projectsIcon, work, contact];
  const fixedPage = ['projects', 'work'].includes(page);
  const pageClass = page === 'project-journal' ? 'projects' : page;
  return <>
    <div className={`pond-site figma-site figma-site--${pageClass}${fixedPage ? ' viewport-fixed' : ''}`} data-theme={theme} data-page={page}>
      <a href="#page-content" className="skip-link" onClick={event => { event.preventDefault(); heading.current?.focus(); }}>Skip to content</a>
      <aside className="portfolio-sidebar">
        <a className="portfolio-mascot" href="#home" aria-label="Lynette home"><img src={mascot} alt="" /></a>
        <nav aria-label="Main navigation">{pages.map((item, index) => <a key={item} href={`#${item}`} aria-label={item[0].toUpperCase() + item.slice(1)} aria-current={(page === item || (page === 'project-journal' && item === 'projects')) ? 'page' : undefined}><img src={icons[index]} alt="" /><span>[{item}]</span></a>)}</nav>
        <button className="portfolio-theme-toggle" type="button" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} aria-pressed={theme === 'dark'} onClick={() => setTheme(value => value === 'light' ? 'dark' : 'light')}><span aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span><span>{theme === 'light' ? 'dark' : 'light'}</span></button>
      </aside>
      <main id="page-content" className={`portfolio-page portfolio-page--${pageClass}${fixedPage ? ' portfolio-page--fixed' : ''}`} ref={heading} tabIndex={-1} key={page}>
        {page === 'home' && <div className="home-scene" ref={homeScene}>
          <TypingGreeting />
          <ul className="portfolio-tags" aria-label="My background">{['Product designer', 'Computer science major', 'Digital Arts & Sciences minor'].map(tag => <li key={tag}><span aria-hidden="true">×</span> {tag}</li>)}</ul>
          <div className="portfolio-intro">
            <div className="home-side-notes"><a className="previous-experience" href="#work"><div><span aria-hidden="true">×</span><p><strong>Previous experience</strong><br />SWE intern at Esri</p></div><img src={esri} alt="Esri headquarters sign" /></a><HomeStory /></div>
            <div className="portfolio-bio">
              <p className="home-selected-work"><a href="#projects">View selected work <span aria-hidden="true">→</span></a></p>
              <p>I’m Lynette Hemingway, a product designer at the University of Florida.</p>
              <p>I enjoy creating thoughtful digital experiences that feel intuitive, useful, and visually engaging.</p>
              <p>With a background in computer science and digital arts, I’m especially interested in the space where design and technology overlap.</p>
              <p>Outside of design, I love trying new foods, making them myself, and blogging about whatever turns out well.</p>
            </div>
            <HomeKoi />
          </div>
        </div>}
        {page === 'projects' && <div className="viewport-scene" ref={pageScene}><Projects theme={theme} /></div>}
        {page === 'project-journal' && <Projects theme={theme} archive />}
        {page === 'work' && <div className="viewport-scene" ref={pageScene}><header className="work-page-heading"><h1>My work.</h1><p>Experience / 2025–2026</p></header><Experience /></div>}
        {page === 'contact' && <Contact />}
      </main>
      <footer className="portfolio-copyright">© 2026 LYNETTE</footer>
    </div>
  </>;
}

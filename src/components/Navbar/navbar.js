import { useEffect, useRef, useState } from 'react';

export default function Navbar({ theme, onThemeChange, onContactOpen }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header className="site-nav">
      <a className="monogram" href="#text" aria-label="Lynette Hemingway, home">L<span>H</span></a>
      <nav id="main-navigation" className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        <a href="#projects-title" onClick={() => setOpen(false)}>Work</a>
        <a href="#about-title" onClick={() => setOpen(false)}>About</a>
        <a href="#experience-title" onClick={() => setOpen(false)}>Experience</a>
        <button className="nav-contact" type="button" aria-haspopup="dialog" onClick={(event) => { onContactOpen(open ? menuButton.current : event.currentTarget); setOpen(false); }}>Contact</button>
      </nav>
      <div className="nav-controls">
        <button className="menu-toggle" ref={menuButton} type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
        <button className="theme-toggle" type="button" onClick={onThemeChange} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? '☾' : '☀'}</button>
      </div>
    </header>
  );
}

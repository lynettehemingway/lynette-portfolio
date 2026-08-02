import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './navbar.css'; 

const Navbar = ({ gameMode, onGameModeChange }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [homeVisible, setHomeVisible] = useState(true);
    const [gameInfoOpen, setGameInfoOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {
        const openContact = () => setContactOpen(true);
        window.addEventListener("open-contact-modal", openContact);
        return () => window.removeEventListener("open-contact-modal", openContact);
    }, []);

    useEffect(() => {
        const home = document.getElementById("text");
        if (!home) return undefined;
        const observer = new IntersectionObserver(([entry]) => {
            setHomeVisible(entry.isIntersecting);
        }, { threshold: 0.12 });
        observer.observe(home);
        return () => observer.disconnect();
    }, [gameMode, onGameModeChange]);

    useEffect(() => {
        if (!gameMode) setGameInfoOpen(false);
    }, [gameMode]);

    return (
        <nav className="navbar">
            <div className="brand-stack">
                <div className="brand-topline">
                    <div className="logo">lynette</div>
                    <div className="nav-socials" aria-label="Social links">
                        <a href="https://www.linkedin.com/in/lynette-hemingway/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <svg className="linkedin-icon" viewBox="0 0 24 24" aria-hidden="true"><rect className="linkedin-bg" x="1.5" y="1.5" width="21" height="21" rx="2" /><circle className="linkedin-mark" cx="7.2" cy="8" r="1.25" /><path className="linkedin-mark" d="M6.1 10.3h2.2V18H6.1v-7.7ZM10.6 10.3h2.1v1.1c.6-.9 1.5-1.4 2.7-1.4 2.1 0 3.2 1.3 3.2 3.8V18h-2.2v-3.8c0-1.4-.5-2.2-1.7-2.2-1.2 0-1.9.8-1.9 2.5V18h-2.2v-7.7Z" /></svg>
                        </a>
                        <a href="https://www.instagram.com/foodwnet/" target="_blank" rel="noopener noreferrer" aria-label="Instagram food blog, foodwnet">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5" /><circle cx="12" cy="12" r="4.3" /><circle className="social-fill" cx="17.7" cy="6.4" r="1.1" /></svg>
                        </a>
                        <a href="https://github.com/lynettehemingway" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 6.8 8.6a3.6 3.6 0 0 1 .1-2.7s.8-.3 2.8 1A9.7 9.7 0 0 1 12 6.6a9.7 9.7 0 0 1 2.5.3c2-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1.1 2.8c0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" /></svg>
                        </a>
                        <button type="button" onClick={() => setContactOpen(true)} aria-label="Contact Lynette Hemingway">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
                        </button>
                    </div>
                </div>
                {(homeVisible || gameMode) && (
                    <div className="game-actions">
                        <button
                            type="button"
                            className={`game-mode-toggle ${gameMode ? "active" : ""}`}
                            aria-pressed={gameMode}
                            onClick={() => onGameModeChange(!gameMode)}
                        >
                            <span className="game-mode-dot" />
                            {gameMode ? "EXIT GAME" : "GAME MODE"}
                        </button>
                        {gameMode && <button className="game-info-button" type="button" aria-label="How to play" aria-expanded={gameInfoOpen} onClick={() => setGameInfoOpen((open) => !open)}>i</button>}
                        {gameMode && gameInfoOpen && (
                            <aside className="game-info-popover">
                                <strong>guide the koi</strong>
                                <p>collect all ten moon pearls throughout my portfolio :)</p>
                                <div className="key-guide"><kbd>W</kbd><kbd>↑</kbd><span>move up</span><kbd>A</kbd><kbd>←</kbd><span>move left</span><kbd>S</kbd><kbd>↓</kbd><span>move down</span><kbd>D</kbd><kbd>→</kbd><span>move right</span></div>
                            </aside>
                        )}
                    </div>
                )}
            </div>

            <div className="hamburger-menu" onClick={toggleMenu}>
                &#9776;
            </div>

            <div className={`desktopMenu ${menuOpen ? "show" : ""}`}>
                <ScrollLink className="desktopMenuListItem" to="text" smooth={true} duration={500} offset={-64} onClick={() => setMenuOpen(false)}>home</ScrollLink>
                <ScrollLink className="desktopMenuListItem" to="intro" smooth={true} duration={500} offset={-64} onClick={() => setMenuOpen(false)}>about</ScrollLink>
                <ScrollLink className="desktopMenuListItem" to="experience" smooth={true} duration={500} offset={-64} onClick={() => setMenuOpen(false)}>experience</ScrollLink>
                <ScrollLink className="desktopMenuListItem" to="projects" smooth={true} duration={500} offset={-64} onClick={() => setMenuOpen(false)}>projects</ScrollLink>
            </div>

            {contactOpen && (
                <div className="contact-modal-backdrop" onMouseDown={() => setContactOpen(false)}>
                    <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" onMouseDown={(event) => event.stopPropagation()}>
                        <button className="contact-close" type="button" onClick={() => setContactOpen(false)} aria-label="Close contact form">×</button>
                        <span className="contact-eyebrow">SAY HELLO</span>
                        <h2 id="contact-title">Contact me!</h2>
                        <p>Have a project, opportunity, food recommendation, or just want to chat? I’d love to hear from you.</p>
                        <form action="https://formsubmit.co/lynette.hemingway@gmail.com" method="POST">
                            <input type="hidden" name="_subject" value="New portfolio message" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="text" name="_honey" className="contact-honey" tabIndex="-1" autoComplete="off" />
                            <label>
                                From who?
                                <input name="name" type="text" placeholder="Your name" required autoFocus />
                            </label>
                            <label>
                                Your email
                                <input name="email" type="email" placeholder="you@example.com" required />
                            </label>
                            <label>
                                What’s on your mind?
                                <textarea name="message" rows="4" placeholder="Write your message here…" required />
                            </label>
                            <button className="contact-submit" type="submit">send message <span>→</span></button>
                        </form>
                    </section>
                </div>
            )}
        </nav>
    );
}

export default Navbar;

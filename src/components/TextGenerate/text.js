import { useEffect, useState } from 'react';
import koi from '../../assets/koi-cutout.png';

export function WaterLines() {
  return (
    <svg className="water-lines" viewBox="0 0 1400 900" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth=".8">
        {[0, 1, 2, 3, 4, 5].map((line) => <path key={line} transform={`translate(${line * 9} ${line * 12})`} d="M-100 670C130 470 420 810 700 610S1200 350 1500 470M-100 280C200 90 340 340 650 180S1170 140 1480-20M450 920C260 730 1090 850 1230 680S1080 500 1420 470" />)}
        <ellipse cx="1030" cy="770" rx="250" ry="65" /><ellipse cx="1030" cy="770" rx="280" ry="79" />
      </g>
    </svg>
  );
}

export default function TextGenerate({ onPondOpen }) {
  const message = "hi, i'm lynette.";
  const [text, setText] = useState('');
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(message);
      return undefined;
    }
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setText(message.slice(0, index));
      if (index === message.length) window.clearInterval(timer);
    }, 100);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section id="text" className="pond-hero" aria-labelledby="hero-title">
      <WaterLines />
      <div className="hero-copy">
        <h1 id="hero-title" className="animated-intro"><span className="sr-only">{message}</span><span aria-hidden="true">{text}<span className="typing-cursor">|</span></span></h1>
        <p className="hero-description">An aspiring product designer studying computer science at UF. I turn complex problems into clear, considered experiences.</p>
        <a className="pill-link" href="#projects-title">View my work <span aria-hidden="true">→</span></a>
      </div>
      <div className="hero-art" aria-hidden="true"><img className="hero-koi" src={koi} alt="" loading="eager" /></div>
      <button className="pond-entry" type="button" aria-label="Open interactive koi pond" aria-haspopup="dialog" onClick={(event) => onPondOpen(event.currentTarget)}>
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M22 6C10 2 5 13 12 20c5 5 12 0 10-6-1-4-7-5-8-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="m22 6 5-3-2 7m-13 10-5 5 7-1m5-11 4-3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="13.5" cy="13.5" r="1" fill="currentColor" /><path d="M7 29c6-2 13-2 19 0" stroke="currentColor" opacity=".5" /></svg>
        <span>A moment by the pond</span>
      </button>
    </section>
  );
}

import {useEffect, useState} from 'react';

const first = 'Lynette';
const last = 'Hemingway';
const length = first.length + last.length;

export default function TypewriterName() {
  const [count, setCount] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? length : 0);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    const start = () => {
      window.clearInterval(timer);
      if (reduced.matches) {setCount(length); return;}
      let index = 0;
      setCount(0);
      timer = window.setInterval(() => {
        index += 1;
        setCount(Math.min(index, length));
        if (index >= length) window.clearInterval(timer);
      }, 105);
    };
    start();
    reduced.addEventListener?.('change', start);
    return () => {window.clearInterval(timer); reduced.removeEventListener?.('change', start);};
  }, []);
  return <h1 className="typewriter-name" aria-label="Lynette Hemingway">
    <span className="typed-line" aria-hidden="true"><span className="typing-layout">{first}</span><span className="typing-ink">{first.slice(0, count)}{count < first.length && <i className="name-caret" />}</span></span>
    <span className="typed-line" aria-hidden="true"><span className="typing-layout">{last}</span><span className="typing-ink">{last.slice(0, Math.max(0, count - first.length))}{count >= first.length && count < length && <i className="name-caret" />}</span></span>
  </h1>;
}

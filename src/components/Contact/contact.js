import {useEffect, useRef, useState} from 'react';
import './contact-examples.css';

const examples = [
  {label: 'a role', message: 'Hey Lynette, I’d love to talk about a product design role.'},
  {label: 'a project', message: 'Hey Lynette, your CARTograph case study caught my eye. Let’s chat!'},
  {label: 'say hello', message: 'Hey Lynette, I found a matcha spot you might love!'}
];

function MessageExamples({onUse}) {
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);
  const message = examples[selected].message;
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    const start = () => {
      window.clearInterval(timer);
      setCount(reduced.matches ? message.length : 0);
      if (reduced.matches) return;
      let index = 0;
      timer = window.setInterval(() => {
        index += 1;
        setCount(index);
        if (index >= message.length) window.clearInterval(timer);
      }, 45);
    };
    start();
    reduced.addEventListener?.('change', start);
    return () => {window.clearInterval(timer); reduced.removeEventListener?.('change', start);};
  }, [message]);
  const browse = direction => setSelected(value => (value + direction + examples.length) % examples.length);
  return <div className="contact-examples">
    <div className="contact-example-topline">
      <div className="contact-example-topics" role="group" aria-label="Message examples">
        {examples.map((example, index) => <button key={example.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{example.label}</button>)}
      </div>
      <div className="contact-example-navigation">
        <button type="button" aria-label="Previous message example" onClick={() => browse(-1)}>←</button>
        <button type="button" aria-label="Next message example" onClick={() => browse(1)}>→</button>
      </div>
    </div>
    <button className="contact-example-line" type="button" aria-label={'Use example: ' + message} aria-describedby="contact-example-help" onClick={() => onUse(message)} onKeyDown={event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {event.preventDefault(); browse(event.key === 'ArrowLeft' ? -1 : 1);}
    }}>
      <span aria-hidden="true" className="contact-example-square" />
      <span className="contact-example-text" aria-hidden="true"><span className="contact-example-prefix">Example: </span>{message.slice(0, count)}<i className="contact-example-caret" key={selected} /></span>
    </button>
    <p id="contact-example-help" className="contact-example-help">Click the example to start a message.<span><kbd>←</kbd> <kbd>→</kbd> browse · <kbd>Enter</kbd> use example</span></p>
  </div>;
}

export default function Contact() {
  const [message, setMessage] = useState('');
  const messageRef = useRef(null);
  const useExample = example => {
    setMessage(current => {
      if (current.trim().endsWith(example)) return current;
      const next = current.trim() ? current + '\n\n' + example : example;
      return next.length <= 5000 ? next : current;
    });
    messageRef.current?.focus();
  };
  return <section className="contact-page" aria-labelledby="contact-title">
    <header className="contact-page-intro">
      <p className="page-eyebrow">say hello</p>
      <h1 id="contact-title">Contact me!</h1>
      <p className="contact-page-description contact-invitation">I’d love to hear from you!</p>
      <MessageExamples onUse={useExample} />
      <a className="contact-direct-email" href="mailto:lynette.hemingway@gmail.com">lynette.hemingway@gmail.com ↗</a>
      <div className="portfolio-socials"><a href="https://www.linkedin.com/in/lynette-hemingway/" target="_blank" rel="noreferrer">linkedin ↗</a><a href="https://github.com/lynettehemingway" target="_blank" rel="noreferrer">github ↗</a></div>
    </header>
    <form className="contact-page-form" aria-label="Send Lynette a message" action="https://formsubmit.co/lynette.hemingway@gmail.com" method="POST">
      <input type="hidden" name="_subject" value="New portfolio message" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" hidden tabIndex={-1} autoComplete="off" />
      <label htmlFor="contact-name">Your name</label>
      <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="What should I call you?" required maxLength={120} />
      <label htmlFor="contact-email">Your email</label>
      <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} />
      <label htmlFor="contact-message">What’s on your mind?</label>
      <textarea ref={messageRef} value={message} onChange={event => setMessage(event.target.value)} id="contact-message" name="message" rows={6} placeholder="Tell me a little about it…" required maxLength={5000} />
      <button className="contact-page-send" type="submit">Send message <span aria-hidden="true">→</span></button>
    </form>
  </section>;
}

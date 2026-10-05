import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Contact({ theme, onClose, returnFocusRef }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const dialog = dialogRef.current;
    const trigger = returnFocusRef.current;
    const site = trigger?.closest('.pond-site');
    site?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
    dialog.querySelector('button').focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab') return;
      const items = dialog.querySelectorAll('button, input:not([type="hidden"]):not([hidden]), textarea, a[href]');
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      site?.removeAttribute('inert');
      trigger?.focus();
    };
  }, [onClose, returnFocusRef]);

  return createPortal(
    <div className="pond-site contact-portal" data-theme={theme}>
      <div className="contact-backdrop" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
        <section className="contact-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="contact-title" aria-describedby="contact-description">
          <button className="contact-close" type="button" onClick={onClose} aria-label="Close contact form">×</button>
          <p className="eyebrow">Say hello</p>
          <h2 id="contact-title">let’s connect.</h2>
          <p id="contact-description">A new idea, a little curiosity, or just a hello. I’d love to hear from you.</p>
          <form action="https://formsubmit.co/lynette.hemingway@gmail.com" method="POST">
            <input type="hidden" name="_subject" value="New portfolio message" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" hidden tabIndex={-1} autoComplete="off" />
            <label htmlFor="contact-name">Your name</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="What should I call you?" required maxLength={120} />
            <label htmlFor="contact-email">Your email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} />
            <label htmlFor="contact-message">What’s on your mind?</label>
            <textarea id="contact-message" name="message" rows={4} placeholder="Tell me a little about it…" required maxLength={5000} />
            <button className="contact-send" type="submit">Send message <span aria-hidden="true">→</span></button>
          </form>
          <p className="contact-email-alternative">Prefer email? <a href="mailto:lynette.hemingway@gmail.com">Write to me directly ↗</a></p>
        </section>
      </div>
    </div>, document.body
  );
}

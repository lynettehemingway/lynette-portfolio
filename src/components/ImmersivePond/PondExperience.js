import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { POND_FISH, REFLECTIONS } from './pondSimulation';
import koi from '../../assets/koi-cutout.png';
import './pondExperience.css';

export default function PondExperience({ onClose, returnFocusRef }) {
  const dialogRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [moonlight, setMoonlight] = useState(false);
  const [thought, setThought] = useState(0);
  const [selected, setSelected] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const initialPaused = useRef(paused);

  useEffect(() => {
    const trigger = returnFocusRef.current;
    const site = trigger?.closest('.pond-site');
    const overflow = document.body.style.overflow;
    site?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
    dialogRef.current.querySelector('button').focus();
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const items = dialogRef.current.querySelectorAll('button:not([disabled]), [tabindex="0"]');
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      site?.removeAttribute('inert');
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [onClose, returnFocusRef]);

  useEffect(() => {
    let cancelled = false;
    let engine;
    setStatus('loading');
    const fail = () => {
      if (cancelled) return;
      engine?.dispose();
      engineRef.current = null;
      setStatus('error');
    };
    import('./pondScene').then(({ createPondScene }) => {
      if (cancelled) return;
      engine = createPondScene(canvasRef.current, {
        reducedMotion: initialPaused.current,
        onSelect: setSelected,
        onFeed: () => setAnnouncement('A little food, a little company. Watch the koi gather.'),
        onError: fail,
      });
      engineRef.current = engine;
      setPaused(initialPaused.current);
      setMoonlight(false);
      setStatus('ready');
    }).catch(fail);
    return () => { cancelled = true; engine?.dispose(); engineRef.current = null; };
  }, [attempt]);

  const fish = selected === null ? null : POND_FISH[selected];
  const reflection = REFLECTIONS[thought];
  const changeThought = () => { setSelected(null); setThought((current) => (current + 1) % REFLECTIONS.length); };

  return createPortal(
    <div className={`immersive-pond ${moonlight ? 'is-moonlit' : ''}`} role="dialog" aria-modal="true" aria-labelledby="pond-title" ref={dialogRef}>
      <canvas className="immersive-pond-canvas" ref={canvasRef} aria-label="Interactive 3D koi pond. Drag to look around, tap the water to feed, or use the controls below." />
      <div className="pond-vignette" aria-hidden="true" />
      <header className="pond-topbar">
        <div><p className="pond-overline">A quiet corner of my world</p><h2 id="pond-title">stay a little. drift a little.</h2></div>
        <button className="pond-exit" type="button" onClick={onClose} aria-label="Close koi pond">Back to portfolio <span aria-hidden="true">×</span></button>
      </header>

      {status === 'loading' && <div className="pond-loading" role="status"><span className="pond-loading-ring" />A little stillness is on its way…</div>}
      {status === 'error' && <div className="pond-error" role="status"><img src={koi} alt="" /><p>This browser couldn’t open the 3D pond.</p><button type="button" onClick={() => setAttempt((value) => value + 1)}>Try again</button><p>You can still explore the reflections below.</p></div>}

      <div className="pond-bottom-ui">
        <div className="pond-reflection" aria-live="polite">
          <p className="pond-overline">{fish ? `${fish.name} / ${fish.trait}` : reflection.theme}</p>
          <p className="pond-thought">{fish ? fish.reflection : reflection.text}</p>
          <button className="pond-thought-next" type="button" onClick={changeThought}>Another thought <span aria-hidden="true">↗</span></button>
        </div>
        <div className="pond-controls-panel">
          <p className="pond-help">Tap water to feed · Tap a koi to meet it · Drag to look around</p>
          <div className="pond-toolbar" aria-label="Pond controls">
            <button type="button" disabled={status !== 'ready' || paused} onClick={() => engineRef.current?.feed()}>Feed the koi</button>
            <button type="button" disabled={status !== 'ready'} aria-pressed={paused} onClick={() => { engineRef.current?.setPaused(!paused); setPaused(!paused); }}>{paused ? 'Resume swimming' : 'Pause'}</button>
            <button type="button" disabled={status !== 'ready'} aria-pressed={moonlight} onClick={() => { engineRef.current?.setMoonlight(!moonlight); setMoonlight(!moonlight); }}>{moonlight ? 'Daylight' : 'Moonlight'}</button>
            <button type="button" disabled={status !== 'ready'} onClick={() => engineRef.current?.resetView()}>Reset view</button>
          </div>
          <div className="pond-fish-list" aria-label="Meet the koi">
            {POND_FISH.map((item, index) => <button type="button" key={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)}><span style={{ background: item.colors[1] }} aria-hidden="true" />{item.name}</button>)}
          </div>
          <p className="pond-personal-note">INFJ · Virgo · endlessly curious about people.</p>
          <span className="pond-screen-reader" role="status">{announcement}</span>
        </div>
      </div>
    </div>, document.body
  );
}

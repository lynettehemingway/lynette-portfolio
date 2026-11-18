import {useEffect, useRef} from 'react';

export default function AsciiAtmosphere() {
  const canvas = useRef(null);
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext('2d');
    if (!context) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let frame;
    let previous = -100;
    let phase = 0;
    const pointer = {x: -1000, y: -1000, active: false, strength: 0};
    const offsets = Array.from({length: 34 * 210}, () => ({x: 0, y: 0}));
    const movePointer = event => {
      if (event.pointerType === 'touch' || reduced.matches) return;
      const bounds = element.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };
    const leavePointer = () => {pointer.active = false;};
    window.addEventListener('pointermove', movePointer, {passive: true});
    document.documentElement.addEventListener('pointerleave', leavePointer);
    window.addEventListener('blur', leavePointer);
    const draw = time => {
      const moving = !reduced.matches;
      if (time - previous >= 33 || !moving) {
        const elapsed = Math.min(80, Math.max(0, time - previous));
        previous = time;
        if (moving) phase += elapsed * (width > 700 ? .00065 : .0003);
        pointer.strength += ((pointer.active && moving ? 1 : 0) - pointer.strength) * .12;
        context.clearRect(0, 0, width, height);
        // Pinpoint stars stay tiny; the flowing surface is built from micro type.
        for (let i = 0; i < 140; i += 1) {
          const x = ((i * 73.37 + 11.2) % 100) / 100 * width + Math.cos(phase * .2 + i * 2) * 9;
          const y = ((i * 43.71 + 6.4) % 100) / 100 * height + Math.sin(phase * .7 + i) * 6;
          const sparkle = .5 + .5 * Math.sin(phase * .65 + i * 1.9);
          const bright = i % 11 === 0;
          context.fillStyle = `rgba(232,229,220,${(bright ? .38 : .12) + sparkle * (bright ? .4 : .17)})`;
          const size = bright ? 1.7 : .8;
          context.beginPath();
          context.arc(x, y, size, 0, Math.PI * 2);
          context.fill();
        }
        // A fine silver dust ribbon, drawn from tiny ASCII marks rather than large star glyphs.
        context.textAlign = 'center';
        const chars = ['.', '.', ':', '.', '+'];
        const bandY = height * .67;
        for (let row = 0; row < 34; row += 1) {
          const v = row / 33 * 2 - 1;
          for (let col = 0; col < 210; col += 1) {
            const u = col / 209;
            const seed = Math.sin(col * 127.1 + row * 311.7) * 43758.5453;
            const noise = seed - Math.floor(seed);
            const swell = Math.sin(u * 11 + phase);
            const envelope = 12 + 24 * Math.pow(Math.sin(u * 8 - phase * .6), 2);
            const x = u * width + (noise - .5) * 7;
            const y = bandY + swell * (width > 700 ? 38 : 20) + Math.sin(u * 5 - phase) * 25
              + v * envelope * Math.cos(u * 9 + phase) + (noise - .5) * 13;
            const glint = Math.pow(Math.max(0, Math.sin(u * 23 + v * 7 + phase * 1.4)), 6);
            const fade = Math.pow(Math.sin(u * Math.PI), .35);
            context.font = `${noise > .97 ? 5 : 3}px monospace`;
            context.fillStyle = `rgba(233,230,220,${(.12 + noise * .3 + glint * .4) * fade})`;
            const offset = offsets[row * 210 + col];
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const distance = Math.hypot(dx, dy);
            const radius = Math.min(190, Math.max(110, width * .16));
            const influence = Math.pow(Math.max(0, 1 - distance / radius), 2) * pointer.strength;
            const force = influence * 90;
            const wave = Math.sin(distance * .045 - phase * 6) * influence * 14;
            offset.x += ((dx / Math.max(1, distance)) * force - offset.x) * .18;
            offset.y += ((dy / Math.max(1, distance)) * force + wave - offset.y) * .18;
            context.fillText(chars[Math.floor(noise * chars.length)], x + offset.x, y + offset.y);
          }
        }
        for (let i = 0; i < 120; i += 1) {
          const u = ((i * .61803398875) % 1);
          const spread = Math.sin(i * 73.17);
          const x = u * width;
          const y = bandY + spread * (30 + (i % 5) * 16) + Math.sin(u * 8 + phase) * 16;
          context.fillStyle = `rgba(232,229,218,${.12 + (i % 7) * .065})`;
          const size = i % 13 === 0 ? 1.6 : .65;
          context.fillRect(x, y, size, size);
        }

      }
      if (moving) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const bounds = element.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = width * ratio;
      element.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      cancelAnimationFrame(frame);
      previous = -100;
      draw(0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    reduced.addEventListener?.('change', resize);
    resize();
    return () => {cancelAnimationFrame(frame); observer.disconnect(); reduced.removeEventListener?.('change', resize); window.removeEventListener('pointermove', movePointer); document.documentElement.removeEventListener('pointerleave', leavePointer); window.removeEventListener('blur', leavePointer);};
  }, []);
  return <canvas ref={canvas} className="ascii-sky atmosphere-canvas" data-interactive="true" aria-hidden="true" />;
}

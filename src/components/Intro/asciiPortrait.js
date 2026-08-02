import { useEffect, useRef } from "react";
import portraitSource from "../../assets/me.jpg";

const glyphs = ["·", ".", ":", "+", "*", "="];

const seededNoise = (x, y) => {
    const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return value - Math.floor(value);
};

const insidePortrait = (x, y) => {
    // Silhouette traced from me.jpg: hair/head, shoulders, and blazer.
    const hairAndHead = Math.pow((x - .51) / .245, 2) + Math.pow((y - .285) / .225, 2) < 1;
    const hairLength = y > .28 && y < .59 && Math.abs(x - .51) < .22 + (y - .28) * .08;
    const shoulderWidth = .24 + Math.max(0, y - .49) * .43;
    const blazer = y > .47 && y < .96 && Math.abs(x - .51) < shoulderWidth;
    const shoulders = blazer && Math.pow((x - .51) / .44, 2) + Math.pow((y - .78) / .38, 2) < 1.22;
    return hairAndHead || hairLength || shoulders;
};

export default function AsciiPortrait() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const pointer = { x: 0, y: 0, active: false };
        let particles = [];
        let frame;
        let last = performance.now();
        let cssWidth = 0;
        let cssHeight = 0;
        let photoPixels = null;
        let photoWidth = 0;
        let photoHeight = 0;

        const samplePhoto = (nx, ny) => {
            if (!photoPixels) return { luminance: .5, edge: 0 };
            // Crop tightly around Lynette in the original vertical photograph.
            const sx = Math.max(0, Math.min(photoWidth - 2, Math.floor((.12 + nx * .76) * photoWidth)));
            const sy = Math.max(0, Math.min(photoHeight - 2, Math.floor((.17 + ny * .82) * photoHeight)));
            const pixelAt = (x, y) => {
                const index = (y * photoWidth + x) * 4;
                return (photoPixels[index] * .2126 + photoPixels[index + 1] * .7152 + photoPixels[index + 2] * .0722) / 255;
            };
            const luminance = pixelAt(sx, sy);
            const edge = Math.min(1, Math.abs(luminance - pixelAt(sx + 1, sy)) * 3 + Math.abs(luminance - pixelAt(sx, sy + 1)) * 3);
            return { luminance, edge };
        };

        const buildPortrait = () => {
            const bounds = canvas.getBoundingClientRect();
            cssWidth = bounds.width;
            cssHeight = bounds.height;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(cssWidth * dpr);
            canvas.height = Math.round(cssHeight * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const next = [];
            const step = Math.max(6.5, cssWidth / 57);
            for (let py = step; py < cssHeight - step; py += step) {
                for (let px = step; px < cssWidth - step; px += step) {
                    const nx = px / cssWidth;
                    const ny = py / cssHeight;
                    if (!insidePortrait(nx, ny)) continue;

                    const { luminance, edge } = samplePhoto(nx, ny);
                    const ink = Math.max(0, Math.min(1, (1 - luminance) * .82 + edge * 1.25));
                    const noise = seededNoise(Math.round(px), Math.round(py));
                    const glyphIndex = Math.min(glyphs.length - 1, Math.floor(ink * 4.8 + noise * .8));
                    next.push({
                        homeX: px,
                        homeY: py,
                        x: px,
                        y: py,
                        vx: 0,
                        vy: 0,
                        glyph: glyphs[glyphIndex],
                        alpha: .28 + ink * .62 + edge * .18,
                        phase: noise * Math.PI * 2,
                    });
                }
            }
            particles = next;
        };

        const onMove = (event) => {
            const bounds = canvas.getBoundingClientRect();
            pointer.x = event.clientX - bounds.left;
            pointer.y = event.clientY - bounds.top;
        };
        const onEnter = (event) => {
            pointer.active = true;
            onMove(event);
        };
        const onLeave = () => { pointer.active = false; };

        const render = (now) => {
            const dt = Math.min(2, (now - last) / 16.67);
            last = now;
            ctx.clearRect(0, 0, cssWidth, cssHeight);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = `${Math.max(7, cssWidth / 55)}px ui-monospace, SFMono-Regular, Consolas, monospace`;

            particles.forEach((particle) => {
                let targetX = particle.homeX;
                let targetY = particle.homeY;
                if (pointer.active && !reducedMotion) {
                    const dx = particle.x - pointer.x;
                    const dy = particle.y - pointer.y;
                    const distance = Math.max(1, Math.hypot(dx, dy));
                    const reach = Math.max(75, cssWidth * .22);
                    if (distance < reach) {
                        const force = Math.pow(1 - distance / reach, 2) * 22;
                        targetX += (dx / distance) * force;
                        targetY += (dy / distance) * force;
                    }
                    targetX += Math.sin(now * .003 + particle.phase + particle.homeY * .025) * 2.8;
                    targetY += Math.cos(now * .0025 + particle.phase) * 1.7;
                }

                particle.vx = (particle.vx + (targetX - particle.x) * .075 * dt) * Math.pow(.76, dt);
                particle.vy = (particle.vy + (targetY - particle.y) * .075 * dt) * Math.pow(.76, dt);
                particle.x += particle.vx * dt;
                particle.y += particle.vy * dt;

                const speed = Math.min(1, Math.hypot(particle.vx, particle.vy) / 3);
                ctx.fillStyle = `rgba(${155 + speed * 45}, ${232 + speed * 18}, ${213 + speed * 25}, ${particle.alpha})`;
                ctx.fillText(particle.glyph, particle.x, particle.y);
            });
            frame = requestAnimationFrame(render);
        };

        const sourceImage = new Image();
        sourceImage.onload = () => {
            const sampler = document.createElement("canvas");
            photoWidth = sourceImage.naturalWidth;
            photoHeight = sourceImage.naturalHeight;
            sampler.width = photoWidth;
            sampler.height = photoHeight;
            const samplerContext = sampler.getContext("2d", { willReadFrequently: true });
            samplerContext.drawImage(sourceImage, 0, 0);
            photoPixels = samplerContext.getImageData(0, 0, photoWidth, photoHeight).data;
            buildPortrait();
        };
        sourceImage.src = portraitSource;

        const observer = new ResizeObserver(buildPortrait);
        observer.observe(canvas);
        canvas.addEventListener("pointerenter", onEnter);
        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerleave", onLeave);
        buildPortrait();
        frame = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            canvas.removeEventListener("pointerenter", onEnter);
            canvas.removeEventListener("pointermove", onMove);
            canvas.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return (
        <figure className="ascii-portrait">
            <canvas ref={canvasRef} aria-label="Interactive ASCII portrait of Lynette Hemingway" role="img" />
            <figcaption>hover to disturb the signal</figcaption>
        </figure>
    );
}

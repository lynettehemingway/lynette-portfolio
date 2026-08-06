import { useEffect, useRef, useState } from "react";
import "./koiPond.css";

const TAU = Math.PI * 2;
const MOON_PEARLS = [
  { x: 12, y: 24 }, { x: 31, y: 20 }, { x: 52, y: 29 }, { x: 77, y: 22 }, { x: 90, y: 39 },
  { x: 18, y: 53 }, { x: 39, y: 67 }, { x: 61, y: 55 }, { x: 82, y: 72 }, { x: 54, y: 84 },
];

export default function KoiPond({ gameMode = false, onExitGame, onPlayAgain }) {
  const canvasRef = useRef(null);
  const [collectedPearls, setCollectedPearls] = useState([]);
  const [pearls, setPearls] = useState(MOON_PEARLS);
  const [showCompletion, setShowCompletion] = useState(false);
  const [mobileDirection, setMobileDirection] = useState(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const pearlsRef = useRef(MOON_PEARLS);
  const mobileDirectionRef = useRef(null);

  useEffect(() => {
    if (!gameMode) return undefined;
    setCollectedPearls([]);

    const arrangePearls = () => {
      const scrollTop = window.scrollY;
      const blockers = [...document.querySelectorAll(".binary-tree, .navbar")]
        .map((element) => {
          const bounds = element.getBoundingClientRect();
          return { left: bounds.left, right: bounds.right, top: bounds.top + scrollTop, bottom: bounds.bottom + scrollTop };
        });
      const documentHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight);
      const targetRows = [.12, .21, .31, .4, .49, .58, .67, .76, .85, .93];
      const columns = [8, 91, 18, 80, 31, 69, 44, 57];
      const arranged = [];
      targetRows.forEach((row, rowIndex) => {
        const y = Math.max(120, Math.min(documentHeight - 60, documentHeight * row));
        let chosen = null;
        for (const padding of [38, 22, 8]) {
          for (let offset = 0; offset < columns.length; offset += 1) {
            const column = columns[(rowIndex + offset) % columns.length];
            const x = column / 100 * window.innerWidth;
            const blocked = blockers.some((bounds) =>
              x > bounds.left - padding && x < bounds.right + padding &&
              y > bounds.top - padding && y < bounds.bottom + padding
            );
            if (!blocked) {
              chosen = { x, y };
              break;
            }
          }
          if (chosen) break;
        }
        if (chosen) arranged.push(chosen);
      });
      const nextPearls = arranged.length === 10
        ? arranged
        : MOON_PEARLS.map((pearl) => ({ x: pearl.x / 100 * window.innerWidth, y: pearl.y / 100 * documentHeight }));
      pearlsRef.current = nextPearls;
      setPearls(nextPearls);
    };

    arrangePearls();
    window.addEventListener("resize", arrangePearls);
    return () => window.removeEventListener("resize", arrangePearls);
  }, [gameMode]);

  useEffect(() => {
    if (!gameMode || collectedPearls.length !== 10) return undefined;
    setShowCompletion(true);
    const exitTimer = window.setTimeout(onExitGame, 350);
    return () => window.clearTimeout(exitTimer);
  }, [collectedPearls.length, gameMode, onExitGame]);

  const controlKey = (type, key) => {
    window.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true }));
  };

  const startControl = (event, key) => {
    event.preventDefault();
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      if (mobileDirectionRef.current && mobileDirectionRef.current !== key) {
        controlKey("keyup", mobileDirectionRef.current);
      }
      mobileDirectionRef.current = key;
      setMobileDirection(key);
      controlKey("keydown", key);
      return;
    }
    controlKey("keydown", key);
  };

  const endControl = (event, key) => {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") {
      controlKey("keyup", key);
    }
  };

  useEffect(() => {
    if (gameMode) return;
    if (mobileDirectionRef.current) controlKey("keyup", mobileDirectionRef.current);
    mobileDirectionRef.current = null;
    setMobileDirection(null);
  }, [gameMode]);

  useEffect(() => {
    if (!gameMode) {
      setShowScrollHint(false);
      return undefined;
    }

    setShowScrollHint(true);
    const startingScrollY = window.scrollY;
    let hasMovedKoi = false;
    let hasExited = false;
    const hideHint = (event) => {
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(event.key?.toLowerCase?.() || event.key)) {
        hasMovedKoi = true;
        setShowScrollHint(false);
      }
    };
    const exitIdleGameOnScroll = () => {
      if (!hasMovedKoi && !hasExited && Math.abs(window.scrollY - startingScrollY) > 180) {
        hasExited = true;
        setShowScrollHint(false);
        onExitGame();
      }
    };

    window.addEventListener("keydown", hideHint);
    window.addEventListener("scroll", exitIdleGameOnScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", hideHint);
      window.removeEventListener("scroll", exitIdleGameOnScroll);
    };
  }, [gameMode, onExitGame]);

  const playAgain = () => {
    setCollectedPearls([]);
    setShowCompletion(false);
    onPlayAgain();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame;
    let lastTime = performance.now();
    let lastRipple = { x: -100, y: -100, time: 0 };
    const ripples = [];
    let gameTarget = null;
    let lastVisibilityCheck = 0;
    let homeVisible = true;
    const fishPositions = [{}, {}, {}];
    const cursorKoi = { x: 0, y: 0, angle: 0, ready: false };
    const controlledKoi = { x: 0, y: 0, angle: 0, ready: false };
    const pressedKeys = new Set();
    const collectedInRun = new Set();
    const fishReactions = [
      { symbol: "!", until: 0, cooldown: 0 },
      { symbol: "♡", until: 0, cooldown: 0 },
      { symbol: "?", until: 0, cooldown: 0 },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (gameMode && !controlledKoi.ready) {
        controlledKoi.x = width * .14;
        controlledKoi.y = height * .52;
        controlledKoi.ready = true;
        gameTarget = { x: controlledKoi.x, y: controlledKoi.y, angle: 0, born: performance.now(), starts: [], scored: true };
      }
    };

    const addRipple = (x, y, force = false) => {
      const now = performance.now();
      const distance = Math.hypot(x - lastRipple.x, y - lastRipple.y);
      if (!force && (distance < 28 || now - lastRipple.time < 55)) return;
      ripples.push({ x, y, born: now, life: force ? 1250 : 950 });
      if (ripples.length > 18) ripples.shift();
      lastRipple = { x, y, time: now };
    };

    const reactFishNear = (pointerX, pointerY) => {
      const now = performance.now();
      if (gameMode) return;
      fishPositions.forEach((fish, index) => {
        if (fish.x === undefined || now < fishReactions[index].cooldown) return;
        if (Math.hypot(pointerX - fish.x, pointerY - fish.y) < 76) {
          fishReactions[index].until = now + 1050;
          fishReactions[index].started = now;
          fishReactions[index].cooldown = now + 1750;
        }
      });
    };

    const onPointerMove = (event) => {
      const canvasBounds = canvas.getBoundingClientRect();
      const pointerX = event.clientX - canvasBounds.left;
      const pointerY = event.clientY - canvasBounds.top;
      addRipple(pointerX, pointerY);
      reactFishNear(pointerX, pointerY);
    };
    const onPointerDown = (event) => {
      const canvasBounds = canvas.getBoundingClientRect();
      const pointerX = event.clientX - canvasBounds.left;
      const pointerY = event.clientY - canvasBounds.top;
      addRipple(pointerX, pointerY, true);
      reactFishNear(pointerX, pointerY);
      if (gameMode || event.target.closest?.(".game-mode-toggle")) return;
    };

    const onKeyDown = (event) => {
      if (!gameMode) return;
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
        event.preventDefault();
        pressedKeys.add(key);
      }
    };

    const onKeyUp = (event) => pressedKeys.delete(event.key.toLowerCase());

    const drawRipples = (now) => {
      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const ripple = ripples[i];
        const progress = (now - ripple.born) / ripple.life;
        if (progress >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        const eased = 1 - Math.pow(1 - progress, 3);
        ctx.save();
        ctx.translate(ripple.x, ripple.y);
        ctx.scale(1, 0.38);
        for (let ring = 0; ring < 3; ring += 1) {
          const delayed = Math.max(0, eased - ring * 0.1);
          const radius = 8 + delayed * (62 + ring * 13);
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, TAU);
          ctx.strokeStyle = `rgba(205, 255, 223, ${Math.max(0, (1 - progress) * (0.2 - ring * 0.045))})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }
    };

    const drawKoi = (now, variant = 0) => {
      // Keep the pond alive on devices that request reduced motion, but slow it
      // down instead of freezing it completely.
      const clock = (now / 1000) * (reducedMotion ? .35 : 1);
      const t = clock + variant * 17.35;
      const direction = variant === 1 ? -1 : 1;
      const swimSpeed = 34 + variant * 4;
      const routeWidth = width + 280;
      const route = ((clock * swimSpeed + variant * routeWidth * .34) % routeWidth + routeWidth) % routeWidth;
      const x = direction > 0 ? route - 140 : width + 140 - route;
      const laneOffset = [0, -0.11, 0.12][variant] || 0;
      const driftRate = .17 + variant * .012;
      const driftPhase = clock * driftRate + variant * 2.25;
      const y = height * (0.54 + laneOffset) + Math.sin(driftPhase) * height * .05;
      const dx = swimSpeed * direction;
      const dy = Math.cos(driftPhase) * height * .05 * driftRate;
      const angle = Math.atan2(dy, dx);
      const variantScale = [1, .76, .88][variant] || 1;
      const size = Math.max(0.34, Math.min(0.52, width / 2200)) * variantScale;
      const sway = Math.sin(t * 3.4);

      let fishX = x;
      let fishY = y;
      let fishAngle = angle;
      if (gameMode && gameTarget) {
        if (!cursorKoi.ready) {
          cursorKoi.x = gameTarget.x;
          cursorKoi.y = gameTarget.y;
          cursorKoi.angle = gameTarget.angle;
          cursorKoi.ready = true;
        }
        cursorKoi.x += (gameTarget.x - cursorKoi.x) * .16;
        cursorKoi.y += (gameTarget.y - cursorKoi.y) * .16;
        const turn = Math.atan2(
          Math.sin(gameTarget.angle - cursorKoi.angle),
          Math.cos(gameTarget.angle - cursorKoi.angle)
        );
        cursorKoi.angle += turn * .12;
        fishX = cursorKoi.x;
        fishY = cursorKoi.y;
        fishAngle = cursorKoi.angle;

      }

      const reaction = fishReactions[variant];
      const reacting = now < reaction.until;
      if (reacting) {
        const reactionProgress = Math.min(1, (now - reaction.started) / (reaction.until - reaction.started));
        const dart = Math.sin(reactionProgress * Math.PI) * 68;
        fishX -= direction * dart;
        fishY += Math.sin(reactionProgress * Math.PI * 2) * 5;
        if (reactionProgress > .08 && reactionProgress < .7) fishAngle += Math.PI;
      }

      fishPositions[variant] = { x: fishX, y: fishY };

      ctx.save();
      ctx.translate(fishX, fishY);
      ctx.rotate(fishAngle);
      ctx.scale(size, size);

      const renderAsciiKoi = true;
      if (renderAsciiKoi) {
      // Build the koi entirely from luminous typographic particles.
      const koiGlyphs = ["·", ".", ":", "+", "*", "="];
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "5.5px ui-monospace, SFMono-Regular, Consolas, monospace";
      ctx.shadowColor = "rgba(255, 255, 255, .9)";
      ctx.shadowBlur = 5.5;

      for (let px = -132; px <= 65; px += 5) {
        for (let py = -48; py <= 48; py += 5) {
          const tailWave = px < -39 ? sway * Math.pow((-px - 39) / 93, 1.3) * 18 : 0;
          const localY = py - tailWave;
          const bodyWidth = 5 + 14 * Math.max(0, Math.sin(((px + 43) / 108) * Math.PI));
          const body = px >= -43 && px <= 65 && Math.abs(localY) < bodyWidth;

          // Long, separated veil-tail lobes based on the tattoo silhouette.
          const tailProgress = Math.max(0, Math.min(1, (-px - 38) / 94));
          const tailCenter = 5 + tailProgress * 19;
          const tailThickness = 4 + Math.sin(tailProgress * Math.PI) * 7;
          const upperTail = px < -37 && px > -133 &&
            Math.abs(localY + tailCenter) < tailThickness;
          const lowerTail = px < -37 && px > -126 &&
            Math.abs(localY - tailCenter * .82) < tailThickness * .88;
          const tailJoin = px < -34 && px > -58 && Math.abs(localY) < 8;

          const upperFin = px > -14 && px < 25 && localY < -bodyWidth &&
            localY > -bodyWidth - 12 * Math.sin(((px + 14) / 39) * Math.PI);
          const lowerFin = px > -14 && px < 25 && localY > bodyWidth &&
            localY < bodyWidth + 12 * Math.sin(((px + 14) / 39) * Math.PI);
          if (!(body || upperTail || lowerTail || tailJoin || upperFin || lowerFin)) continue;

          const edgeDistance = body ? Math.max(0, 1 - Math.abs(localY) / Math.max(1, bodyWidth)) : .28;
          const faceDetail = px > 40 &&
            (Math.abs(localY - 7) < 3 || Math.abs(localY + 7) < 3);
          const pattern = Math.abs(Math.sin(px * .19 + localY * .31));
          const glyphIndex = faceDetail ? 5 : Math.min(5, Math.floor(edgeDistance * 3.2 + pattern * 2.2));
          const alpha = body ? .52 + edgeDistance * .46 : .38 + pattern * .3;
          const shimmer = Math.sin(t * 2.2 + px * .08 + py * .13) * .08;
          ctx.fillStyle = faceDetail
            ? "rgba(255, 255, 255, 1)"
            : `rgba(255, 255, 255, ${Math.max(.28, alpha + shimmer)})`;
          ctx.fillText(koiGlyphs[glyphIndex], px, py);
        }
      }

      // Small eyes stay legible while the surrounding glyphs shimmer.
      ctx.shadowBlur = 3;
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillText("o", 49, -6);
      ctx.fillText("o", 49, 6);
      if (reacting) {
        ctx.save();
        ctx.translate(8, -52);
        ctx.rotate(-fishAngle);
        ctx.font = "bold 25px ui-monospace, monospace";
        ctx.fillStyle = "rgba(255, 255, 255, .96)";
        ctx.shadowColor = "white";
        ctx.shadowBlur = 8;
        ctx.fillText(reaction.symbol, 0, 0);
        ctx.restore();
      }
      ctx.restore();
      } else {

      ctx.globalAlpha = 0.94;
      ctx.shadowColor = "rgba(220, 255, 235, .38)";
      ctx.shadowBlur = 18;

      // The veil-like tail moves a little farther than the body.
      ctx.save();
      ctx.translate(-54, 0);
      ctx.rotate(sway * .13);
      ctx.translate(54, 0);
      const finGradient = ctx.createLinearGradient(-105, -40, -18, 42);
      finGradient.addColorStop(0, "rgba(170, 205, 194, .12)");
      finGradient.addColorStop(.48, "rgba(242, 250, 246, .62)");
      finGradient.addColorStop(1, "rgba(167, 204, 192, .16)");
      ctx.fillStyle = finGradient;
      ctx.beginPath();
      ctx.moveTo(-54, 0);
      ctx.bezierCurveTo(-76, -11, -91, -37 - sway * 5, -111, -27 - sway * 10);
      ctx.quadraticCurveTo(-99, -5 - sway * 7, -106, 0);
      ctx.quadraticCurveTo(-98, 7 - sway * 7, -111, 28 - sway * 10);
      ctx.bezierCurveTo(-90, 37 - sway * 5, -75, 11, -54, 0);
      ctx.fill();

      // Fine rays give the translucent fins a hand-drawn quality.
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(235, 255, 246, .3)";
      ctx.lineWidth = .7;
      [-16, -8, 8, 16].forEach((offset) => {
        ctx.beginPath();
        ctx.moveTo(-57, offset * .18);
        ctx.quadraticCurveTo(-84, offset * 1.15 - sway * 3, -106, offset - sway * 7);
        ctx.stroke();
      });
      ctx.restore();

      ctx.fillStyle = finGradient;
      ctx.beginPath();
      ctx.moveTo(22, -19);
      ctx.bezierCurveTo(13, -39, -13, -52, -29, -45 + sway * 3);
      ctx.quadraticCurveTo(-23, -21, 5, -8);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(22, 19);
      ctx.bezierCurveTo(13, 39, -13, 52, -29, 45 - sway * 3);
      ctx.quadraticCurveTo(-23, 21, 5, 8);
      ctx.fill();

      // A soft submerged shadow gives the fish volume above the water plane.
      ctx.save();
      ctx.translate(1, 5);
      ctx.filter = "blur(5px)";
      ctx.fillStyle = "rgba(0, 10, 6, .42)";
      ctx.beginPath();
      ctx.moveTo(-64, 0);
      ctx.bezierCurveTo(-47, -17, -11, -25, 24, -22);
      ctx.bezierCurveTo(47, -19, 62, -10, 67, 0);
      ctx.bezierCurveTo(62, 10, 47, 19, 24, 22);
      ctx.bezierCurveTo(-11, 25, -47, 17, -64, 0);
      ctx.fill();
      ctx.restore();

      ctx.shadowBlur = 18;
      const body = ctx.createRadialGradient(15, -7, 1, 3, 0, 76);
      body.addColorStop(0, "rgba(255, 255, 252, 1)");
      body.addColorStop(.3, "rgba(244, 249, 245, 1)");
      body.addColorStop(.62, "rgba(207, 224, 216, .98)");
      body.addColorStop(.86, "rgba(151, 181, 168, .9)");
      body.addColorStop(1, "rgba(82, 115, 101, .72)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.moveTo(-66, 0);
      ctx.bezierCurveTo(-52, -13, -25, -23, 8, -26);
      ctx.bezierCurveTo(35, -28, 58, -17, 67, -4);
      ctx.quadraticCurveTo(70, 0, 67, 4);
      ctx.bezierCurveTo(58, 17, 35, 28, 8, 26);
      ctx.bezierCurveTo(-25, 23, -52, 13, -66, 0);
      ctx.fill();

      ctx.shadowBlur = 0;
      // Pearl scales catch the light without turning the white koi grey.
      ctx.strokeStyle = "rgba(76, 119, 101, .2)";
      ctx.lineWidth = .55;
      for (let column = -45; column <= 31; column += 8) {
        for (let row = -2; row <= 2; row += 1) {
          const stagger = (Math.abs(Math.round(column / 8)) % 2) * 3.3;
          const scaleY = row * 6.5 + stagger;
          const bodyHalfWidth = 20 + Math.cos((column + 5) / 82 * Math.PI) * 5;
          if (Math.abs(scaleY) < bodyHalfWidth - 3) {
            ctx.beginPath();
            ctx.arc(column, scaleY, 4.4, -.15 * Math.PI, 1.15 * Math.PI);
            ctx.stroke();
          }
        }
      }

      // Soft dorsal ridge and an opalescent highlight.
      const shine = ctx.createLinearGradient(-35, -15, 45, 10);
      shine.addColorStop(0, "rgba(255,255,255,0)");
      shine.addColorStop(.5, "rgba(255,255,255,.52)");
      shine.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = shine;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-37, -8); ctx.quadraticCurveTo(4, -18, 43, -8);
      ctx.stroke();

      // A narrow moving glint suggests wet, metallic platinum scales.
      ctx.save();
      ctx.globalAlpha = .16;
      ctx.translate(Math.sin(t * .8) * 16, 0);
      ctx.strokeStyle = "rgba(255, 255, 255, .95)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-20, -18); ctx.quadraticCurveTo(0, 0, -20, 18);
      ctx.stroke();
      ctx.restore();

      // Face, glassy eyes, mouth, and traditional koi barbels.
      ctx.strokeStyle = "rgba(67, 105, 89, .42)";
      ctx.lineWidth = .8;
      ctx.beginPath();
      ctx.moveTo(36, -21); ctx.quadraticCurveTo(28, 0, 36, 21);
      ctx.stroke();
      ctx.fillStyle = "rgba(4, 11, 8, .96)";
      ctx.beginPath(); ctx.ellipse(50, -9, 2.8, 2.2, -.2, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(50, 9, 2.8, 2.2, .2, 0, TAU); ctx.fill();
      ctx.fillStyle = "rgba(255, 255, 255, .8)";
      ctx.beginPath(); ctx.arc(47.8, -8.8, .8, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(47.8, 7.2, .8, 0, TAU); ctx.fill();
      ctx.fillStyle = "rgba(49, 77, 64, .5)";
      ctx.beginPath(); ctx.arc(60, -3.5, .75, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(60, 3.5, .75, 0, TAU); ctx.fill();
      ctx.strokeStyle = "rgba(95, 130, 115, .6)";
      ctx.lineWidth = .75;
      ctx.beginPath(); ctx.arc(59, 0, 4, -.7, .7); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(58, -5); ctx.quadraticCurveTo(68, -12, 72, -8);
      ctx.moveTo(58, 5); ctx.quadraticCurveTo(68, 12, 72, 8);
      ctx.stroke();
      ctx.restore();
      }
    };

    const render = (now) => {
      const elapsed = now - lastTime;
      if (elapsed > 12) {
        ctx.clearRect(0, 0, width, height);
        if (gameMode && controlledKoi.ready) {
          let moveX = (pressedKeys.has("arrowright") || pressedKeys.has("d") ? 1 : 0) -
            (pressedKeys.has("arrowleft") || pressedKeys.has("a") ? 1 : 0);
          let moveY = (pressedKeys.has("arrowdown") || pressedKeys.has("s") ? 1 : 0) -
            (pressedKeys.has("arrowup") || pressedKeys.has("w") ? 1 : 0);
          const distance = Math.min(40, elapsed) / 1000 * 190;
          if (moveX || moveY) {
            const magnitude = Math.hypot(moveX, moveY);
            moveX /= magnitude;
            moveY /= magnitude;
            controlledKoi.x = Math.max(35, Math.min(width - 35, controlledKoi.x + moveX * distance));
            controlledKoi.y = Math.max(105, Math.min(height - 35, controlledKoi.y + moveY * distance));
            controlledKoi.angle = Math.atan2(moveY, moveX);
          }
          gameTarget = { x: controlledKoi.x, y: controlledKoi.y, angle: controlledKoi.angle, born: now, starts: [], scored: true };
          const maxScroll = Math.max(0, document.documentElement.scrollHeight - height);
          if (moveY > 0 && controlledKoi.y > height * .76 && window.scrollY < maxScroll) {
            window.scrollBy(0, distance * .85);
            controlledKoi.y = height * .76;
          } else if (moveY < 0 && controlledKoi.y < height * .28 && window.scrollY > 0) {
            window.scrollBy(0, -distance * .85);
            controlledKoi.y = height * .28;
          }
          pearlsRef.current.forEach((pearl, index) => {
            if (collectedInRun.has(index)) return;
            const pearlX = pearl.x;
            const pearlY = pearl.y - window.scrollY;
            if (Math.hypot(controlledKoi.x - pearlX, controlledKoi.y - pearlY) < 31) {
              collectedInRun.add(index);
              setCollectedPearls((collected) => [...collected, index]);
            }
          });

        }
        if (now - lastVisibilityCheck > 120) {
          lastVisibilityCheck = now;
          const home = document.getElementById("text");
          if (home) {
            const homeBounds = home.getBoundingClientRect();
            homeVisible = homeBounds.bottom > 0 && homeBounds.top < height;
          }
        }
        if (gameMode || homeVisible) {
          drawRipples(now);
          drawKoi(now, 0);
          if (!gameMode) {
            drawKoi(now, 1);
            drawKoi(now, 2);
          }
        }
        lastTime = now;
      }
      frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [gameMode]);

  return (
    <>
      <canvas ref={canvasRef} className="koi-pond" aria-hidden="true" />
      {gameMode && (
        <div className="pond-game-layer moonlit moon-pearl-game">
          {showScrollHint && (
            <div className="koi-scroll-hint" role="status">
              <strong>collect the moon pearls!</strong>
              <span>guide me around to collect the moon pearls through my portfolio & click the “i” button (next to the game mode toggle) for details.</span>
            </div>
          )}
          <div className="pearl-counter">
            <strong>{collectedPearls.length}</strong><span>/ 10</span>
          </div>
          <div className="pond-dpad" aria-label="Koi movement controls" onContextMenu={(event) => event.preventDefault()}>
            <button className={`dpad-up ${mobileDirection === "ArrowUp" ? "active" : ""}`} aria-label="Swim up" onPointerDown={(event) => startControl(event, "ArrowUp")} onPointerUp={(event) => endControl(event, "ArrowUp")} onPointerCancel={(event) => endControl(event, "ArrowUp")} onPointerLeave={(event) => endControl(event, "ArrowUp")}>↑</button>
            <button className={`dpad-left ${mobileDirection === "ArrowLeft" ? "active" : ""}`} aria-label="Swim left" onPointerDown={(event) => startControl(event, "ArrowLeft")} onPointerUp={(event) => endControl(event, "ArrowLeft")} onPointerCancel={(event) => endControl(event, "ArrowLeft")} onPointerLeave={(event) => endControl(event, "ArrowLeft")}>←</button>
            <button className={`dpad-down ${mobileDirection === "ArrowDown" ? "active" : ""}`} aria-label="Swim down" onPointerDown={(event) => startControl(event, "ArrowDown")} onPointerUp={(event) => endControl(event, "ArrowDown")} onPointerCancel={(event) => endControl(event, "ArrowDown")} onPointerLeave={(event) => endControl(event, "ArrowDown")}>↓</button>
            <button className={`dpad-right ${mobileDirection === "ArrowRight" ? "active" : ""}`} aria-label="Swim right" onPointerDown={(event) => startControl(event, "ArrowRight")} onPointerUp={(event) => endControl(event, "ArrowRight")} onPointerCancel={(event) => endControl(event, "ArrowRight")} onPointerLeave={(event) => endControl(event, "ArrowRight")}>→</button>
          </div>
          {pearls.map((pearl, index) => !collectedPearls.includes(index) && (
            <i className="moon-pearl" key={index} style={{ left: `${pearl.x}px`, top: `${pearl.y}px`, animationDelay: `${-index * .19}s` }} />
          ))}
        </div>
      )}
      {showCompletion && (
        <div className="game-complete-backdrop">
          <section className="game-complete-modal" role="dialog" aria-modal="true" aria-labelledby="game-complete-title">
            <span className="complete-sparkle">✦</span>
            <p className="complete-eyebrow">ALL 10 PEARLS FOUND</p>
            <h2 id="game-complete-title">yay, you did it!</h2>
            <p>hopefully that was a calmer way to explore my portfolio. feel free to wander through again.</p>
            <div className="complete-actions">
              <button type="button" onClick={playAgain}>play again</button>
              <button type="button" className="complete-secondary" onClick={() => setShowCompletion(false)}>back to portfolio</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

import {useEffect, useRef} from 'react';
import koi from '../assets/new design/koilh-transparent.png';

export default function PondBackground() {
 const surface=useRef(null);
 useEffect(()=>{
  const canvas=surface.current;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(!canvas || reduced.matches) return undefined;
  const ctx=canvas.getContext('2d');
  if(!ctx) return undefined;
  let width=0,height=0,frame=0,lastDrop=0,lastPoint=null;
  let ripples=[];
  const resize=()=>{
   const bounds=canvas.getBoundingClientRect();
   width=bounds.width || window.innerWidth; height=bounds.height || window.innerHeight;
   const ratio=Math.min(window.devicePixelRatio || 1,2);
   canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio);
   ctx.setTransform(ratio,0,0,ratio,0,0); ripples=[];
  };
  const paint=now=>{
   ctx.clearRect(0,0,width,height);
   ripples=ripples.filter(drop=>now-drop.born<1600);
   ripples.forEach(drop=>{
    const age=(now-drop.born)/1600;
    [0,.18].forEach(delay=>{
     if(age<delay) return;
     const progress=(age-delay)/(1-delay);
     ctx.beginPath();
     ctx.ellipse(drop.x,drop.y,5+progress*75,5+progress*61,0,0,Math.PI*2);
     ctx.strokeStyle='rgba(166,203,214,'+((1-progress)*.23)+')';
     ctx.lineWidth=.8;ctx.stroke();
    });
    if(age<.3) {
     const burst=age/.3;
     for(let i=0;i<5;i++){
      const angle=i*Math.PI*2/5;
      ctx.beginPath();
      ctx.arc(drop.x+Math.cos(angle)*burst*20,drop.y+Math.sin(angle)*burst*15-Math.sin(burst*Math.PI)*9,1.2*(1-burst)+.3,0,Math.PI*2);
      ctx.fillStyle='rgba(195,222,230,'+((1-burst)*.45)+')';ctx.fill();
     }
    }
   });
   frame=ripples.length?window.requestAnimationFrame(paint):0;
  };
  const drop=event=>{
   if(reduced.matches || document.hidden || event.target?.closest?.('input,textarea,button,a')) return;
   const now=performance.now();
   const distance=lastPoint?Math.hypot(event.clientX-lastPoint.x,event.clientY-lastPoint.y):Infinity;
   if(event.type!=='pointerdown' && (now-lastDrop<95 || distance<24)) return;
   const bounds=canvas.getBoundingClientRect();
   ripples.push({x:event.clientX-bounds.left,y:event.clientY-bounds.top,born:now});
   if(ripples.length>20) ripples.shift();
   lastDrop=now;lastPoint={x:event.clientX,y:event.clientY};
   if(!frame) frame=window.requestAnimationFrame(paint);
  };
  const clear=()=>{
   window.cancelAnimationFrame(frame);frame=0;ripples=[];lastPoint=null;
   ctx.clearRect(0,0,width,height);
  };
  resize();
  window.addEventListener('resize',resize);
  window.addEventListener('pointermove',drop,{passive:true});
  window.addEventListener('pointerdown',drop,{passive:true});
  document.addEventListener('visibilitychange',clear);
  reduced.addEventListener?.('change',clear);
  return()=>{
   clear();window.removeEventListener('resize',resize);
   window.removeEventListener('pointermove',drop);window.removeEventListener('pointerdown',drop);
   document.removeEventListener('visibilitychange',clear);reduced.removeEventListener?.('change',clear);
  };
 },[]);
 return <div className="pond-background" aria-hidden="true">
  <div className="water-reflections"><div className="sky-stars"/></div>
  <div className="pond-koi pond-koi--one"><img src={koi} alt=""/></div>
  <div className="pond-koi pond-koi--two"><img src={koi} alt=""/></div>
  <canvas className="water-ripples" ref={surface}/>
 </div>;
}

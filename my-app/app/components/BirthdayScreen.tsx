"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, Bus, Star, Cake, PartyPopper, Heart, Flower2 } from "lucide-react";

export default function BirthdayScreen({ onNext }: { onNext: () => void }) {
  const [daysCount, setDaysCount] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsContainerRef = useRef<HTMLDivElement>(null);
  const nameRowRef = useRef<HTMLDivElement>(null);
  const [candleClicks, setCandleClicks] = useState(0);
  const cakeIcons = ['🎂','🎂','🎂','🥳','🎉'];
  const [cakeLabel, setCakeLabel] = useState("Tap 3 times to blow the candles!");
  const [cakeLabelColor, setCakeLabelColor] = useState("");
  const [blowAnim, setBlowAnim] = useState(false);

  useEffect(() => {
    const bday = new Date('2005-07-27');
    const on21 = new Date('2026-07-27');
    setDaysCount(Math.floor((on21.getTime() - bday.getTime()) / 86400000).toLocaleString('en-IN'));

    const cv = canvasRef.current;
    if (cv) {
      const ctx = cv.getContext('2d');
      if (ctx) {
        cv.width = window.innerWidth;
        cv.height = window.innerHeight;
        const cols = ['#ff9a9e','#fecfef','#f48fb1','#fbc2eb','#ce93d8','#f8bbd0'];
        const ps = Array.from({length: 100}, () => ({
          x: Math.random() * cv.width,
          y: Math.random() * -cv.height,
          w: 5 + Math.random() * 7,
          h: 5 + Math.random() * 7,
          c: cols[Math.floor(Math.random() * cols.length)],
          spd: 1.5 + Math.random() * 2.5,
          sw: Math.random() * 2 - 1,
          rot: Math.random() * 360,
          rs: Math.random() * 4 - 2,
          ph: Math.random() * Math.PI * 2,
          op: 0.6 + Math.random() * 0.4,
          ci: Math.random() > 0.5
        }));
        let fr = 0;
        let animId: number;
        const anim = () => {
          ctx.clearRect(0, 0, cv.width, cv.height);
          ps.forEach(p => {
            p.y += p.spd;
            p.x += Math.sin(fr * 0.02 + p.ph) * p.sw * 0.2;
            p.rot += p.rs;
            if (p.y > cv.height + 20) { p.y = -20; p.x = Math.random() * cv.width; }
            ctx.save();
            ctx.globalAlpha = p.op;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.c;
            if (p.ci) {
              ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill();
            } else {
              ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            }
            ctx.restore();
          });
          fr++;
          animId = requestAnimationFrame(anim);
        };
        anim();
        setTimeout(() => ps.forEach(p => p.spd = 0), 6000);
        const handleResize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
        window.addEventListener('resize', handleResize);
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
      }
    }
  }, []);

  useEffect(() => {
    if (nameRowRef.current) {
      nameRowRef.current.innerHTML = '';
      const name = 'Kannumon';
      [...name].forEach((ch, i) => {
        const sp = document.createElement('span');
        sp.className = 'nl';
        sp.textContent = ch;
        sp.style.animationDelay = (0.9 + i * 0.09) + 's';
        sp.style.animationPlayState = 'running';
        nameRowRef.current?.appendChild(sp);
      });
    }
    if (heartsContainerRef.current) {
      heartsContainerRef.current.innerHTML = '';
      const em = ['💕','💖','💗','💓','🌸','✨','⭐'];
      for (let i = 0; i < 14; i++) {
        const el = document.createElement('div');
        el.className = 'fh';
        el.textContent = em[Math.floor(Math.random() * em.length)];
        el.style.left = Math.random() * 90 + 'vw';
        el.style.fontSize = (12 + Math.random() * 12) + 'px';
        const dur = 7 + Math.random() * 8;
        el.style.animationDuration = dur + 's';
        el.style.animationDelay = (Math.random() * -dur) + 's';
        heartsContainerRef.current.appendChild(el);
      }
    }
  }, []);

  const handleCakeClick = () => {
    const nextCount = candleClicks + 1;
    setCandleClicks(nextCount);
    setBlowAnim(false);
    setTimeout(() => setBlowAnim(true), 10);
    if (nextCount >= 3) {
      setCakeLabel('Happy Birthday Kannumon!! 🎊✨');
      setCakeLabelColor('var(--rose)');
      for (let i = 0; i < 14; i++) {
        setTimeout(() => {
          const el = document.createElement('div');
          const em = ['💖','⭐','✨','🌸','💫','🎊'];
          el.style.cssText = `position:fixed;font-size:${18+Math.random()*16}px;left:${Math.random()*85+5}vw;top:${Math.random()*80+5}vh;pointer-events:none;z-index:999;opacity:0;animation:popIn .4s ease forwards`;
          el.textContent = em[Math.floor(Math.random() * em.length)];
          document.body.appendChild(el);
          setTimeout(() => el.remove(), 1800);
        }, i * 80);
      }
    }
  };

  return (
    <div id="birthday" className="screen active" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div className="fhearts" ref={heartsContainerRef} />
      {/* Scrollable content area */}
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '100px' }}>
        <div className="bd-wrap">
          <div className="psych">😂 Hyyyy, Kittiyeeeeeee</div>
          <div className="psych-sub">Nee Enk ticket book chyvaanoo <Bus size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} /></div>

          <div className="name-row" ref={nameRowRef} />
          <div className="bd-sub">Happy Birthday, my Kannumon <Star size={20} fill="currentColor" color="var(--gold)" style={{ display: 'inline', verticalAlign: 'middle' }} /></div>
          <div className="bd-em" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <Cake size={24} color="#D4A55A" /> 
            <PartyPopper size={24} color="var(--rose)" /> 
            <Heart size={24} fill="currentColor" color="var(--rose)" /> 
            <Flower2 size={24} color="#D4A55A" />
          </div>

          <div className="cake-sec">
            <div className="cake-lbl">👇 TAP THE CAKE</div>
            <span
              className="cake-em"
              onClick={handleCakeClick}
              style={{ animation: blowAnim ? 'blowAnim 0.5s ease-out' : undefined }}
            >
              {cakeIcons[Math.min(candleClicks, cakeIcons.length - 1)]}
            </span>
            <div className="cake-lbl" style={{ color: cakeLabelColor || '#9C4D6E', fontWeight: cakeLabelColor ? 700 : 600 }}>
              {cakeLabel}
            </div>
          </div>

          <div className="stats-c">
            <p>You are now <span className="shi">21 years</span> old. 🥳</p>
            <p>That&apos;s <span className="shi">{daysCount}</span> days since the universe gave me my everything.</p>
            <p style={{ marginTop: '6px' }}>
              <span className="shi">You are my all, Kannumon. Every single second with you is a blessing I will cherish forever. 💛</span>
            </p>
          </div>

          {/* BUTTON IN NORMAL SCROLL FLOW */}
          <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={onNext}
              style={{
                width: '100%',
                maxWidth: '280px',
                padding: '14px 20px',
                background: 'linear-gradient(135deg, #C2185B, #AD1457)',
                border: 'none',
                borderRadius: '100px',
                fontFamily: "'Nunito', sans-serif",
                fontSize: '16px',
                fontWeight: 800,
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(194,24,91,0.4)',
                minHeight: '50px',
              }}
            >
              Our 1.3 Years 🌸
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

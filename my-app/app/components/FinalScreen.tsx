"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Star, Sparkles, Heart } from "lucide-react";

export default function FinalScreen({ onBack, onUnlockVoice }: { onBack: () => void; onUnlockVoice: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [starClicks, setStarClicks] = useState(0);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    cv.width = window.innerWidth;
    cv.height = window.innerHeight;

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      r: 0.3 + Math.random() * 1.8,
      op: 0.15 + Math.random() * 0.85,
      tw: 0.02 + Math.random() * 0.05,
      ph: Math.random() * Math.PI * 2
    }));

    const shooters: { x: number, y: number, vx: number, vy: number, life: number }[] = [];
    const shooterInterval = setInterval(() => {
      shooters.push({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height * 0.5,
        vx: 3 + Math.random() * 5,
        vy: 1 + Math.random() * 3,
        life: 1
      });
    }, 3500);

    let fr = 0;
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      fr += 0.02;
      stars.forEach(s => {
        ctx.globalAlpha = s.op * (0.4 + 0.6 * Math.sin(fr * s.tw / 0.02 + s.ph));
        ctx.fillStyle = 'rgba(255, 200, 220, 0.9)';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        ctx.globalAlpha = s.life * 0.7;
        const gr = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12);
        gr.addColorStop(0, '#ff9a9e');
        gr.addColorStop(1, 'transparent');
        ctx.strokeStyle = gr;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14);
        ctx.stroke();
        s.x += s.vx; s.y += s.vy; s.life -= 0.015;
        if (s.life <= 0) shooters.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); clearInterval(shooterInterval); window.removeEventListener('resize', handleResize); };
  }, []);

  const handleStarClick = () => {
    const nextClicks = starClicks + 1;
    setStarClicks(nextClicks);
    if (nextClicks >= 5) onUnlockVoice();
  };

  return (
    <div id="final" className="screen active">
      <canvas ref={canvasRef} id="star-canvas" />

      <div className="top-nav" style={{ zIndex: 20 }}>
        <button className="btn-back" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.15)' }} onClick={onBack}>
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      <div className="final-c">
        <div style={{ height: '60px', width: '100%', flexShrink: 0 }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <div className="star-icon" onClick={handleStarClick}>
            <Star size={64} fill="currentColor" />
            <div className={`scc ${starClicks > 0 && starClicks < 5 ? 'v' : ''}`}>{starClicks}</div>
          </div>
          <div className="star-indicator">Tap 5 times for a secret! <Sparkles size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} /></div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <span className="nm">Kannumon</span>
          <span className="nm-m">= The Star <Star size={16} fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px', color: 'var(--gold)' }} /></span>
          <div className="nm-t">From Sanskrit &ldquo;Nakshatra&rdquo; — a luminous body in the sky</div>
        </div>

        <div className="final-msg">
          <p>&ldquo;You were always the brightest thing in my sky. Before I knew your name, before I knew your laugh — before you looked at me with those sparkling eyes at the office door —</p>
          <p>— there was already a star-shaped space in my heart, waiting for you.&rdquo;</p>
          <div className="final-ml">I will love you forever, in this life and the next... <Heart size={16} fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px', color: 'var(--rose)' }} /></div>
          <div className="final-de">
            &ldquo;Du bist mein Stern. Schein hell in &Ouml;sterreich, meine Liebe.&rdquo;<br />
            <span style={{ fontSize: '11px', opacity: 0.45 }}>(You are my star. Shine bright in Austria, my love.)</span>
          </div>
        </div>

        <div className="final-sign"><span className="kj">Your Kunja</span> &mdash; Akshai &mdash; Kunja 🦊</div>
        
        <div style={{ height: '120px', width: '100%', flexShrink: 0 }}></div>
      </div>
    </div>
  );
}

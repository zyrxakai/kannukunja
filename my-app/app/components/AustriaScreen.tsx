"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AustriaScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });
  const [stars, setStars] = useState<{ sz: number, x: number, y: number, dur: number, del: number }[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: 80 }, () => ({
      sz: 0.8 + Math.random() * 2.2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      dur: 2 + Math.random() * 4,
      del: Math.random() * 4
    })));
  }, []);

  useEffect(() => {
    const target = new Date('2027-07-27T00:00:00').getTime();
    const update = () => {
      const diff = target - new Date().getTime();
      if (diff <= 0) return;
      setTimeLeft({
        d: Math.floor(diff / 86400000).toString(),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="austria" className="screen active">
      <div className="sbg">
        {stars.map((s, i) => (
          <div key={i} className="sbg-s" style={{ width: `${s.sz}px`, height: `${s.sz}px`, left: `${s.x}%`, top: `${s.y}%`, animationDuration: `${s.dur}s`, animationDelay: `${s.del}s` }} />
        ))}
      </div>

      <div className="top-nav" style={{ zIndex: 20 }}>
        <button className="btn-back" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', borderColor: 'rgba(255,255,255,0.15)' }} onClick={onBack}>
          <ChevronLeft size={16} /> Back
        </button>
        <button className="btn-next" onClick={onNext}>Memory Jar <ChevronRight size={15} /></button>
      </div>

      <div className="at-scroll">
        <div className="at-hdr">
          <h2>Kerala → Austria ✈️</h2>
          <p>You&apos;re going far, Kannumon. So beautifully far.</p>
        </div>

        <svg className="fsvg" viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg">
          <path id="fc" d="M 40 110 Q 150 15 260 45" className="fp" />
          <circle cx="40" cy="110" r="5" fill="#e8799a" />
          <text x="8" y="128" fill="#e8799a" fontSize="9" fontFamily="DM Sans, sans-serif">🌺 Kerala</text>
          <circle cx="260" cy="45" r="5" fill="#93c5fd" />
          <text x="222" y="40" fill="#93c5fd" fontSize="9" fontFamily="DM Sans, sans-serif">🏔️ Austria</text>
          <text fontSize="17" textAnchor="middle" dominantBaseline="middle">
            <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
              <mpath href="#fc" />
            </animateMotion>
            ✈️
          </text>
        </svg>

        <div className="at-q">
          <p>&ldquo;You&apos;re going to Austria to become the most incredible version of your Kunjaelf. And even from 5,000 kilometres away — you are still my Kannumon.&rdquo;</p>
          <div className="mlq">എന്റെ ലോകം എവിടെ പോയാലും, എന്റേതായിട്ടിരിക്കും 💕</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '6px', fontFamily: 'var(--font-sans)' }}>(Wherever you go, I am there — inside you)</div>
        </div>

        <div className="cd-card">
          <div className="cd-lbl">⏳ Every second until we meet again</div>
          <div className="cd-grid">
            <div className="cd-u"><div className="cd-n">{timeLeft.d}</div><div className="cd-l">Days</div></div>
            <div className="cd-u"><div className="cd-n">{timeLeft.h}</div><div className="cd-l">Hours</div></div>
            <div className="cd-u"><div className="cd-n">{timeLeft.m}</div><div className="cd-l">Mins</div></div>
            <div className="cd-u"><div className="cd-n">{timeLeft.s}</div><div className="cd-l">Secs</div></div>
          </div>
          <div className="promise">I&apos;ll be right here, waiting. ❤️</div>
        </div>
      </div>
    </div>
  );
}

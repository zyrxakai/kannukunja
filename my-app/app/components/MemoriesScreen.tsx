"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const mems = [
  { em: '👀', ti: 'The Sparkle Eyes', tx: "Annu makkal pokannneram ennod nte kannil nokku chodich Njn poit varatte varatte njn...' — I looked into your eyes and saw the whole universe. Stars. Literal sparkles. I knew right then.", ml: 'I saw my future in those eyes. 💕' },
  { em: '📞', ti: 'Late Night Calls', tx: "Those calls that started with 'just 5 minutes' and ended at 2am. I never wanted them to end. Your voice at night was the safest feeling in the world.", ml: "I didn't want to sleep when I could hear your voice... ♥" },
  { em: '☀️', ti: 'Every Good Morning', tx: "You were the first thought every morning. Not work, not my alarm — you. 'Is she awake yet?' You made mornings worth waking up for.", ml: 'Every morning is with you 🌅' },
  { em: '😂', ti: 'Our Stupid Jokes', tx: 'No one else would understand them. The way we make each other cry-laughing at the most ridiculous things — that is our language.', ml: "You're most beautiful when you laugh 😍" },
  { em: '🥺', ti: "When You're Upset", tx: "Even those moments I wouldn't trade. Because fixing things with you, hearing you laugh again — the moment your smile returns — worth every second.", ml: 'I would do anything to see your smile ❤️' },
  { em: '💌', ti: '474 Days, Zero Misses', tx: '1.3 years. Not one single day without talking, seeing, loving. Do you realise how rare that is? Most people never find this. We found it in each other.', ml: 'Not a single day without you 💕' },
  { em: '⭐', ti: 'The Best Day of My Life', tx: "It wasn't some grand moment. It was a random ordinary day when I realised — with you, every ordinary day is extraordinary. That is the gift you gave me.", ml: 'I will never leave you. Never. 💖' }
];

export default function MemoriesScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [activeMem, setActiveMem] = useState<number | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const jarWrapRef = useRef<HTMLDivElement>(null);

  const shakeJar = () => {
    if (isShaking) return;
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
    const em = ['💕', '💖', '⭐', '🌸', '✨'];
    const b = document.createElement('div');
    b.className = 'jmb';
    b.textContent = em[Math.floor(Math.random() * em.length)];
    b.style.left = (38 + Math.random() * 24) + '%';
    b.style.top = '15%';
    if (jarWrapRef.current) {
      jarWrapRef.current.appendChild(b);
      setTimeout(() => b.remove(), 1300);
    }
  };

  return (
    <>
      <div id="memories" className="screen active">
        <div className="top-nav">
          <button className="btn-back" onClick={onBack}><ChevronLeft size={16} /> Back</button>
          <button className="btn-next" onClick={onNext}>Final Surprise <ChevronRight size={15} /></button>
        </div>

        <div className="mem-scroll">
          <div className="sec-hdr">
            <h2>A Jar Full of Us</h2>
            <p>Tap each memory to open it 🫙</p>
          </div>

          <div className="jar-wrap" ref={jarWrapRef}>
            <svg
              className="jar-svg"
              viewBox="0 0 140 180"
              onClick={shakeJar}
              style={{ transform: isShaking ? 'rotate(-10deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}
            >
              <defs>
                <linearGradient id="jg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(212,165,90,.12)" />
                  <stop offset="50%" stopColor="rgba(212,165,90,.45)" />
                  <stop offset="100%" stopColor="rgba(212,165,90,.12)" />
                </linearGradient>
                <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4a55a" />
                  <stop offset="100%" stopColor="#9a6e2e" />
                </linearGradient>
              </defs>
              <rect x="26" y="8" width="88" height="20" rx="5" fill="url(#lg2)" />
              <rect x="31" y="4" width="78" height="9" rx="4" fill="#d4a55a" />
              <path d="M 21 28 L 16 158 Q 70 173 124 158 L 119 28 Z" fill="url(#jg)" stroke="rgba(212,165,90,.4)" strokeWidth="1.5" />
              <path d="M 31 38 L 29 138 Q 36 143 44 138 L 44 38 Z" fill="rgba(255,255,255,.1)" />
              <text x="56" y="78" fontSize="17" opacity=".85">💗</text>
              <text x="76" y="108" fontSize="13" opacity=".7">⭐</text>
              <text x="46" y="120" fontSize="11" opacity=".6">🌸</text>
              <text x="86" y="90" fontSize="9" opacity=".5">✨</text>
            </svg>
          </div>

          <div className="mem-grid">
            {mems.map((m, i) => (
              <div key={i} className={`mc ${i === mems.length - 1 ? 'fw' : ''}`} onClick={() => setActiveMem(i)}>
                <span className="mc-em">{m.em}</span>
                <div className="mc-ti">{m.ti}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeMem !== null && (
        <div id="mem-modal" style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-bg" onClick={() => setActiveMem(null)} />
          <div className="modal-card">
            <button onClick={() => setActiveMem(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(194,24,91,0.1)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--rose)' }}>
              <X size={16} />
            </button>
            <span className="m-em">{mems[activeMem].em}</span>
            <div className="m-ti">{mems[activeMem].ti}</div>
            <div className="m-tx">{mems[activeMem].tx}</div>
            {mems[activeMem].ml && <div className="m-ml">{mems[activeMem].ml}</div>}
            <button className="m-close" onClick={() => setActiveMem(null)}>Close Memory 💕</button>
          </div>
        </div>
      )}
    </>
  );
}

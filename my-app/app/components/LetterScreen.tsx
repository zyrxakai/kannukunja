"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";

const lparts = [
  { id: 'lp1', t: 'I have been thinking about what to write for days. How do you put 1.3 years of laughter, late nights, tears, and stupid inside jokes into words? You simply cannot. But I am going to try, because you deserve every effort I can give.' },
  { id: 'lp2', t: 'Today you turn 21. And I want you to know — the world got infinitely better the day you were born. You are smart, funny, annoyingly beautiful, and you are mine. (Okay, mostly mine 😌)' },
  { id: 'lp3', t: 'You are going to Austria. That thought terrifies me and fills me with pride at the same time. You are going to go so far, Kannumon. Not just in distance — but in life. You are made for great things.' },
  { id: 'lml', t: 'I will never forget you. Never. 💕' },
  { id: 'lp4', t: 'Distance is just a number. Time zones are just mathematics. And my love for you — it does not care about either of those things. I will be here every single morning, thinking of you.' },
  { id: 'lp5', t: 'So go shine, my star. Go learn, grow, conquer Austria. I will be waiting — not because I have to — but because there is nowhere else in this world I would rather wait than right here, for you.' }
];

export default function LetterScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [displayedText, setDisplayedText] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) return;
    setStarted(true);
    let idx = 0;
    const nextPart = () => {
      if (idx >= lparts.length) return;
      const part = lparts[idx++];
      let charIdx = 0;
      const interval = setInterval(() => {
        if (charIdx >= part.t.length) {
          clearInterval(interval);
          setDisplayedText(prev => ({ ...prev, [part.id]: part.t }));
          setTimeout(nextPart, 260);
          return;
        }
        setDisplayedText(prev => ({ ...prev, [part.id]: part.t.substring(0, charIdx + 1) }));
        charIdx++;
      }, 18);
    };
    setTimeout(nextPart, 500);
  }, [started]);

  return (
    <div id="letter" className="screen active">
      <div className="top-nav">
        <button className="btn-back" onClick={onBack}><ChevronLeft size={16} /> Back</button>
        <button className="btn-next" onClick={onNext}>Austria <ChevronRight size={15} /></button>
      </div>

      <div className="letter-scroll">
        <div style={{ height: '80px', width: '100%', flexShrink: 0 }}></div>
        <div className="env-wrap">
          <div className="env-body">
            <div className="ltr-from">A letter for you, Kannumon...</div>
            <div className="ltr-greet">My dearest Babadiii,</div>

            <div className="ltr-body">
              <div className="hs" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}><Mail size={32} color="var(--rose)" strokeWidth={2} /></div>
              <p id="lp1">{displayedText['lp1']}{displayedText['lp1'] && displayedText['lp1'] !== lparts[0].t && <span className="cur" />}</p>
              <p id="lp2">{displayedText['lp2']}{displayedText['lp2'] && displayedText['lp2'] !== lparts[1].t && <span className="cur" />}</p>
              <p id="lp3">{displayedText['lp3']}{displayedText['lp3'] && displayedText['lp3'] !== lparts[2].t && <span className="cur" />}</p>

              <div className="ltr-de">
                <strong>Alles Gute zum Geburtstag, meine Liebe.</strong><br />
                Ich vermisse dich schon. Du bist mein Stern.
                <div className="de-tr">(Happy Birthday, my love. I miss you already. You are my star.)</div>
              </div>

              <div className="ltr-ml" id="lml">{displayedText['lml']}{displayedText['lml'] && displayedText['lml'] !== lparts[3].t && <span className="cur" />}</div>
              <p id="lp4">{displayedText['lp4']}{displayedText['lp4'] && displayedText['lp4'] !== lparts[4].t && <span className="cur" />}</p>
              <p id="lp5">{displayedText['lp5']}{displayedText['lp5'] && displayedText['lp5'] !== lparts[5].t && <span className="cur" />}</p>

              <div className="ltr-sign">
                Forever your Kunja &mdash; Akshai<br />
                <span style={{ fontSize: '14px', color: 'var(--gold)' }}>(your Kunja 🦊)</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: '120px', width: '100%', flexShrink: 0 }}></div>
      </div>
    </div>
  );
}

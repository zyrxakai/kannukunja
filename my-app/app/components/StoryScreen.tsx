"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function StoryScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = document.querySelectorAll('[data-tl]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
    }, { threshold: 0.12, root: scrollRef.current });
    items.forEach(i => obs.observe(i));
    return () => { items.forEach(i => obs.unobserve(i)); obs.disconnect(); };
  }, []);

  return (
    <div id="story" className="screen active">
      <div className="top-nav">
        <button className="btn-back" onClick={onBack}><ChevronLeft size={16} /> Back</button>
        <button className="btn-next" onClick={onNext}>The Letter <ChevronRight size={15} /></button>
      </div>

      <div className="story-scroll" ref={scrollRef}>
        <div className="sec-hdr">
          <h2>Our Story</h2>
          <p>1 year, 3 months. Not a single day apart. 💕</p>
        </div>

        <div className="tl">
          <div className="tli" data-tl>
            <div className="tl-dot r" />
            <div className="tl-card">
              <div className="tl-date">The Beginning</div>
              <h4>She walked in. Everything changed.</h4>
              <p>Before you — I was just Akshai — Kunja at work. After you — I was Akshai — Kunja who had a reason to smile every single morning.</p>
            </div>
          </div>

          <div className="tli" data-tl>
            <div className="tl-dot g" />
            <div className="tl-card">
              <div className="tl-date">Getting Closer</div>
              <h4>When &ldquo;colleague&rdquo; wasn&apos;t enough.</h4>
              <p>From saying hi in corridors to staying on call till 2am — we never ran out of things to say.</p>
              <div className="ml">ഇന്ന് കണ്ണു കാത്തിരിക്കാൻ തുടങ്ങീട്ട്... 💕</div>
            </div>
          </div>

          <div className="tli" data-tl>
            <div className="tl-dot p" />
            <div className="tl-card">
              <div className="moment-card">
                <div className="mc-spark"><Sparkles size={24} color="var(--rose)" strokeWidth={2.5} /></div>
                <h4>The Moment I&apos;ll Never Forget</h4>
                <p>Annu makkal pokannneram ennod nte kannil nokku chodichu <em>&ldquo;Njn poit varatte varatte njn..&rdquo;</em></p>
                <p style={{ marginTop: '10px' }}>I looked into your eyes and saw <strong>sparkles</strong>. Stars. Our entire future in two seconds.</p>
                <p style={{ marginTop: '10px' }}>I said <em>&ldquo;No, you don&apos;t need to come back.&rdquo;</em><br/>My heart was screaming —<br/><strong>&ldquo;Please. Please come back to me.&rdquo;</strong></p>
                <div className="mc-quote">&ldquo;That was the moment I knew.<br/>Kannumon was already home.&rdquo;</div>
              </div>
            </div>
          </div>

          <div className="tli" data-tl>
            <div className="tl-dot r" />
            <div className="tl-card">
              <div className="tl-date">Every Single Day</div>
              <h4>474 days. Zero days off.</h4>
              <p>We cannot go a single day without seeing each other. Not one. That&apos;s not normal — that&apos;s extraordinary. That&apos;s us.</p>
              <div className="ps">
                <Image src="/assets/images/FJLQ3661.JPG" alt="Us" fill style={{ objectFit: 'cover', borderRadius: '12px' }} sizes="(max-width: 480px) 100vw, 420px" />
              </div>
            </div>
          </div>

          <div className="tli" data-tl>
            <div className="tl-dot b" />
            <div className="tl-card">
              <div className="tl-date">1.3 Years Strong</div>
              <h4>We built something rare.</h4>
              <p>Some people search their whole lives for what we have. I found it in a girl who asked if she&apos;d come back — and stole my heart entirely in the process.</p>
              <div className="ps">
                <Image src="/assets/images/IMG_1487.jpg" alt="Us" fill style={{ objectFit: 'cover', borderRadius: '12px' }} sizes="(max-width: 480px) 100vw, 420px" />
              </div>
              <div className="ml" style={{ marginTop: '10px' }}>ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു... 💕</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

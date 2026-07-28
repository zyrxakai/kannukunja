"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slidesData } from "./slidesData";

export default function JourneyScreen({
  onBack,
  onNext,
  playStoryBgm,
  pauseStoryBgm
}: {
  onBack: () => void;
  onNext: () => void;
  playStoryBgm: () => void;
  pauseStoryBgm: () => void;
}) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [showCountdown, setShowCountdown] = useState(true);
  const [count, setCount] = useState<number | string>(3);
  const [showText, setShowText] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isEnding, setIsEnding] = useState(false);
  const SLIDE_DUR = 2400;
  const slideTimer = useRef<NodeJS.Timeout | null>(null);
  const endTimer = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    let n = 3;
    const showNum = () => {
      setCount(n);
      setTimeout(() => {
        n--;
        if (n > 0) {
          setTimeout(showNum, 400);
        } else {
          setCount("");
          setTimeout(() => {
            playStoryBgm();
            setShowText(true);
            setTimeout(() => {
              setTimeout(() => {
                setShowText(false);
                setTimeout(() => {
                  setShowCountdown(false);
                  startTimer();
                }, 650);
              }, 200);
            }, 1800);
          }, 300);
        }
      }, 850);
    };
    setTimeout(showNum, 500);
    return () => stopTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showCountdown) {
      setProgress(0);
      const t = setTimeout(() => setProgress(100), 30);
      return () => clearTimeout(t);
    }
  }, [slideIdx, showCountdown]);

  const startTimer = () => {
    stopTimer();
    setIsEnding(false);
    slideTimer.current = setInterval(() => {
      setSlideIdx(prev => {
        if (prev >= slidesData.length - 2) {
          // Transitioning to the final slide
          stopTimer();
          
          // Hold the final slide for 4 seconds, then start the fade out
          endTimer.current = setTimeout(() => {
            setIsEnding(true);
            pauseStoryBgm();
          }, 4000);
          
          return prev + 1;
        }
        return prev + 1;
      });
    }, SLIDE_DUR);
  };
  const stopTimer = () => {
    if (slideTimer.current) { clearInterval(slideTimer.current); slideTimer.current = null; }
    if (endTimer.current) { clearTimeout(endTimer.current); endTimer.current = null; }
  };
  const nextSlide = () => { 
    stopTimer(); 
    setIsEnding(false);
    setSlideIdx(prev => {
      if (prev >= slidesData.length - 1) {
        setIsEnding(true);
        pauseStoryBgm();
        return prev;
      }
      return prev + 1;
    }); 
    startTimer(); 
  };
  const prevSlide = () => { 
    stopTimer(); 
    setIsEnding(false);
    setSlideIdx(prev => Math.max(0, prev - 1)); 
    startTimer(); 
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) { if (dx < 0) nextSlide(); else prevSlide(); }
  };

  const current = slidesData[slideIdx];

  return (
    <div id="journey" className="screen active">
      {/* Countdown overlay */}
      {showCountdown && (
        <div className="j-countdown-overlay">
          {!showText && <div className="j-count-num">{count}</div>}
          {showText && <div className="j-count-text">Close your eyes...<br/>and feel this 💕</div>}
        </div>
      )}

      {/* Back button */}
      <div className="top-nav" style={{ zIndex: 30, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)', paddingBottom: 12 }}>
        <button className="btn-back" style={{ background: 'rgba(0,0,0,0.4)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }} onClick={onBack}>
          <ChevronLeft size={16} /> Back
        </button>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
          Our 1.3 Years
        </div>
      </div>

      {/* Main Content Area */}
      <div className="j-slide-container" style={{ justifyContent: 'flex-start', paddingTop: '80px', overflowY: 'auto' }}>
        <div
          className="j-image-area"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ 
            width: '100%', 
            aspectRatio: '4/3', 
            flex: 'none', 
            position: 'relative', 
            background: '#000',
            opacity: isEnding ? 0 : 1,
            transition: 'opacity 3s ease'
          }}
        >
          {slidesData.map((slide, i) => (
            <div key={slide.id} style={{ position: 'absolute', inset: 0, opacity: i === slideIdx ? 1 : 0, transition: 'opacity 0.6s ease', pointerEvents: i === slideIdx ? 'auto' : 'none' }}>
              {slide.type === 'video' ? (
                <video src={`/assets/videos/${slide.src}`} playsInline autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <Image
                  src={`/assets/images/${slide.src}`}
                  alt={`Memory ${slide.id}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="100vw"
                  priority={Math.abs(i - slideIdx) <= 2}
                />
              )}
            </div>
          ))}
        </div>

        {/* Captions directly underneath image */}
        <div style={{ padding: '24px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="j-slide-num" style={{ color: 'var(--gold)', marginBottom: '8px' }}>
            {String(slideIdx + 1).padStart(2, '0')} / {slidesData.length}
          </div>
          <div className="j-slide-title" style={{ color: '#fff', fontSize: '24px', fontStyle: 'italic', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
            {current.title}
          </div>
          <div className="j-slide-text" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.5 }}>
            {current.text || "Every moment with you is extraordinary."}
          </div>
        </div>

        {/* Nav controls */}
        <div className="j-nav-row" style={{ justifyContent: 'center', marginTop: '10px' }}>
          <button className="j-btn" onClick={prevSlide} aria-label="Previous">
            <ChevronLeft size={18} />
          </button>
          <div className="j-dot-row" style={{ display: 'flex', gap: '6px', margin: '0 12px' }}>
            {slidesData.slice(Math.max(0, slideIdx - 2), Math.min(slidesData.length, slideIdx + 3)).map((_, i) => {
              const actualIdx = Math.max(0, slideIdx - 2) + i;
              return (
                <div 
                  key={actualIdx} 
                  style={{ 
                    width: '6px', height: '6px', borderRadius: '50%', 
                    background: actualIdx === slideIdx ? 'var(--rose)' : 'rgba(255,255,255,0.3)',
                    transition: 'all 0.3s ease'
                  }} 
                />
              );
            })}
          </div>
          <button className="j-btn" onClick={nextSlide} aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Continue Button */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '30px 20px 40px' }}>
          <button 
            className="btn-primary" 
            onClick={() => { pauseStoryBgm(); onNext(); }}
            style={{ width: '100%', maxWidth: '220px', padding: '12px 20px', minHeight: '44px', fontSize: '15px' }}
          >
            Continue to Story <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

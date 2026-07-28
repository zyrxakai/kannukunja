"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Mic, Pause, Play } from "lucide-react";
import PrankScreen from "./components/PrankScreen";
import BirthdayScreen from "./components/BirthdayScreen";
import JourneyScreen from "./components/JourneyScreen";
import StoryScreen from "./components/StoryScreen";
import LetterScreen from "./components/LetterScreen";
import AustriaScreen from "./components/AustriaScreen";
import MemoriesScreen from "./components/MemoriesScreen";
import FinalScreen from "./components/FinalScreen";

const SCREENS = ['prank', 'birthday', 'journey', 'story', 'letter', 'austria', 'memories', 'final'];

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('prank');
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [voiceError, setVoiceError] = useState(false);

  const storyAudioRef = useRef<HTMLAudioElement>(null);
  const voiceAudioRef = useRef<HTMLAudioElement>(null);
  const voiceBgmRef = useRef<HTMLAudioElement>(null);

  const goToScreen = (id: string) => {
    setCurrentScreen(id);
    if (id === 'story') pauseStoryBgm();
  };

  const playStoryBgm = () => {
    if (storyAudioRef.current) {
      storyAudioRef.current.volume = 0.6;
      storyAudioRef.current.play().catch(() => {});
    }
  };

  const pauseStoryBgm = () => {
    if (storyAudioRef.current) {
      let vol = storyAudioRef.current.volume;
      const fadeOut = setInterval(() => {
        if (vol > 0.02) {
          vol -= 0.02;
          if (storyAudioRef.current) storyAudioRef.current.volume = Math.max(0, vol);
        } else {
          clearInterval(fadeOut);
          if (storyAudioRef.current) {
            storyAudioRef.current.pause();
            storyAudioRef.current.volume = 0.6; // Reset for next time
          }
        }
      }, 100);
    }
  };

  const pauseVoiceBgm = () => {
    if (voiceBgmRef.current) {
      let vol = voiceBgmRef.current.volume;
      const fadeOut = setInterval(() => {
        if (vol > 0.02) {
          vol -= 0.02;
          if (voiceBgmRef.current) voiceBgmRef.current.volume = Math.max(0, vol);
        } else {
          clearInterval(fadeOut);
          if (voiceBgmRef.current) {
            voiceBgmRef.current.pause();
            voiceBgmRef.current.volume = 0.25; // Reset for next time
          }
        }
      }, 100);
    }
  };

  const toggleVoice = () => {
    if (!voiceAudioRef.current || !voiceBgmRef.current) return;
    if (!voicePlaying) {
      voiceBgmRef.current.volume = 0.25;
      voiceBgmRef.current.play().catch(() => {});
      voiceAudioRef.current.play().then(() => {
        setVoicePlaying(true);
        setVoiceError(false);
      }).catch(() => { setVoiceError(true); });
    } else {
      voiceAudioRef.current.pause();
      pauseVoiceBgm();
      setVoicePlaying(false);
    }
  };

  useEffect(() => {
    const vaud = voiceAudioRef.current;
    if (vaud) {
      const handleEnded = () => {
        setVoicePlaying(false);
        pauseVoiceBgm();
      };
      vaud.addEventListener('ended', handleEnded);
      return () => vaud.removeEventListener('ended', handleEnded);
    }
  }, []);

  // Unlock audio context on first user gesture (for BirthdayScreen tap)
  const unlockAndGo = () => {
    if (storyAudioRef.current) {
      storyAudioRef.current.play().then(() => {
        storyAudioRef.current?.pause();
      }).catch(() => {});
    }
    goToScreen('journey');
  };

  return (
    <main style={{ position: 'relative', width: '100%', height: '100%', height100dvh: '100dvh' } as React.CSSProperties}>
      <audio ref={storyAudioRef} src="/assets/audio/dude-bgm.mp3" loop preload="auto" />
      <audio ref={voiceAudioRef} src="/assets/audio/voice.mp3" />
      <audio ref={voiceBgmRef} src="/assets/audio/voice-bgm.mp3" loop />

      {currentScreen === 'prank' && <PrankScreen onComplete={() => goToScreen('birthday')} />}
      {currentScreen === 'birthday' && <BirthdayScreen onNext={unlockAndGo} />}
      {currentScreen === 'journey' && <JourneyScreen onBack={() => goToScreen('birthday')} onNext={() => goToScreen('story')} playStoryBgm={playStoryBgm} pauseStoryBgm={pauseStoryBgm} />}
      {currentScreen === 'story' && <StoryScreen onBack={() => goToScreen('journey')} onNext={() => goToScreen('letter')} />}
      {currentScreen === 'letter' && <LetterScreen onBack={() => goToScreen('story')} onNext={() => goToScreen('austria')} />}
      {currentScreen === 'austria' && <AustriaScreen onBack={() => goToScreen('letter')} onNext={() => goToScreen('memories')} />}
      {currentScreen === 'memories' && <MemoriesScreen onBack={() => goToScreen('austria')} onNext={() => goToScreen('final')} />}
      {currentScreen === 'final' && <FinalScreen onBack={() => goToScreen('memories')} onUnlockVoice={() => setVoiceOpen(true)} />}

      {/* Navigation Dots */}
      {currentScreen !== 'prank' && (
        <div id="ndots" className="v">
          {SCREENS.filter(s => s !== 'prank').map(s => (
            <div key={s} className={`nd ${currentScreen === s ? 'a' : ''}`} onClick={() => goToScreen(s)} />
          ))}
        </div>
      )}

      {/* Voice Easter Egg Screen */}
      {voiceOpen && (
        <div id="voice-screen" className="screen active" style={{ zIndex: 600, display: 'flex' }}>
          <div className="top-nav" style={{ zIndex: 20 }}>
            <button className="btn-back" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.15)' }}
              onClick={() => { setVoiceOpen(false); if (voicePlaying) toggleVoice(); }}>
              <ChevronLeft size={16} /> Back
            </button>
          </div>

          <div className="vh">
            <h2>A Final Message 🎙️</h2>
            <p>Listen with headphones.</p>
          </div>

          <div className="vp">
            <Mic size={48} color="var(--rose-light)" style={{ filter: 'drop-shadow(0 0 16px rgba(194,24,91,0.5))' }} />
            <div className="vn">Kannumon</div>
            <div className="vs">💕 from Akshai</div>
            <div className="vwf">
              {[7, 12, 18, 25, 32, 25, 18, 12, 7, 12, 18, 25, 32, 38, 32, 25, 18, 12, 7, 12, 18, 25, 32, 25, 18, 12, 7].map((h, i) => (
                <div key={i} className={`wb ${voicePlaying ? 'on' : ''}`} style={{ '--h': `${h}px` } as React.CSSProperties} />
              ))}
            </div>
            <button className="vpb" onClick={toggleVoice} style={{ opacity: voiceError ? 0.3 : 1, pointerEvents: voiceError ? 'none' : 'auto' }}>
              {voicePlaying ? <Pause size={22} fill="#fff" /> : <Play size={22} fill="#fff" />}
            </button>
            {voiceError && <div className="vnf">Voice note could not load.<br />Make sure <code>voice.mp3</code> is in assets/audio.</div>}
          </div>
        </div>
      )}
    </main>
  );
}

"use client";
import { useState, useEffect, useRef } from "react";

export default function PrankScreen({ onComplete }: { onComplete: () => void }) {
  const [dateStr, setDateStr] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Fetching bus routes...");
  const [subText, setSubText] = useState("Connecting to KSRTC server...");
  const [glitching, setGlitching] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDateStr(new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" }));
    const timer = setTimeout(() => {
      if (btnRef.current) btnRef.current.click();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const startPrank = () => {
    if (loading) return;
    setLoading(true);
    
    const stgs = [
      { p: 12, t: "Authenticating...", s: "Connecting to KSRTC server..." },
      { p: 33, t: "Fetching route data...", s: "Loading timetable..." },
      { p: 58, t: "Processing schedule...", s: "Almost there..." },
      { p: 80, t: "Rendering results...", s: "Something seems off..." },
      { p: 100, t: "WAIT A SECOND....", s: "...this is NOT a bus portal 👀" },
    ];
    let i = 0;
    const iv = setInterval(() => {
      if (i >= stgs.length) {
        clearInterval(iv);
        setTimeout(() => {
          setGlitching(true);
          setTimeout(() => {
            onComplete();
          }, 1400);
        }, 600);
        return;
      }
      setProgress(stgs[i].p);
      setText(stgs[i].t);
      setSubText(stgs[i].s);
      i++;
    }, 700);
  };

  return (
    <>
      <div id="go" className={glitching ? "on" : ""} style={{ display: glitching ? "block" : "none" }}></div>
      <div id="prank" className={`screen active ${glitching ? "glitching" : ""}`}>
        <div className="gov-hdr">
          <div className="gov-emb">🚌</div>
          <div className="gov-ttl"><h1>GOVERNMENT OF KERALA</h1><p>e-Services Portal &mdash; KSRTC Route Finder</p></div>
        </div>
        <div className="gov-nav">
          <span>🏠 Home</span><span>🚌 Bus Routes</span><span>📍 Timetable</span><span>💳 e-Ticketing</span><span>📞 Help</span>
        </div>
        <div className="gov-body">
          <div className="gov-card">
            <h3>🔍 KSRTC Bus Route Search</h3>
            <div style={{ fontSize: "10px", color: "#777", marginBottom: "12px", fontFamily: "Arial,sans-serif" }}>Effective 01-Apr-2025 | Schedule v3.4.2</div>
            <label style={{ fontSize: "11px", color: "#555", display: "block", marginBottom: "3px", fontFamily: "Arial,sans-serif" }}>From Station *</label>
            <input className="gov-inp" type="text" value="Thiruvananthapuram Central" readOnly />
            <label style={{ fontSize: "11px", color: "#555", display: "block", marginBottom: "3px", fontFamily: "Arial,sans-serif" }}>To Station *</label>
            <input className="gov-inp" type="text" value="Ernakulam KSRTC Depot" readOnly />
            <label style={{ fontSize: "11px", color: "#555", display: "block", marginBottom: "3px", fontFamily: "Arial,sans-serif" }}>Date of Journey *</label>
            <input className="gov-inp" type="text" value={dateStr} readOnly />
            <button className="gov-btn-el" ref={btnRef} disabled={loading} onClick={startPrank}>
              {loading ? "Searching..." : "🔍 Search Buses"}
            </button>
          </div>
          <div className="gov-card">
            <h3>📢 Important Notice</h3>
            <p style={{ fontSize: "11px", color: "#555", lineHeight: 1.6, fontFamily: "Arial,sans-serif" }}>Due to maintenance, certain routes may be suspended. Verify timings before boarding. Helpline: 1800-XXX-XXXX (Toll Free)</p>
          </div>
          <div className="gov-ld" style={{ display: loading ? "block" : "none" }}>
            <p className="ld-txt">{text}</p>
            <div className="ld-bar-w"><div className="ld-bar-f" style={{ width: `${progress}%` }}></div></div>
            <p className="ld-txt" style={{ fontSize: "10px", color: "#999" }}>{subText}</p>
          </div>
        </div>
      </div>
    </>
  );
}

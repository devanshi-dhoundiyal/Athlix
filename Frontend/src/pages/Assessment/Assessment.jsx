import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/assessment.css';

const STEPS = [
  { id: 1, name: 'Standing posture',  sub: 'Stand tall, arms at sides',       dur: 15 },
  { id: 2, name: 'Balance test',      sub: 'Stand on one foot',               dur: 20 },
  { id: 3, name: 'Arm coordination',  sub: 'Raise & lower arms slowly',       dur: 20 },
  { id: 4, name: 'Reaction test',     sub: 'Touch the screen when prompted',  dur: 20 },
  { id: 5, name: 'Flexibility check', sub: 'Reach down toward toes',          dur: 15 },
];
const TOTAL_SECS = STEPS.reduce((s, x) => s + x.dur, 0); // 90

export default function Assessment() {
  const navigate = useNavigate();
  const [child, setChild] = useState(null);
  const [phase, setPhase]           = useState('idle'); // idle | running | done
  const [timeLeft, setTimeLeft]     = useState(TOTAL_SECS);
  const [stepIdx, setStepIdx]       = useState(0);
  const [stepElapsed, setStepElapsed] = useState(0);
  const [metrics, setMetrics]       = useState({ conf: '—', kp: '—', bal: '—', mot: '—' });
  const [doneSteps, setDoneSteps]   = useState([]);

  const timerRef   = useRef(null);
  const canvasRef  = useRef(null);
  const animRef    = useRef(null);
  const videoRef = useRef(null);

  /* ── skeleton animation ── */
  const drawSkeleton = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;

    const frame = () => {
      t += 0.04;
      ctx.clearRect(0, 0, 280, 480);
      const s = Math.sin(t) * 6;
      const pts = {
        nose:      [140, 60],
        lShoulder: [100, 120 + s], rShoulder: [180, 120 + s],
        lElbow:    [76,  185 + s * 1.3], rElbow: [204, 185 + s * 1.3],
        lWrist:    [68,  245 + s * 1.6], rWrist: [212, 245 + s * 1.6],
        lHip:      [112, 240], rHip: [168, 240],
        lKnee:     [108, 340 + s * 0.5], rKnee: [172, 340 + s * 0.5],
        lAnkle:    [104, 430], rAnkle: [176, 430],
      };

      const line = (a, b) => {
        ctx.beginPath();
        ctx.moveTo(...pts[a]); ctx.lineTo(...pts[b]);
        ctx.strokeStyle = 'rgba(61,214,176,0.75)';
        ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.stroke();
      };
      const dot = (key, r = 4) => {
        const [x, y] = pts[key];
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#3dd6b0';
        ctx.shadowColor = '#3dd6b0'; ctx.shadowBlur = 10;
        ctx.fill(); ctx.shadowBlur = 0;
      };

      [['lShoulder','rShoulder'],['lShoulder','lHip'],['rShoulder','rHip'],
       ['lHip','rHip'],['lShoulder','lElbow'],['lElbow','lWrist'],
       ['rShoulder','rElbow'],['rElbow','rWrist'],['lHip','lKnee'],
       ['lKnee','lAnkle'],['rHip','rKnee'],['rKnee','rAnkle']].forEach(([a,b]) => line(a,b));

      ctx.beginPath(); ctx.arc(140, 60, 18, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(61,214,176,0.5)'; ctx.lineWidth = 2; ctx.stroke();
      Object.keys(pts).forEach(k => dot(k, k === 'nose' ? 7 : 4));

      animRef.current = requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: "user",
    width: {
      ideal: 1920,
    },
    height: {
      ideal: 1080,
    },
  },
  audio: false,
});

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  } catch (err) {
    alert("Camera permission denied or camera not found.");
    console.error(err);
  }
};

const stopCamera = () => {
  if (videoRef.current && videoRef.current.srcObject) {
    const tracks = videoRef.current.srcObject.getTracks();

    tracks.forEach(track => track.stop());

    videoRef.current.srcObject = null;
  }
};
  /* ── start / stop ── */
  const start = useCallback(() => {
  setPhase('running');
  setTimeLeft(TOTAL_SECS);
  setStepIdx(0);
  setStepElapsed(0);
  setDoneSteps([]);

  startCamera();

  drawSkeleton();
}, [drawSkeleton]);

  const stop = useCallback(() => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animRef.current);
    stopCamera();
    setPhase('idle');
    setTimeLeft(TOTAL_SECS);
    setStepIdx(0);
    setDoneSteps([]);
  }, []);

  /* ── timer tick ── */
  useEffect(() => {

  const savedChild = localStorage.getItem("childProfile");

  if (savedChild) {
    setChild(JSON.parse(savedChild));
  }

}, []);

  useEffect(() => {
    if (phase !== 'running') return;

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { finish(); return 0; }
        return t - 1;
      });
      setStepElapsed(se => se + 1);
      setMetrics({
        conf: (85 + Math.random() * 12).toFixed(0) + '%',
        kp:   Math.floor(14 + Math.random() * 3) + '/17',
        bal:  (70 + Math.random() * 20).toFixed(0) + '%',
        mot:  ['Yes ✓', 'Yes ✓', 'Yes ✓', 'Low'][Math.floor(Math.random() * 4)],
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase]);

  /* ── step advancement ── */
  useEffect(() => {
    if (phase !== 'running') return;
    if (stepElapsed >= STEPS[stepIdx]?.dur) {
      setDoneSteps(d => [...d, stepIdx]);
      setStepIdx(i => Math.min(i + 1, STEPS.length - 1));
      setStepElapsed(0);
    }
  }, [stepElapsed, stepIdx, phase]);

  const finish = useCallback(() => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animRef.current);
    stopCamera();
    setPhase('done');
    setDoneSteps([0, 1, 2, 3, 4]);
  }, []);

  /* ── cleanup ── */
  useEffect(() => () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animRef.current);
  }, []);

  /* ── derived ── */
  const ringCirc = 307.9;
  const ringOffset = ringCirc - ringCirc * (timeLeft / TOTAL_SECS);
  const ringColor  = timeLeft > 30 ? '#3dd6b0' : timeLeft > 10 ? '#ffb347' : '#ff6b6b';

  return (
    <div className="as-wrap">

      {/* ── top bar ── */}
      <header className="as-bar">
        <a href="/" className="as-logo"><span className="as-logo-icon">✦</span>Athlix</a>
        <div className="as-child-info">

  <div className="as-child-avatar">
    {child?.photoUrl ? (
      <img
        src={child.photoUrl}
        alt={child.name}
        className="as-avatar-img"
      />
    ) : (
      "🧒"
    )}
  </div>

  <span className="as-child-name">
    {child
      ? `${child.name} · Age ${child.age}`
      : "Loading..."}
  </span>

</div>
        <span className="as-step-badge">Step 3 of 4 — AI Assessment</span>
      </header>

      <div className="as-main">

        {/* ── camera panel ── */}
        <div className="as-cam-panel">
          {phase === 'idle' ? (
            <div className="as-cam-placeholder">
              <div className="as-cam-placeholder__icon">📷</div>
              <p>Camera activates when you start. Make sure the child is visible and standing 2–3 metres away.</p>
            </div>
          ) : (
  <div className="as-camera-wrapper">

    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="as-video"
    />

    <canvas
      ref={canvasRef}
      className="as-overlay"
      width="280"
      height="480"
    />

  </div>
)}

          {phase === 'running' && <div className="as-scan-line" />}
          <div className="as-corner as-corner--tl" />
          <div className="as-corner as-corner--tr" />
          <div className="as-corner as-corner--bl" />
          <div className="as-corner as-corner--br" />
          {phase === 'running' && (
            <div className="as-cam-label">🟢 AI detecting pose…</div>
          )}
          {phase === 'done' && (
            <div className="as-cam-label as-cam-label--done">✅ Analysis complete</div>
          )}
        </div>

        {/* ── right panel ── */}
        <div className="as-right">

          {/* status */}
          <div className={`as-status-pill ${phase === 'running' ? 'as-status-pill--live' : ''}`}>
            {phase === 'running' && <span className="as-status-dot" />}
            {phase === 'idle'    && '⏸ Ready to start'}
            {phase === 'running' && 'Assessment running…'}
            {phase === 'done'    && '✅ Assessment complete'}
          </div>

          {/* timer ring */}
          <div className="as-timer-section">
            <div className="as-timer-ring-wrap">
              <svg className="as-timer-svg" width="110" height="110" viewBox="0 0 110 110">
                <circle className="as-ring-bg" cx="55" cy="55" r="49" />
                <circle
                  className="as-ring-fg"
                  cx="55" cy="55" r="49"
                  style={{ strokeDashoffset: ringOffset, stroke: ringColor }}
                />
              </svg>
              <div className="as-timer-num">
                <span>{timeLeft}</span>
                <span>seconds</span>
              </div>
            </div>
            <p className="as-timer-label">Assessment duration</p>
          </div>

          {/* live metrics */}
          <div>
            <p className="as-sec-label">Live readings</p>
            <div className="as-metrics-grid">
              {[
                ['Pose confidence', metrics.conf],
                ['Keypoints found', metrics.kp],
                ['Balance score',   metrics.bal],
                ['Motion detected', metrics.mot],
              ].map(([label, val]) => (
                <div className="as-metric-chip" key={label}>
                  <span className="as-metric-label">{label}</span>
                  <span className="as-metric-val">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* steps */}
          <div>
            <p className="as-sec-label">Assessment steps</p>
            <div className="as-steps-list">
              {STEPS.map((step, i) => {
                const isDone   = doneSteps.includes(i);
                const isActive = phase === 'running' && stepIdx === i && !isDone;
                return (
                  <div
                    key={step.id}
                    className={`as-step ${isDone ? 'as-step--done' : ''} ${isActive ? 'as-step--active' : ''}`}
                  >
                    <div className="as-step__dot">{isDone ? '✓' : step.id}</div>
                    <div className="as-step__info">
                      <p className="as-step__name">{step.name}</p>
                      <p className="as-step__sub">{step.sub}</p>
                    </div>
                    <span className="as-step__dur">{step.dur}s</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* instructions */}
          {phase === 'idle' && (
            <div className="as-instr-card">
              <h3>Before you begin</h3>
              <ul>
                <li>Stand 2–3 metres from the screen</li>
                <li>Good lighting — avoid strong backlighting</li>
                <li>Wear comfortable, fitted clothing</li>
                <li>Clear the area of obstacles</li>
                <li>Follow on-screen prompts during the test</li>
              </ul>
            </div>
          )}

          {/* CTA */}
          {phase === 'idle'    && <button className="as-cta" onClick={start}>Start Assessment</button>}
          {phase === 'running' && <button className="as-cta as-cta--stop" onClick={stop}>Stop Assessment</button>}
          {phase === 'done'    && <button className="as-cta" onClick={() => navigate('/results')}>View Results →</button>}

        </div>
      </div>
    </div>
  );
}
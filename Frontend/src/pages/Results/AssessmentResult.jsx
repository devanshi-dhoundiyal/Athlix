import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/results.css';

const SCORES = [
  { name: 'Balance',       icon: '⚖️', val: 62, color: '#64b4ff', grade: 'B',
    note: 'Slightly below average. Core stability exercises will help.' },
  { name: 'Coordination',  icon: '🤝', val: 81, color: '#3dd6b0', grade: 'A',
    note: 'Excellent. Strong upper-lower body synchronisation detected.' },
  { name: 'Reaction Time', icon: '⚡', val: 78, color: '#3dd6b0', grade: 'A',
    note: '320ms response — top 30% for age group. Great for fast sports.' },
  { name: 'Flexibility',   icon: '🤸', val: 55, color: '#ffb347', grade: 'C',
    note: 'Below average range of motion. Stretching routine recommended.' },
];
const OVERALL = 74;
const INSIGHTS = [
  { icon: '💪', title: 'Strong upper-body coordination',
    text: 'Arjun demonstrated above-average arm synchronisation, suggesting good aptitude for racket-based or throwing sports.' },
  { icon: '⚠️', title: 'Balance needs attention',
    text: 'Single-leg stability was below average. Focus on core and balance exercises before high-mobility sports.' },
  { icon: '⚡', title: 'Quick reaction time',
    text: 'Response latency of 320ms is in the top 30% for this age group — excellent for fast-paced sports.' },
  { icon: '🎯', title: 'Recommended starting point',
    text: 'Adaptive badminton or swimming are the strongest matches based on these results.' },
];

export default function AssessmentResult() {
  const navigate = useNavigate();
  const radarRef = useRef(null);
  const [overallCount, setOverallCount] = useState(0);
  const [barsReady, setBarsReady] = useState(false);

  /* ── overall count-up ── */
  useEffect(() => {
    const step = OVERALL / 60;
    let n = 0;
    const iv = setInterval(() => {
      n = Math.min(n + step, OVERALL);
      setOverallCount(Math.round(n));
      if (n >= OVERALL) clearInterval(iv);
    }, 20);
    return () => clearInterval(iv);
  }, []);

  /* ── animate bars after mount ── */
  useEffect(() => {
    const t = setTimeout(() => setBarsReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  /* ── radar chart ── */
  useEffect(() => {
    const canvas = radarRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = 150, cy = 150, r = 110;
    const labels = ['Balance', 'Coordination', 'Reaction', 'Flexibility'];
    const vals   = [62, 81, 78, 55];
    const n = labels.length;

    let prog = 0;
    let raf;
    const draw = () => {
      prog = Math.min(prog + 0.03, 1);
      ctx.clearRect(0, 0, 300, 300);

      // grid
      [0.25, 0.5, 0.75, 1].forEach(t => {
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * r * t, y = cy + Math.sin(a) * r * t;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(61,214,176,.1)'; ctx.lineWidth = 1; ctx.stroke();
      });
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        ctx.strokeStyle = 'rgba(61,214,176,.12)'; ctx.lineWidth = 1; ctx.stroke();
      }

      // data
      ctx.beginPath();
      vals.forEach((v, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const dist = r * (v / 100) * prog;
        const x = cx + Math.cos(a) * dist, y = cy + Math.sin(a) * dist;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(61,214,176,.18)'; ctx.fill();
      ctx.strokeStyle = '#3dd6b0'; ctx.lineWidth = 2.5; ctx.stroke();

      // dots
      vals.forEach((v, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const dist = r * (v / 100) * prog;
        const x = cx + Math.cos(a) * dist, y = cy + Math.sin(a) * dist;
        ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#3dd6b0';
        ctx.shadowColor = '#3dd6b0'; ctx.shadowBlur = 8;
        ctx.fill(); ctx.shadowBlur = 0;
      });

      // labels
      labels.forEach((label, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * (r + 22), y = cy + Math.sin(a) * (r + 22);
        ctx.fillStyle = '#a8d4c8'; ctx.font = 'bold 11px Inter,sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y);
        ctx.fillStyle = 'rgba(168,212,200,.6)'; ctx.font = '10px Inter,sans-serif';
        ctx.fillText(vals[i] + '%', x, y + 14);
      });

      if (prog < 1) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── ring stroke offset (r=65, circ≈408) ── */
  const ringCirc = 408.4;
  const ringOffset = ringCirc - ringCirc * (OVERALL / 100);

  return (
    <div className="rs-page">

      {/* ── header ── */}
      <header className="rs-header">
        <a href="/" className="rs-logo">
          <span className="rs-logo-icon">✦</span>Athlix
        </a>
        <div className="rs-header-nav">
          <button className="rs-btn-outline" onClick={() => navigate('/child-profile')}>
            ← Back to profile
          </button>
          <button className="rs-btn-ghost" onClick={() => window.print()}>
            ⬇ Download report
          </button>
          <button className="rs-btn-outline" onClick={() => navigate('/assessment')}>
            Retake assessment
          </button>
        </div>
      </header>

      {/* ── hero ── */}
      <div className="rs-hero">
        <div className="rs-hero__left">
          <h1>Assessment complete — great effort, Arjun! 🎉</h1>
          <p>AI analysis of movement, coordination, balance and reaction time. Results are based on 90 seconds of pose data.</p>
          <div className="rs-meta-row">
            <span className="rs-meta-tag">📅 Today, 2:45 PM</span>
            <span className="rs-meta-tag">⏱ 90s assessment</span>
            <span className="rs-meta-tag">🤖 17 poses detected</span>
          </div>
        </div>

        {/* overall ring */}
        <div className="rs-ring-wrap">
          <svg className="rs-ring-svg" width="150" height="150" viewBox="0 0 150 150">
            <defs>
              <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a8c74" />
                <stop offset="100%" stopColor="#3dd6b0" />
              </linearGradient>
            </defs>
            <circle className="rs-ring-bg" cx="75" cy="75" r="65" />
            <circle
              className="rs-ring-fg" cx="75" cy="75" r="65"
              stroke="url(#rg)"
              style={{ strokeDashoffset: ringOffset }}
            />
          </svg>
          <div className="rs-ring-inner">
            <span className="rs-ring-num">{overallCount}</span>
            <span className="rs-ring-label">overall</span>
            <span className="rs-ring-grade">Good</span>
          </div>
        </div>
      </div>

      <div className="rs-body">

        {/* ── score cards ── */}
        <section>
          <p className="rs-section-label">Skill breakdown</p>
          <div className="rs-score-grid">
            {SCORES.map(s => (
              <div className="rs-score-card" key={s.name}>
                <div className="rs-score-card__top">
                  <span className="rs-score-card__icon">{s.icon}</span>
                  <span className={`rs-grade rs-grade--${s.grade}`}>{s.grade}</span>
                </div>
                <p className="rs-score-card__name">{s.name}</p>
                <p className="rs-score-card__val">
                  {s.val}<span>/ 100</span>
                </p>
                <div className="rs-bar-wrap">
                  <div
                    className="rs-bar"
                    style={{
                      background: s.color,
                      width: barsReady ? `${s.val}%` : '0%',
                    }}
                  />
                </div>
                <p className="rs-score-card__note">{s.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── radar + insights ── */}
        <section className="rs-radar-section">
          <div>
            <p className="rs-section-label">Skill radar</p>
            <div className="rs-radar-wrap">
              <canvas ref={radarRef} width="300" height="300" />
            </div>
          </div>

          <div>
            <p className="rs-section-label">AI insights</p>
            <div className="rs-insights">
              {INSIGHTS.map(ins => (
                <div className="rs-insight" key={ins.title}>
                  <span className="rs-insight__icon">{ins.icon}</span>
                  <div>
                    <p className="rs-insight__title">{ins.title}</p>
                    <p className="rs-insight__text">{ins.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ── report row ── */}
      <div className="rs-report-row">
        <button className="rs-btn-ghost">📄 Download PDF report</button>
        <button className="rs-btn-ghost">📤 Share with therapist</button>
        <button className="rs-btn-ghost">🔁 Retake specific test</button>
      </div>

      {/* ── recommendations CTA ── */}
      <div className="rs-rec-cta">
        <div className="rs-rec-cta__text">
          <h2>Ready to find the perfect sport?</h2>
          <p>Our AI has matched Arjun to 5 adaptive sports based on these results. See the full breakdown with difficulty levels and training plans.</p>
        </div>
        <button className="rs-btn-rec" onClick={() => navigate('/recommendations')}>
          View Recommendations →
        </button>
      </div>

    </div>
  );
}
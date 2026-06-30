import { useEffect, useRef } from 'react';

export default function SportCard({ sport, onStart }) {
  const ringRef = useRef(null);

  useEffect(() => {
    const circ = 175.9;
    const offset = circ - circ * sport.match / 100;
    // animate on mount
    const t = setTimeout(() => {
      if (ringRef.current) ringRef.current.style.strokeDashoffset = offset;
    }, 150);
    return () => clearTimeout(t);
  }, [sport.match]);

  return (
    <div className={`rc-card ${sport.top ? 'rc-card--top' : ''}`}>
      <div className="rc-card__head">
        <div className="rc-card__icon">{sport.icon}</div>
        <div>
          <p className="rc-card__title">{sport.name}</p>
          <div className="rc-card__diff">
            Difficulty
            <div className="rc-diff-dots">
              {[1, 2, 3].map(d => (
                <span key={d} className={`rc-diff-dot ${d <= sport.difficulty ? 'on' : ''}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="rc-match-wrap">
          <svg className="rc-match-svg" width="64" height="64" viewBox="0 0 64 64">
            <circle className="rc-match-bg" cx="32" cy="32" r="28" />
            <circle ref={ringRef} className="rc-match-fg" cx="32" cy="32" r="28" />
          </svg>
          <div className="rc-match-num">
            <span>{sport.match}%</span>
            <span>match</span>
          </div>
        </div>
      </div>

      <div className="rc-why">
        <p className="rc-why__label">Why this sport</p>
        <p className="rc-why__text">{sport.why}</p>
      </div>

      <div className="rc-tags">
        {sport.tags.map(t => <span key={t} className="rc-tag">{t}</span>)}
      </div>

      <div className="rc-card__footer">
        <span className="rc-card__equip">🎽 {sport.equipment}</span>
        <button className="rc-btn-start" onClick={() => onStart(sport)}>
          Start Training →
        </button>
      </div>
    </div>
  );
}

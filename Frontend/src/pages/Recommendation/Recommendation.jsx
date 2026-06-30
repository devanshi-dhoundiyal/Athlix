import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SportCard from '../../components/recommendation/SportCard';
import { recommendedSports, filterOptions } from '../../data/recommendationData';
import '../../styles/recommendation.css';

export default function Recommendation() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All sports');

  const [child, setChild] = useState(null);

useEffect(() => {
  const savedChild = localStorage.getItem("childProfile");

  if (savedChild) {
    setChild(JSON.parse(savedChild));
  }
}, []);

  const filtered = recommendedSports.filter(s => {
    if (filter === 'All sports') return true;
    if (filter === 'Best match') return s.match >= 75;
    if (filter === 'Beginner friendly') return s.tags.includes('Beginner friendly');
    if (filter === 'Low impact') return s.tags.includes('Low impact');
    return true;
  });

  const handleStart = (sport) => {
  navigate("/dashboard");
  };

  return (
    <div className="rc-page">

      {/* ── header ── */}
      <header className="rc-header">
        <a href="/" className="rc-logo"><span className="rc-logo-icon">✦</span>Athlix</a>
        <div className="rc-header-nav">
          <button
  className="rc-btn-outline"
  onClick={() => navigate('/results')}
>
  ← Back to Results
</button>
          <button className="rc-btn-outline" onClick={() => navigate('/results')}>
            View full report
          </button>
        </div>
      </header>

      {/* ── hero ── */}
      <div className="rc-hero">
        <h1>
  Sports matched for {child?.name || "your child"} 🎯
</h1>
        <p>Based on the AI assessment — strong coordination and reaction time, balance needs support — these sports are ranked by fit. Tap any card to see why it was chosen.</p>
        <div className="rc-filter-row">
          {filterOptions.map(f => (
            <button
              key={f}
              className={`rc-filter ${filter === f ? 'rc-filter--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── body ── */}
      <div className="rc-body">
        <p className="rc-section-label">{filtered.length} sport{filtered.length !== 1 ? 's' : ''} recommended</p>

        <div className="rc-grid">
          {filtered.map(sport => (
            <SportCard key={sport.id} sport={sport} onStart={handleStart} />
          ))}
        </div>

        <div className="rc-other-cta">
          <p>Not seeing what you're looking for? <strong>Browse all 20+ adaptive sports</strong> in our full catalogue.</p>
          <button className="rc-btn-outline rc-btn-outline--bright">Explore catalogue →</button>
        </div>
      </div>

    </div>
  );
}

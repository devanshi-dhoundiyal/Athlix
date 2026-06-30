import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  childSummary, progressStats, weeklyActivity,
  latestRecommendation, upcomingSessions, achievements, quickActions,
} from '../../data/dashboardData';
import '../../styles/dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [animated, setAnimated] = useState(false);

  const [child, setChild] = useState(null);

useEffect(() => {
  const savedChild = localStorage.getItem("childProfile");

  if (savedChild) {
    setChild(JSON.parse(savedChild));
  }
}, []);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  const xpPct = Math.round(childSummary.xp / childSummary.xpToNext * 100);

  return (
    <div className="db-page">

      {/* ── header ── */}
      <header className="db-header">
        <a href="/" className="db-logo"><span className="db-logo-icon">✦</span>Athlix</a>
        <div className="db-search">
          <span style={{ color: 'var(--db-light)' }}>🔍</span>
          <input type="text" placeholder="Search sports, sessions, reports…" />
        </div>
        <div className="db-header__right">
          <button className="db-bell" aria-label="Notifications">
            🔔<span className="db-bell__dot" />
          </button>
          <div className="db-user">
            <div className="db-user__avatar">👩</div>
            <span className="db-user__name">
  Parent
</span>
          </div>
        </div>
      </header>

      <main className="db-main">

        <div className="db-welcome">
          <h1>
  Welcome Back! 👋
</h1>
          <p>
  Here's how {child?.name?.split(" ")[0] || "your child"} is progressing this week.
</p>
        </div>

        <div className="db-grid">

          {/* ── LEFT: Child summary ── */}
          <div className="db-child-card">
            <div className="db-child-card__top">
              <div className="db-child-card__avatar">🧒</div>
              <div>
                <p className="db-child-card__name">
  {child?.name || "Child Name"}
</p>
                <p className="db-child-card__meta">
  Age {child?.age || "--"} · {child?.disabilities || "Not specified"}
</p>
              </div>
            </div>

            <div className="db-child-card__stats">
              <div className="db-cc-stat">
                <p className="db-cc-stat__val">{childSummary.sessionsCompleted}</p>
                <p className="db-cc-stat__label">Sessions done</p>
              </div>
              <div className="db-cc-stat">
                <p className="db-cc-stat__val">{childSummary.overallScore}</p>
                <p className="db-cc-stat__label">Overall score</p>
              </div>
              <div className="db-cc-stat">
                <p className="db-cc-stat__val">{childSummary.streakDays}</p>
                <p className="db-cc-stat__label">Day streak</p>
              </div>
              <div className="db-cc-stat">
                <p className="db-cc-stat__val">{childSummary.xp}</p>
                <p className="db-cc-stat__label">XP earned</p>
              </div>
            </div>

            <div className="db-child-card__sport">
              <span className="db-child-card__sport-icon">{childSummary.currentSport.icon}</span>
              <div>
                <p className="db-child-card__sport-label">Currently training</p>
                <p className="db-child-card__sport-name">{childSummary.currentSport.name}</p>
              </div>
            </div>

            <button
className="db-btn-view-profile"
onClick={() => navigate('/child-profile')}
>
              View full profile
            </button>
          </div>

          {/* ── RIGHT: stacked cards ── */}
          <div className="db-col">

            {/* Progress */}
            <div className="db-card">
              <div className="db-card__head">
                <p className="db-card__title">📈 Progress this month</p>
                <a className="db-card__link" onClick={() => navigate('/progress')}>View details</a>
              </div>

              <div className="db-progress-row">
                {progressStats.map(p => (
                  <div className="db-prog-item" key={p.name}>
                    <div className="db-prog-item__top">
                      <span className="db-prog-item__name">{p.name}</span>
                      <span className="db-prog-item__val">{p.val}%</span>
                    </div>
                    <div className="db-prog-bar-bg">
                      <div
                        className="db-prog-bar-fg"
                        style={{ width: animated ? `${p.val}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="db-mini-chart">
                {weeklyActivity.map((d, i) => (
                  <div className="db-mini-bar-wrap" key={i}>
                    <div
                      className={`db-mini-bar ${i === weeklyActivity.length - 1 ? 'db-mini-bar--today' : ''}`}
                      style={{ height: animated ? `${d.val}%` : '0%' }}
                    />
                    <span className="db-mini-bar-label">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest recommendation */}
            <div className="db-card">
              <div className="db-card__head">
                <p className="db-card__title">🏅 Latest recommendation</p>
                <a className="db-card__link" onClick={() => navigate('/recommendations')}>View all</a>
              </div>
              <div className="db-rec-mini">
                <div className="db-rec-mini__icon">{latestRecommendation.icon}</div>
                <div>
                  <p className="db-rec-mini__name">{latestRecommendation.name}</p>
                  <p className="db-rec-mini__match">{latestRecommendation.match}% match</p>
                </div>
                <button className="db-rec-mini__cta" onClick={() => navigate('/recommendations')}>
                  View details
                </button>
              </div>
            </div>

            {/* Upcoming sessions */}
            <div className="db-card">
              <div className="db-card__head">
                <p className="db-card__title">📅 Upcoming sessions</p>
                <a className="db-card__link">Full schedule</a>
              </div>
              <div className="db-sessions-list">
                {upcomingSessions.map((s, i) => (
                  <div className="db-session-item" key={i}>
                    <div className="db-session-item__date">
                      <span className="db-session-item__day">{s.day}</span>
                      <span className="db-session-item__month">{s.month}</span>
                    </div>
                    <div className="db-session-item__info">
                      <p className="db-session-item__name">{s.name}</p>
                      <p className="db-session-item__time">{s.time}</p>
                    </div>
                    <span className="db-session-item__badge">{s.badge}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── FULL WIDTH: Achievements ── */}
          <div className="db-card db-full">
            <div className="db-card__head">
              <p className="db-card__title">🏆 Achievements</p>
              <a className="db-card__link">View all badges</a>
            </div>
            <div className="db-ach-grid">
              {achievements.map(a => (
                <div className={`db-ach-badge ${a.locked ? 'db-ach-badge--locked' : ''}`} key={a.name}>
                  <span className="db-ach-badge__icon">{a.icon}</span>
                  <span className="db-ach-badge__name">{a.name}</span>
                </div>
              ))}
            </div>
            <div className="db-xp-bar-wrap">
              <span className="db-xp-label">Level {childSummary.level}</span>
              <div className="db-xp-bar-bg">
                <div className="db-xp-bar-fg" style={{ width: animated ? `${xpPct}%` : '0%' }} />
              </div>
              <span className="db-xp-label">{childSummary.xp} / {childSummary.xpToNext} XP</span>
            </div>
          </div>

          {/* ── FULL WIDTH: Quick actions ── */}
          <div className="db-full">
            <p className="db-card__title" style={{ marginBottom: 14 }}>⚡ Quick actions</p>
            <div className="db-qa-grid">
              {quickActions.map(qa => (
                <div className="db-qa-card" key={qa.label} onClick={() => navigate(qa.to)}>
                  <span className="db-qa-card__icon">{qa.icon}</span>
                  <span className="db-qa-card__label">{qa.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

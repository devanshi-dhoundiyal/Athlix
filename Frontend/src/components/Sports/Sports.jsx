import { Link } from 'react-router-dom';
import { sportsData } from '../../data/landingData';

export default function Sports() {
  return (
    <section className="sports section" id="sports-we-offer">
      <div className="container">
        <h2 className="section__title">Sports We Offer</h2>
        <div className="section__divider" />

        <div className="sports__grid">
          {sportsData.map((s) => (
            <div className="sport-card" key={s.id}>
              <div className="sport-card__icon">{s.emoji}</div>
              <p className="sport-card__name">{s.name}</p>
            </div>
          ))}
        </div>

        <div className="sports__cta">
          <button className="btn btn--primary btn--lg">
            Explore All Sports →
          </button>
        </div>
      </div>
    </section>
  );
}

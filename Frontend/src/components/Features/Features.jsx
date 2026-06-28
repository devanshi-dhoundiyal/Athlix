import { useState } from 'react';
import { featuresData } from '../../data/landingData';

export default function Features() {
  const [active, setActive] = useState(0);
  const visible = featuresData.slice(active, active + 3);

  return (
    <section className="features section" id="features">
      <div className="container">
        <h2 className="section__title">Features</h2>
        <div className="section__divider" />

        <div className="features__track">
          <button
            className="features__arrow features__arrow--left"
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Previous"
          >
            ‹
          </button>

          <div className="features__cards">
            {featuresData.map((f, i) => (
              <div
                key={f.id}
                className={`feature-card ${i >= active && i < active + 3 ? 'feature-card--visible' : ''}`}
              >
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>

          <button
            className="features__arrow features__arrow--right"
            onClick={() => setActive(Math.min(featuresData.length - 3, active + 1))}
            disabled={active >= featuresData.length - 3}
            aria-label="Next"
          >
            ›
          </button>
        </div>

        <div className="features__dots">
          {Array.from({ length: featuresData.length - 2 }).map((_, i) => (
            <button
              key={i}
              className={`dot ${active === i ? 'dot--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

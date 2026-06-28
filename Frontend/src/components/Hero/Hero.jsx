import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__inner container">
        <div className="hero__content">
          <h1 className="hero__heading">
            Empowering Every Child Through{' '}
            <span className="hero__heading--accent">Adaptive Sports</span>
          </h1>
          <p className="hero__sub">
            Athlix uses AI-powered assessment and personalized training to help
            children of all abilities discover their potential, build confidence
            and stay active through sports they love.
          </p>
          <div className="hero__cta">
            <Link to="/register" className="btn btn--primary btn--lg">
              Get Started →
            </Link>
            <button className="btn btn--ghost btn--lg">
              <span className="btn__play-icon">▶</span> Watch Video
            </button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__blob" />
          <div className="hero__illustration">
            <svg viewBox="0 0 420 380" xmlns="http://www.w3.org/2000/svg" className="hero__svg">
              {/* Grass / ground */}
              <ellipse cx="210" cy="340" rx="190" ry="32" fill="#c8e6c9" opacity="0.6" />
              <ellipse cx="210" cy="340" rx="170" ry="22" fill="#a5d6a7" opacity="0.5" />

              {/* Goal post */}
              <rect x="300" y="200" width="6" height="130" rx="3" fill="#90a4ae" />
              <rect x="350" y="200" width="6" height="130" rx="3" fill="#90a4ae" />
              <rect x="300" y="200" width="56" height="6" rx="3" fill="#90a4ae" />
              {/* Net lines */}
              {[215,228,241,254,267,280,293,306,319].map((y, i) => (
                <line key={i} x1="300" y1={y} x2="356" y2={y} stroke="#b0bec5" strokeWidth="1" opacity="0.7" />
              ))}
              {[308,322,336,350].map((x, i) => (
                <line key={i} x1={x} y1="206" x2={x} y2="330" stroke="#b0bec5" strokeWidth="1" opacity="0.7" />
              ))}

              {/* Trees background */}
              <ellipse cx="80" cy="210" rx="45" ry="55" fill="#66bb6a" opacity="0.7" />
              <ellipse cx="80" cy="195" rx="35" ry="45" fill="#81c784" opacity="0.8" />
              <rect x="76" y="255" width="8" height="30" rx="3" fill="#795548" opacity="0.7" />
              <ellipse cx="360" cy="215" rx="38" ry="48" fill="#66bb6a" opacity="0.6" />
              <ellipse cx="360" cy="200" rx="30" ry="38" fill="#81c784" opacity="0.75" />
              <rect x="356" y="255" width="8" height="28" rx="3" fill="#795548" opacity="0.6" />

              {/* Soccer ball */}
              <circle cx="195" cy="310" r="22" fill="white" stroke="#333" strokeWidth="2" />
              <polygon points="195,290 208,302 203,318 183,318 178,302" fill="#333" opacity="0.85" />
              <polygon points="195,290 178,302 165,296 168,280 195,280" fill="#333" opacity="0.4" />
              <polygon points="208,302 218,290 222,304 212,316 203,318" fill="#333" opacity="0.4" />

              {/* Child body */}
              {/* Legs */}
              <rect x="188" y="255" width="14" height="50" rx="7" fill="#1a6b5c" transform="rotate(-15 195 280)" />
              <rect x="202" y="250" width="14" height="55" rx="7" fill="#1a6b5c" transform="rotate(10 209 278)" />
              {/* Shoes */}
              <ellipse cx="182" cy="300" rx="14" ry="7" fill="#222" transform="rotate(-15 182 300)" />
              <ellipse cx="218" cy="298" rx="14" ry="7" fill="#222" transform="rotate(10 218 298)" />
              {/* Torso */}
              <rect x="178" y="195" width="44" height="62" rx="14" fill="#1a8c74" />
              {/* Shirt number */}
              <text x="200" y="230" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" opacity="0.8">10</text>
              {/* Arms */}
              <rect x="155" y="198" width="26" height="12" rx="6" fill="#1a8c74" transform="rotate(-25 168 204)" />
              <rect x="219" y="198" width="26" height="12" rx="6" fill="#1a8c74" transform="rotate(30 232 204)" />
              {/* Head */}
              <circle cx="200" cy="175" r="28" fill="#FDBCB4" />
              {/* Hair */}
              <ellipse cx="200" cy="152" rx="26" ry="16" fill="#5D4037" />
              <ellipse cx="178" cy="160" rx="10" ry="12" fill="#5D4037" />
              <ellipse cx="222" cy="160" rx="10" ry="12" fill="#5D4037" />
              {/* Eyes */}
              <circle cx="190" cy="176" r="4" fill="#333" />
              <circle cx="210" cy="176" r="4" fill="#333" />
              <circle cx="191" cy="175" r="1.5" fill="white" />
              <circle cx="211" cy="175" r="1.5" fill="white" />
              {/* Smile */}
              <path d="M191 185 Q200 193 209 185" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Cheeks */}
              <circle cx="184" cy="182" r="5" fill="#ffb3a7" opacity="0.5" />
              <circle cx="216" cy="182" r="5" fill="#ffb3a7" opacity="0.5" />
              {/* Socks */}
              <rect x="183" y="292" width="12" height="12" rx="2" fill="white" transform="rotate(-15 189 298)" />
              <rect x="214" y="288" width="12" height="12" rx="2" fill="white" transform="rotate(10 220 294)" />

              {/* Floating stars */}
              <text x="60" y="160" fontSize="20" fill="#FFD700" opacity="0.8">★</text>
              <text x="330" y="150" fontSize="14" fill="#FFD700" opacity="0.6">★</text>
              <text x="348" y="170" fontSize="10" fill="#FFD700" opacity="0.5">★</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}

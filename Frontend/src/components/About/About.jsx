const values = [
  { icon: '👥', title: 'Inclusive for All', desc: 'Designed for children with diverse abilities and needs.' },
  { icon: '🛡️', title: 'Safe & Secure', desc: "Your child's data is protected with top security standards." },
  { icon: '❤️', title: 'Built with Care', desc: 'Developed with experts, therapists and coaches who care.' },
  { icon: '📈', title: 'Grow Together', desc: "We're here to support your child's journey every step of the way." },
];

export default function About() {
  return (
    <section className="about section" id="about-us">
      <div className="container">
        <div className="about__inner">
          {/* Left illustration */}
          <div className="about__visual">
            <svg viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg" className="about__svg">
              {/* BG circle */}
              <circle cx="170" cy="150" r="130" fill="#e0f2f1" opacity="0.6" />

              {/* Child 1 – wheelchair user */}
              <circle cx="80" cy="120" r="20" fill="#FDBCB4" />
              <ellipse cx="80" cy="115" rx="18" ry="12" fill="#5D4037" />
              <rect x="62" y="140" width="36" height="40" rx="10" fill="#e53935" />
              {/* Wheelchair */}
              <circle cx="60" cy="195" r="16" fill="none" stroke="#78909c" strokeWidth="3" />
              <circle cx="100" cy="195" r="16" fill="none" stroke="#78909c" strokeWidth="3" />
              <rect x="58" y="175" width="46" height="10" rx="5" fill="#90a4ae" />
              <rect x="95" y="160" width="8" height="35" rx="4" fill="#90a4ae" />

              {/* Child 2 – stretching */}
              <circle cx="200" cy="90" r="22" fill="#FDBCB4" />
              <ellipse cx="200" cy="84" rx="19" ry="13" fill="#212121" />
              <rect x="182" y="112" width="36" height="48" rx="12" fill="#1a8c74" />
              <rect x="160" y="115" width="28" height="10" rx="5" fill="#1a8c74" transform="rotate(-30 174 120)" />
              <rect x="212" y="108" width="28" height="10" rx="5" fill="#1a8c74" transform="rotate(40 226 113)" />
              <rect x="188" y="158" width="13" height="50" rx="6" fill="#263238" />
              <rect x="201" y="154" width="13" height="52" rx="6" fill="#263238" transform="rotate(10 207 178)" />

              {/* Child 3 – jumping */}
              <circle cx="270" cy="115" r="20" fill="#FDBCB4" />
              <ellipse cx="270" cy="109" rx="17" ry="11" fill="#FF8A65" />
              <rect x="254" y="135" width="32" height="44" rx="10" fill="#7e57c2" />
              <rect x="238" y="137" width="22" height="9" rx="4" fill="#7e57c2" transform="rotate(-40 249 141)" />
              <rect x="276" y="132" width="22" height="9" rx="4" fill="#7e57c2" transform="rotate(35 287 136)" />
              <rect x="256" y="178" width="12" height="38" rx="6" fill="#37474f" transform="rotate(-10 262 197)" />
              <rect x="270" y="176" width="12" height="40" rx="6" fill="#37474f" transform="rotate(15 276 196)" />

              {/* Basketball */}
              <circle cx="110" cy="250" r="18" fill="#FF7043" />
              <path d="M110,232 Q110,250 110,268" stroke="#333" strokeWidth="1.5" fill="none" />
              <path d="M92,250 Q110,250 128,250" stroke="#333" strokeWidth="1.5" fill="none" />
              <path d="M95,238 Q103,250 95,262" stroke="#333" strokeWidth="1" fill="none" />
              <path d="M125,238 Q117,250 125,262" stroke="#333" strokeWidth="1" fill="none" />

              {/* Stars */}
              <text x="140" y="55" fontSize="18" fill="#FFD700">★</text>
              <text x="290" y="70" fontSize="12" fill="#FFD700">★</text>
              <text x="50" y="70" fontSize="12" fill="#FFD700" opacity="0.6">★</text>
            </svg>
          </div>

          {/* Right content */}
          <div className="about__content">
            <h2 className="about__heading">About Athlix</h2>
            <div className="section__divider section__divider--left" />
            <p className="about__body">
              Athlix is an inclusive sports platform designed for children of all abilities.
              We combine AI technology with adaptive training methods to make sports accessible,
              fun and rewarding for everyone.
            </p>

            <div className="about__values">
              {values.map((v) => (
                <div className="value-card" key={v.title}>
                  <span className="value-card__icon">{v.icon}</span>
                  <div>
                    <p className="value-card__title">{v.title}</p>
                    <p className="value-card__desc">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

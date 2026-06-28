import { useState } from 'react';
import { faqData } from '../../data/landingData';

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <div className="faq__inner">
          {/* Left illustration */}
          <div className="faq__visual">
            <svg viewBox="0 0 260 280" xmlns="http://www.w3.org/2000/svg">
              <circle cx="130" cy="140" r="110" fill="#e8f5e9" opacity="0.5" />

              {/* Question marks */}
              <text x="40" y="90" fontSize="52" fill="#1a8c74" opacity="0.15" fontWeight="bold">?</text>
              <text x="160" y="70" fontSize="32" fill="#1a8c74" opacity="0.2" fontWeight="bold">?</text>
              <text x="180" y="160" fontSize="20" fill="#1a8c74" opacity="0.15" fontWeight="bold">?</text>

              {/* Sitting child */}
              <circle cx="130" cy="130" r="28" fill="#FDBCB4" />
              <ellipse cx="130" cy="108" rx="24" ry="16" fill="#5D4037" />
              <rect x="108" y="158" width="44" height="52" rx="14" fill="#1a8c74" />
              {/* Arms pointing up questioningly */}
              <rect x="86" y="155" width="26" height="11" rx="5" fill="#1a8c74" transform="rotate(-50 99 160)" />
              <rect x="148" y="155" width="26" height="11" rx="5" fill="#1a8c74" transform="rotate(50 161 160)" />
              {/* Legs sitting */}
              <rect x="110" y="208" width="16" height="36" rx="8" fill="#263238" transform="rotate(-10 118 226)" />
              <rect x="134" y="208" width="16" height="36" rx="8" fill="#263238" transform="rotate(10 142 226)" />
              {/* Shoes */}
              <ellipse cx="106" cy="244" rx="14" ry="7" fill="#333" />
              <ellipse cx="154" cy="244" rx="14" ry="7" fill="#333" />
              {/* Face */}
              <circle cx="122" cy="130" r="4" fill="#333" />
              <circle cx="138" cy="130" r="4" fill="#333" />
              <path d="M122 143 Q130 148 138 143" stroke="#333" strokeWidth="2" fill="none" />
              <circle cx="116" cy="137" r="4" fill="#ffb3a7" opacity="0.5" />
              <circle cx="144" cy="137" r="4" fill="#ffb3a7" opacity="0.5" />
            </svg>
          </div>

          {/* FAQ list */}
          <div className="faq__list">
            <h2 className="section__title section__title--left">FAQ</h2>
            <div className="section__divider section__divider--left" />

            {faqData.map((item, i) => (
              <div
                key={i}
                className={`faq__item ${open === i ? 'faq__item--open' : ''}`}
              >
                <button
                  className="faq__question"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{item.q}</span>
                  <span className="faq__chevron">{open === i ? '∧' : '∨'}</span>
                </button>
                {open === i && (
                  <p className="faq__answer">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

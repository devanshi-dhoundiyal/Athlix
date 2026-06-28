import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="navbar__logo-icon">✦</span>
              <span>Athlix</span>
            </div>
            <p className="footer__tagline">
              Empowering every child through adaptive sports and AI technology.
            </p>
            <div className="footer__socials">
              {['f', 'in', '▶', 'in'].map((s, i) => (
                <a key={i} href="#" className="footer__social" aria-label={`Social ${i}`}>{s}</a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              {['Home', 'Features', 'How It Works', 'Sports We Offer', 'About Us', 'FAQ'].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} className="footer__link">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer__col">
            <h4 className="footer__col-title">Resources</h4>
            <ul className="footer__links">
              {['Blog', 'Help Center', 'Privacy Policy', 'Terms & Conditions'].map((l) => (
                <li key={l}><a href="#" className="footer__link">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <ul className="footer__links footer__links--contact">
              <li>✉ hello@athlix.com</li>
              <li>📞 +91 98765 43210</li>
              <li>📍 Bangalore, India</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer__col">
            <h4 className="footer__col-title">Newsletter</h4>
            <p className="footer__newsletter-sub">Subscribe to get updates and helpful tips.</p>
            <div className="footer__newsletter">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer__email-input"
                aria-label="Email address"
              />
              <button className="footer__email-btn" aria-label="Subscribe">→</button>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2024 Athlix. All rights reserved.</p>
          <button className="footer__heart" aria-label="Like">♡</button>
        </div>
      </div>
    </footer>
  );
}

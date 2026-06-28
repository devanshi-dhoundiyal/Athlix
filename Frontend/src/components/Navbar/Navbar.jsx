import { useEffect, useState } from "react";
import { Menu, X, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./Navbar.css";

const navItems = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How It Works" },
  { id: "sports", label: "Sports" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const offset = 150;

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);

        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(item.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileOpen(false);

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">

        {/* ================= Logo ================= */}

        <motion.button
          className="logo"
          onClick={() => scrollToSection("home")}
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="logo-icon">
            <Trophy size={22} />
          </span>

          <span className="logo-text">
            Athlix
          </span>
        </motion.button>

        {/* ================= Desktop Navigation ================= */}

        <nav className="desktop-nav">

          {navItems.map((item) => (

            <button
              key={item.id}
              className={`nav-link ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => scrollToSection(item.id)}
              aria-label={item.label}
              aria-current={
                activeSection === item.id ? "page" : undefined
              }
            >
              {item.label}
            </button>

          ))}

        </nav>

        {/* ================= Buttons ================= */}

        <div className="desktop-buttons">

  <Link to="/login" className="login-btn">
    Login
  </Link>

  <Link to="/register" className="start-btn">
    Get Started
  </Link>

</div>

        {/* ================= Mobile Toggle ================= */}

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* ================= Mobile Menu ================= */}

      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: -15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: -15,
            }}
            transition={{
              duration: 0.25,
            }}
          >

            {navItems.map((item) => (

              <button
                key={item.id}
                className="mobile-link"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>

            ))}

            <Link
  to="/login"
  className="mobile-login"
  onClick={() => setMobileOpen(false)}
>
  Login
</Link>

<Link
  to="/register"
  className="mobile-start"
  onClick={() => setMobileOpen(false)}
>
  Get Started
</Link>

          </motion.div>

        )}

      </AnimatePresence>
    </header>
  );
}
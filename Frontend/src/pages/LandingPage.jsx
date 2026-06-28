import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Sports from "../components/Sports/Sports";
import About from "../components/About/About";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";

import "../styles/landing.css";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Sports />
      <About />
      <FAQ />
      <Footer />
    </>
  );
}

export default LandingPage;
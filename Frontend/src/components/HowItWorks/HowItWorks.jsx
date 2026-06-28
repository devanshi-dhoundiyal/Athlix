const steps = [
  { n: 1, icon: '👤', title: 'Create Profile', desc: 'Sign up and create your child\'s profile in a few simple steps.' },
  { n: 2, icon: '📷', title: 'Take Assessment', desc: 'Your child performs simple movements using our AI powered assessment.' },
  { n: 3, icon: '🧠', title: 'Get Insights', desc: 'We analyze the results and provide strengths, areas of improvement and sport recommendations.' },
  { n: 4, icon: '🏃', title: 'Start Training', desc: 'Begin personalized training and track progress over time.' },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="container">
        <h2 className="section__title">How It Works</h2>
        <div className="section__divider" />

        <div className="steps">
          {steps.map((s, i) => (
            <div className="steps__item" key={s.n}>
              <div className="step">
                <div className="step__circle">
                  <span className="step__icon">{s.icon}</span>
                </div>
                <p className="step__num">{s.n}. {s.title}</p>
                <p className="step__desc">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="steps__arrow" aria-hidden="true">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconTarget() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="11" />
      <circle cx="16" cy="16" r="5" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconExplain() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 8.5h20v12H14l-6 4v-4H6z" />
    </svg>
  );
}

function IconComprehend() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="10" />
      <path d="M11.5 16.5l3 3 6-7" />
    </svg>
  );
}

function IconApply() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M10 23L22 11" />
      <path d="M17 10h6v6" />
      <path d="M8 25l5-1-4-4z" />
    </svg>
  );
}

const steps = [
  { title: "Discover", note: "Find what matters", icon: <IconTarget /> },
  { title: "Explain", note: "See it clearly", icon: <IconExplain /> },
  { title: "Comprehend", note: "Make it yours", icon: <IconComprehend /> },
  { title: "Apply", note: "Live the ideas", icon: <IconApply /> }
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <header className="site-nav">
          <a className="wordmark" href="/" aria-label="Praxis home">PRAXIS</a>

          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#discover">Discover</a>
            <a href="#library">Library</a>
          </nav>

          <button className="account-button" type="button" aria-label="Open account">
            <span />
          </button>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">A MORE THOUGHTFUL YOU</p>
            <h1>Integration beats<br />endless information.</h1>
            <p className="hero-description">
              Turn knowledge into a richer, quieter life.
            </p>
            <a className="primary-button" href="#discover">Discover</a>
          </div>

          <div className="hero-art" aria-label="Michelangelo's David sculpture">
            <img src="/david-hero.webp" alt="Michelangelo's David sculpture" />
          </div>
        </div>

        <div className="learning-path" aria-label="Praxis learning path">
          {steps.map((step) => (
            <div className="learning-step" key={step.title}>
              <div className="step-icon">{step.icon}</div>
              <div>
                <p className="step-title">{step.title}</p>
                <p className="step-note">{step.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="discover" className="next-section-anchor" aria-hidden="true" />
      <div id="library" aria-hidden="true" />
    </main>
  );
}

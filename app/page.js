export default function Home() {
  return (
    <main>
      <section className="hero">
        <header className="site-nav">
          <a className="brand-lockup" href="/" aria-label="Praxis home">
            <span className="wordmark">PRAXIS</span>
            <img className="brand-seal" src="/praxis-wax-seal.webp" alt="" aria-hidden="true" />
          </a>

          <div className="nav-actions">
            <nav className="nav-links" aria-label="Primary navigation">
              <a href="#discover">Discover</a>
              <a href="#library">Library</a>
            </nav>

            <button className="account-button" type="button" aria-label="Open account">
              <span />
            </button>
          </div>
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
      </section>

      <div id="discover" className="next-section-anchor" aria-hidden="true" />
      <div id="library" aria-hidden="true" />
    </main>
  );
}

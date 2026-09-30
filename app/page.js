"use client";

import { useState } from "react";

const domains = [
  "Reasoning & Sensemaking",
  "Decisions & Risk",
  "Self-Knowledge & Behaviour",
  "Human Nature & Social Behaviour",
  "Relationships & Attraction",
  "Communication & Influence",
  "Power, Strategy & Conflict",
  "Learning, Memory & Attention",
  "Meaning, Ethics & Philosophy",
  "Myth, Symbol & Spiritual Traditions",
  "Creativity, Craft & Mastery",
  "Society, Culture & Systems"
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="m15.4 15.4 4.3 4.3" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19 13.5v-3l-2-.7a7 7 0 0 0-.8-1.8l.9-1.9-2.2-2.2-1.9.9a7 7 0 0 0-1.8-.8l-.7-2h-3l-.7 2a7 7 0 0 0-1.8.8l-1.9-.9-2.2 2.2.9 1.9a7 7 0 0 0-.8 1.8l-2 .7v3l2 .7a7 7 0 0 0 .8 1.8l-.9 1.9 2.2 2.2 1.9-.9a7 7 0 0 0 1.8.8l.7 2h3l.7-2a7 7 0 0 0 1.8-.8l1.9.9 2.2-2.2-.9-1.9a7 7 0 0 0 .8-1.8z" />
    </svg>
  );
}

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const visibleDomains = [-2, -1, 0, 1, 2].map((offset) => {
    const index = (selected + offset + domains.length) % domains.length;
    return { name: domains[index], offset };
  });

  function spin() {
    if (spinning) return;
    setSpinning(true);

    let steps = 20 + Math.floor(Math.random() * 17);
    let current = selected;

    const tick = () => {
      current = (current + 1) % domains.length;
      setSelected(current);
      steps -= 1;

      if (steps <= 0) {
        setSpinning(false);
        return;
      }

      const delay = steps < 7 ? 125 : steps < 13 ? 92 : 66;
      window.setTimeout(tick, delay);
    };

    tick();
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-overlay" />

        <header className="site-nav">
          <a className="brand-lockup" href="/" aria-label="Praxis home">
            <span className="wordmark">PRAXIS</span>
            <img className="brand-seal" src="/praxis-seal-transparent.webp" alt="" aria-hidden="true" />
          </a>

          <div className="nav-right">
            <button className="search-button" type="button" aria-label="Search Praxis">
              <SearchIcon />
            </button>
            <button className="button button-red join-button" type="button">
              Join Praxis
            </button>
          </div>
        </header>

        <div className="hero-content">
          <div className="thesis-block">
            <h1>Integration beats<br />endless information.</h1>
            <p className="thesis-subtitle">Turn knowledge into a richer, quieter life.</p>
          </div>

          <div className="discover-zone" id="discover">
            <div className="discover-copy">
              <h2>What will you<br />discover today?</h2>
              <p>Let curiosity lead you somewhere meaningful.</p>
            </div>

            <div className="wheel-stack">
              <div className={`discovery-wheel ${spinning ? "is-spinning" : ""}`} aria-live="polite">
                <div className="wheel-side wheel-side-left" />
                <div className="wheel-window">
                  {visibleDomains.map(({ name, offset }) => (
                    <div
                      className={`wheel-slot offset-${offset} ${offset === 0 ? "is-selected" : ""}`}
                      key={`${name}-${offset}`}
                    >
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
                <div className="wheel-side wheel-side-right" />
                <div className="wheel-pointer" aria-hidden="true" />
              </div>

              <div className="wheel-actions">
                <button className="button button-red" type="button" onClick={spin} disabled={spinning}>
                  {spinning ? "Spinning" : "Spin"}
                </button>
                <button className="button button-cream" type="button">
                  Start 10 min research
                </button>
                <button className="icon-button" type="button" aria-label="Discover settings">
                  <GearIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

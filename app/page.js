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
      <circle cx="10.6" cy="10.6" r="6.1" />
      <path d="m15.1 15.1 4.5 4.5" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19 13.5v-3l-2-.7a7.5 7.5 0 0 0-.8-1.8l.9-1.9-2.2-2.2-1.9.9a7.5 7.5 0 0 0-1.8-.8l-.7-2h-3l-.7 2a7.5 7.5 0 0 0-1.8.8l-1.9-.9-2.2 2.2.9 1.9a7.5 7.5 0 0 0-.8 1.8l-2 .7v3l2 .7a7.5 7.5 0 0 0 .8 1.8l-.9 1.9 2.2 2.2 1.9-.9a7.5 7.5 0 0 0 1.8.8l.7 2h3l.7-2a7.5 7.5 0 0 0 1.8-.8l1.9.9 2.2-2.2-.9-1.9a7.5 7.5 0 0 0 .8-1.8z" />
    </svg>
  );
}

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const visible = [-2, -1, 0, 1, 2].map((offset) => {
    const index = (selected + offset + domains.length) % domains.length;
    return { name: domains[index], offset };
  });

  function spin() {
    if (spinning) return;
    setSpinning(true);

    let remaining = 18 + Math.floor(Math.random() * 16);
    let current = selected;

    const advance = () => {
      current = (current + 1) % domains.length;
      setSelected(current);
      remaining -= 1;

      if (remaining <= 0) {
        setSpinning(false);
        return;
      }

      const delay = remaining < 6 ? 150 : remaining < 11 ? 105 : 70;
      window.setTimeout(advance, delay);
    };

    advance();
  }

  return (
    <main>
      <section className="hero">
        <img
          className="hero-art"
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Raphael%27s_Two_Cherubs.jpg?width=2099"
          alt=""
          aria-hidden="true"
        />
        <div className="hero-grade" />

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

        <div className="hero-inner">
          <div className="thesis-block">
            <h1>Integration beats<br />endless information.</h1>
            <p>Turn knowledge into a richer, quieter life.</p>
          </div>

          <div className="discovery-row">
            <div className="discover-copy">
              <h2>What will you<br />discover today?</h2>
              <p>Let curiosity lead you somewhere meaningful.</p>
            </div>

            <div className="wheel-column">
              <div className={`wheel ${spinning ? "spinning" : ""}`} aria-live="polite">
                <div className="wheel-cap cap-left" />
                <div className="wheel-body">
                  {visible.map(({ name, offset }) => (
                    <div
                      key={`${name}-${offset}`}
                      className={`wheel-item wheel-item-${offset} ${offset === 0 ? "selected" : ""}`}
                    >
                      {name}
                    </div>
                  ))}
                </div>
                <div className="wheel-cap cap-right" />
                <div className="wheel-pointer" />
              </div>

              <div className="wheel-actions">
                <button className="button button-red spin-button" type="button" onClick={spin} disabled={spinning}>
                  {spinning ? "Spinning" : "Spin"}
                </button>

                <button className="button button-cream research-button" type="button">
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

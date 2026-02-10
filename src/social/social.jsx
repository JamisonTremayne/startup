import React from 'react';
import { NavLink } from 'react-router-dom';
import './social.css';

export function Social() {
  return (
          <main>
            <nav className="menu-nav">
                <ul>
                    <li><div>Welcome <span id="username">user</span>!</div></li>
                    <li><NavLink to="/">Logout</NavLink></li>
                    <li><NavLink to="/game">Return to Game</NavLink></li>
                </ul>
            </nav>
            <section id="high-scores">
                <h2>High Scores</h2>
                <section className="score-start">
                    <div className="score-row">
                        <div>1</div>
                        <div>Joe</div>
                        <div>8000 pixels</div>
                    </div>
                    <div className="score-row">
                        <div>2</div>
                        <div>Jo</div>
                        <div>4800 pixels</div>
                    </div>
                    <div className="score-row">
                        <div>3</div>
                        <div>Joh</div>
                        <div>4000 pixels</div>
                    </div>
                </section>
            </section>
        </main>
  );
}
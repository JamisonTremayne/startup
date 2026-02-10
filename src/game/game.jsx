import React from 'react';
import './game.css';
import { NavLink } from 'react-router-dom';

export function Game() {
  return (
          <main>
            <nav>
                <ul>
                    <li><div>Welcome <span id="username">user</span>!</div></li>
                    <li><NavLink to="/">Logout</NavLink></li>
                    <li><NavLink to="social">Social Page</NavLink></li>
                </ul>
            </nav>
            <div id="random-quote">Random Quote: "Pixels are very lovely or something." -Me </div>
            <hr />
            <div id="pixel-display">You currently have <span id="pixel-count">0</span> pixels.</div>

            <div id="game-area">
                 <div> Click the pixel </div>
                 <button id="blue-pixel">
                    <svg width="50" height="50">
                        <rect x="0" y="0" width="50" height="50" fill="blue" />
                    </svg>
                </button>
            </div>

             <div id="shop">
                <p id="shop-title">Pixel Shop</p>
                <section className="grid-start">
                    <div className="grid row">
                        <div>Pixel Miner (Generate passive pixel income):</div>
                        <div>100 px</div>
                        <div><button className="buy-button" id="pixel-miner">BUY</button></div>
                    </div>
                    <div className="grid row">
                        <div>Better Pixels (they're just better):</div>
                        <div>2.0k px</div>
                        <div><button className="buy-button" id="better-pixels">BUY</button></div>
                    </div>
                    <div className="grid row"> 
                        <div>Some other upgrade:</div>
                        <div>1.562b px</div>
                        <div><button className="buy-button" id="other-upgrades">BUY</button></div>
                    </div>
                </section>
             </div>
        </main>
  );
}
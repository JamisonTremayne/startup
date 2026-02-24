import React from 'react';
import { NavLink } from 'react-router-dom';
import './game.css';
import { incrementPixel } from '../userData.js'

export function Game(props) {

    const userData = props.userData;
    const pixels = userData.pixels;
    const setUserData = props.setUserData;
    const [quote, setQuote] = React.useState("");
    const [quoteAuthor, setQuoteAuthor] = React.useState("");


    function getColor(r, g, b) {
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    function getColorRatio(r_px, g_px, b_px) {
        const total = Math.max(r_px + g_px + b_px, 255);
        const red_ratio = r_px / total;
        const green_ratio = g_px / total;
        const blue_ratio = b_px / total;
        return getColor(Math.floor(red_ratio * 255), Math.floor(green_ratio * 255), Math.floor(blue_ratio * 255));
    }

    function formatNumber(number) {
        const abbrList = ['k', 'm', 'b', 't', 'q', 'Q']
        let abbrIdx = -1;
        while (number >= 1000.0) {
            number /= 1000.0;
            abbrIdx++;
        }
        const abbr = abbrIdx > -1? abbrList[abbrIdx]: '';
        number = Math.round(number * 1000) / 1000.0;
        return number + abbr;
    }

    React.useEffect(() => {
        setQuote("Pixels are very lovely or something.");
        setQuoteAuthor("Me");
    }, [])

    function handlePixelClick(color) {
        let upgradeExpo = 0;
        if (color == 'red') upgradeExpo = userData.upgrades.redPixelUpgrade;
        else if (color == 'green') upgradeExpo = userData.upgrades.greenPixelUpgrade;
        else if (color == 'blue') upgradeExpo = userData.upgrades.bluePixelUpgrade;
        const amount = 2 ** upgradeExpo;
        setUserData(prev => incrementPixel(prev, color, amount));
    }
    
  return (
          <main>
            <nav className="menu-nav">
                <ul>
                    <li><div>Welcome <span id="username">user</span>!</div></li>
                    <li><NavLink to="/">Logout</NavLink></li>
                    <li><NavLink to="/social">Social Page</NavLink></li>
                </ul>
            </nav>
            <div id="random-quote">Random Quote: "{quote}" -{quoteAuthor} </div>
            <hr />
            <div id="pixel-display">
                <div className="pixel-numbers">
                    <div className="red-pixels">{formatNumber(pixels.red)}</div>
                    <div className="green-pixels">{formatNumber(pixels.green)}</div>
                    <div className="blue-pixels">{formatNumber(pixels.blue)}</div>
                </div>

                <div className="pixel-square">
                    <svg width="40" height="40">
                        <rect
                            x="0"
                            y="0"
                            width="40"
                            height="40"
                            fill={getColorRatio(pixels.red, pixels.green, pixels.blue)}
                        />
                    </svg>
                </div>
            </div>

            <div id="game-area">
                 <div> Click the pixel </div>
                 <button id="blue-pixel" onClick={() => handlePixelClick('blue')}>
                    <svg width="50" height="50">
                        <rect x="0" y="0" width="50" height="50" fill={getColor(0,0,255)} />
                    </svg>
                </button>
            </div>

             <div id="shop">
                <p id="shop-title">Pixel Shop</p>
                <section className="shop-start">
                    <div className="shop-row">
                        <div>Pixel Miner (Generate passive pixel income):</div>
                        <div>100 px</div>
                        <div><button className="buy-button" id="pixel-miner">BUY</button></div>
                    </div>
                    <div className="shop-row">
                        <div>Better Pixels (they're just better):</div>
                        <div>2.0k px</div>
                        <div><button className="buy-button" id="better-pixels">BUY</button></div>
                    </div>
                    <div className="shop-row"> 
                        <div>Some other upgrade:</div>
                        <div>1.562b px</div>
                        <div><button className="buy-button" id="other-upgrades">BUY</button></div>
                    </div>
                </section>
             </div>
        </main>
  );
}
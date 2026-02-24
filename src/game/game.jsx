import React from 'react';
import { NavLink } from 'react-router-dom';
import './game.css';

export function Game(props) {

    const userData = props.userData;
    const [quote, setQuote] = React.useState("");
    const [quoteAuthor, setQuoteAuthor] = React.useState("");
    const [pixels, setPixels] = React.useState(userData.pixels);

    function getColor(r, g, b) {
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    function getColorRatio(r_px, g_px, b_px) {
        const total = r_px + g_px + b_px;
        const red_ratio = r_px / total;
        const green_ratio = g_px / total;
        const blue_ratio = b_px / total;
        return getColor(Math.floor(red_ratio * 255), Math.floor(green_ratio * 255), Math.floor(blue_ratio * 255));
    }

    React.useEffect(() => {
        setQuote("Pixels are very lovely or something.");
        setQuoteAuthor("Me");
    }, [])
    
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
                <div id="red-pixels">
                    {pixels.red}
                </div>
                <div id="green-pixels">
                    {pixels.green}      
                </div>
                <div id="blue-pixels">
                    {pixels.blue}
                </div>
                You currently have <span id="pixel-count">0</span> pixels.
            </div>

            <div id="game-area">
                 <div> Click the pixel </div>
                 <button id="blue-pixel">
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
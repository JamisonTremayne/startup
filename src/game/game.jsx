import React from 'react';
import { NavLink } from 'react-router-dom';
import './game.css';
import { incrementPixel } from '../userData.js'
import { UpgradeData, getUpgradeList, getUpgradeCost } from './upgrade.js'

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
        if (color === 'red') upgradeExpo = userData.upgrades.redPixelUpgrade;
        else if (color === 'green') upgradeExpo = userData.upgrades.greenPixelUpgrade;
        else if (color === 'blue') upgradeExpo = userData.upgrades.bluePixelUpgrade;
        const amount = 2 ** upgradeExpo;
        setUserData(prev => incrementPixel(prev, color, amount));
    }

    function handleBuyUpgrade(upgradeData) {
        const cost = upgradeData.cost;
        if (cost.r <= pixels.red &&
            cost.g <= pixels.green &&
            cost.b <= pixels.blue && 
            !upgradeData.maxed) {
                buyUpgrade(upgradeData.src, cost.r, cost.g, cost.b);
            }
        else {
            // TODO
        }
    }

    function buyUpgrade(upgrade, cost_r, cost_g, cost_b) {
        setUserData(prev => {
            return {
                ...prev,
                pixels: {
                    red: prev.pixels.red - cost_r,
                    green: prev.pixels.green - cost_g,
                    blue: prev.pixels.blue - cost_b
                },
                upgrades: {
                    ...prev.upgrades,
                    [upgrade]: prev.upgrades[upgrade] + 1
                }
            };
        });
    }

    function ColoredPixels(r_px, g_px, b_px) {
        return (
            <div className="pixels">
                <div className="pixel-row">
                    <div className="red-pixel">
                        <svg width="10" height="10">
                            <rect width="10" height="10" fill="rgb(255,80,80)"/>
                        </svg>
                    </div>
                    <div className="red-pixels">{r_px}</div>
                </div>
                <div className="pixel-row">
                    <div className="green-pixel">
                        <svg width="10" height="10">
                            <rect width="10" height="10" fill="rgb(80,255,80)"/>
                        </svg>
                    </div>
                    <div className="green-pixels">{g_px}</div>
                </div>
                <div className="pixel-row">
                    <div className="blue-pixel">
                        <svg width="10" height="10">
                            <rect width="10" height="10" fill="rgb(80,80,255)"/>
                        </svg>
                    </div>
                    <div className="blue-pixels">{b_px}</div>
                </div>
            </div>
        );
    }

    function ClickPixel(colorObj) {
        const color = colorObj.color;
        let colorVal = getColor(255, 255, 255);
        if (color === 'red') colorVal = getColor(255, 80, 80);
        else if (color === 'green') colorVal = getColor(80, 255, 80);
        else if (color === 'blue') colorVal = getColor(80, 80, 255);

        return (
            <div className="click-pixel">
                <button onClick={() => handlePixelClick(color)}>
                    <svg width="50" height="50">
                        <rect x="0" y="0" width="50" height="50" fill={colorVal} />
                    </svg>
                </button>
            </div>
        );
    }

    function UpgradeEntry(upgradeData) {
        return (
            <div className="shop-row">
                <div>{upgradeData.name} - ( lvl {upgradeData.level} )</div>
                <div>Cost{ColoredPixels(
                    upgradeData.cost.r, 
                    upgradeData.cost.g,
                    upgradeData.cost.b)}
                </div>
                <div>
                    <button 
                    className="buy-button" 
                    onClick={() => handleBuyUpgrade(upgradeData)}>BUY
                    </button>
                </div>
            </div>
        );
    }

    const upgradeList = getUpgradeList(userData);
    let clickablePixels = ['blue'];
    if (userData.upgrades.greenPixel) clickablePixels.push('green');
    if (userData.upgrades.redPixel) clickablePixels.push('red');
    
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
                <div>{ColoredPixels(
                    formatNumber(pixels.red),
                    formatNumber(pixels.green),
                    formatNumber(pixels.blue)
                )}</div>

                <div className="pixel-square">
                    <svg width="40" height="40">
                        <rect
                            width="40"
                            height="40"
                            fill={getColorRatio(pixels.red, pixels.green, pixels.blue)}
                        />
                    </svg>
                </div>
            </div>
            <div id="game-area">
                 <div> Click the pixel </div>
                 <div className='clickable-pixels'>
                    {clickablePixels.map(pixel => (
                        <ClickPixel 
                            key={pixel}
                            color={pixel}
                        />
                    ))}
                 </div>
            </div>
            <div id="shop">
                <p id="shop-title">Pixel Shop</p>
                <section className="shop-start">
                    {upgradeList.map(upgrade => (
                        <UpgradeEntry
                            key={upgrade.name}
                            {...upgrade}
                        />
                    ))}
                </section>
             </div>
        </main>
  );
}
import React from 'react';
import { NavLink } from 'react-router-dom';
import './game.css';
import { incrementPixel, getCapacity } from '../utilities/userData.js';
import { Upgrades } from './upgrade.jsx';
import { logout } from '../utilities/account.js';
import { SaveButton } from '../utilities/save.jsx';
import { getColor, getColorRatio, formatNumber } from '../utilities/tools.js';
import { ColoredPixels } from './colored_pixels.jsx';
import { GameNotifier, setToastHandler } from './gameNotifier.js';

export function Game(props) {

    const userName = props.userName;
    const setUserName = props.setUserName;
    const userData = props.userData;
    const setUserData = props.setUserData;
    const pixels = userData.pixels;
    const [quote, setQuote] = React.useState("");
    const [quoteAuthor, setQuoteAuthor] = React.useState("");
    const availableMilestones = [500, 1000, 5000, 25000, 100000, 500000, 2500000, 10000000, 50000000, 250000000, 1000000000];

    React.useEffect(() => {
        fetch('https://quote.cs260.click')
            .then((response) => response.json())
            .then((data) => {
            setQuote(data.quote);
            setQuoteAuthor(data.author);
            })
            .catch();
    }, []);

    const userDataRef = React.useRef(userData);
    React.useEffect(() => {
        userDataRef.current = userData;
    }, [userData]);

    // Check for milestones to display to other users through the notifier.
    React.useEffect(() => {
        const interval = setInterval(() => {
            const currentUserData = userDataRef.current;
            if (!currentUserData) return;
            if (!currentUserData.milestones) {
                setUserData(prev => ({
                    ...prev,
                    milestones: []
                }));
            }
            const score = currentUserData.pixels.red + currentUserData.pixels.green + currentUserData.pixels.blue;
            console.log('Score: ', score, ', Milestones:', currentUserData.milestones);
            for (const milestone of availableMilestones) {
                if (score >= milestone && !currentUserData.milestones.includes(milestone)) {
                    setUserData(prev => ({
                        ...prev,
                        milestones: [...prev.milestones, milestone]
                    }));
                    GameNotifier.broadcastEvent(userName, `${milestone}`);
                    const message = `You just reached ${milestone} pixels!`;
                    props.setToast({
                        message: message,
                        type: 'info'
                    });
                    break;
                }
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Send toast handler for game notifier to display milestone notifications.
    React.useEffect(() => {
        setToastHandler(props.setToast);
    }, [props.setToast]);

    function handleLogout() {
        logout(setUserName, userData, setUserData, props.setToast);
    }

    function handlePixelClick(color) {
        let upgradeExpo = 0;
        if (color === 'red') upgradeExpo = userData.upgrades.redPixelUpgrade;
        else if (color === 'green') upgradeExpo = userData.upgrades.greenPixelUpgrade;
        else if (color === 'blue') upgradeExpo = userData.upgrades.bluePixelUpgrade;
        const amount = 2 ** upgradeExpo;
        setUserData(prev => incrementPixel(prev, color, amount));
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

    let clickablePixels = ['blue'];
    if (userData) {
        if (userData.upgrades.greenPixel) clickablePixels.push('green');
        if (userData.upgrades.redPixel) clickablePixels.push('red');
    }
    
  return (
          <main>
            <div>
                <nav className='menu-nav'>
                    <ul>
                        <li><div>Welcome <span id="username">{userName}</span>!</div></li>
                        <li><NavLink to="/" onClick={handleLogout}>Logout</NavLink></li>
                        <li><NavLink to="/social">Social Page</NavLink></li>
                        <li><SaveButton 
                            userData={userData} 
                            setToast={props.setToast} /></li>
                    </ul>
                </nav>
            </div>
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
                <div id='capacity'>
                    <span style={{color: getColorRatio(pixels.red+80, pixels.green+80, pixels.blue+80)}}>
                        Capacity: {getCapacity(userData.upgrades.hoardCapacity)}
                    </span>
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
                    <Upgrades userData={userData} setUserData={setUserData} />
                </section>
             </div>
        </main>
  );
}
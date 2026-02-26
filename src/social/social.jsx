import React from 'react';
import { NavLink } from 'react-router-dom';
import './social.css';
import { logout } from '../utilities/account.js';
import { SaveButton } from '../utilities/save.jsx';

export function Social({ userData, account, setUserData, setAccount, setToast }) {
    function handleLogout() {
        logout(userData, account, setUserData, setAccount, setToast);
    }

    function getHighScores() {
        const accountArray = JSON.parse(localStorage.getItem('account_array')) || [];
        let sortedArray = accountArray.sort((a,b) => 
        getScore(b.userData) - getScore(a.userData));
        let scoreArray = [];
        for (let i = 0; i < sortedArray.length && i < 50; i++) {
            const account = sortedArray[i];
            const scoreData = {
                index: i + 1,
                userName: account.userName,
                score: getScore(account.userData)
            };
            scoreArray.push(scoreData);
        }
        return scoreArray;
    }

    function getScore(userData) {
        const pixels = userData.pixels;
        if (!pixels) return 0;
        return pixels.red + pixels.green + pixels.blue;
    }

    function ScoreEntry(scoreData) {
        const index = scoreData.index;
        const userName = scoreData.userName;
        const score = scoreData.score;
        return (
            <div className='score-row'>
                <div>{index}</div>
                <div>{userName}</div>
                <div>{score} pixels</div>
            </div>
        );
    }

    const scores = getHighScores();

  return (
          <main>
            <nav className="menu-nav">
                <ul>
                    <li><div>Welcome <span id="username">{userData.userName}</span>!</div></li>
                    <li><NavLink to="/" onClick={handleLogout}>Logout</NavLink></li>
                    <li><NavLink to="/">Return to Game</NavLink></li>
                    <li><SaveButton 
                        account={account} 
                        userData={userData} 
                        setToast={setToast} /></li>
                </ul>
            </nav>
            <section id="high-scores">
                <h2>High Scores</h2>
                <section className="score-start">
                    {scores.map(scoreData => (
                        <ScoreEntry
                            key={scoreData.index}
                            {...scoreData}
                        />
                    ))}
                </section>
            </section>
        </main>
  );
}
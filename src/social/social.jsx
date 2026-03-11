import React from 'react';
import { NavLink } from 'react-router-dom';
import './social.css';
import { logout } from '../utilities/account.js';
import { SaveButton } from '../utilities/save.jsx';

export async function Social(props) {
    const userName = props.userName;
    const setUserName = props.setUserName;
    const userData = props.userData;
    const setUserData = props.setUserData;
    
    function handleLogout() {
        logout(setUserName, userData, setUserData, props.setToast);
    }

    async function getHighScores() {
        const response = fetch(`/scores/`, { method: 'post'});
        return (await response).json();
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

    const scores = await getHighScores();

  return (
          <main>
            <nav className="menu-nav">
                <ul>
                    <li><div>Welcome <span id="username">{userName}</span>!</div></li>
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
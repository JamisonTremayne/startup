import React from 'react';
import { BrowserRouter, useNavigate, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Register } from './register/register';
import { Game } from './game/game';
import { Social } from './social/social';
import { applyMinerProduction } from './userData.js';
import { saveUserData, loadUserData } from './saveSystem.js';
import './app.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; -- I don't currently use bootstrap.

export default function App() {
    const [account, setAccount] = React.useState(JSON.parse(localStorage.getItem('account')) || '');
    const userName = account.userName || '';
    const [userData, setUserData] = React.useState(loadUserData(userName));

    React.useEffect(() => { // Every 30 seconds, autosave the user data.
        const interval = setInterval(() => {
            if (userData) {
                saveUserData(userData);
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [userData]);

    React.useEffect(() => { // Auto-increment pixels based on Miners every second.
        const interval = setInterval(() => {
            if (userData) {
                setUserData(prev => applyMinerProduction(prev, 1));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

  return (
    <BrowserRouter>
        <div>
            <header>
                <img src="pixel_hoarder_title.png" alt="Pixel Hoarder Title" className="mx-auto" width="500"/>
                <hr />
            </header>

            <Routes>
                <Route path='/' element={
                    !account ? <Login
                            account={account}
                            setAccount={setAccount} />
                            : <Game 
                            userData={userData}
                            setUserData={setUserData}
                            setAccount={setAccount} />} exact /> 
                            
                <Route path='/register' element={<Register 
                            setAccount={setAccount}/>} />
                <Route path='/social' element={<Social />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
                <hr />
                <p>Author: Jamison Tremayne</p>
                <NavLink to="https://github.com/JamisonTremayne/startup">Github Link</NavLink>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}
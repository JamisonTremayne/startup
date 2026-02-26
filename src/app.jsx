import React from 'react';
import { BrowserRouter, useNavigate, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Register } from './register/register';
import { Game } from './game/game';
import { Social } from './social/social';
import { applyMinerProduction } from './utilities/userData.js';
import { saveUserData, loadUserData } from './utilities/saveSystem.js';
import { saveGame } from './utilities/account.js';
import './app.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; -- I don't currently use bootstrap.

export default function App() {
    const [account, setAccount] = React.useState(JSON.parse(localStorage.getItem('account')) || '');
    const userName = account ? account.userName || '' : '';
    const [userData, setUserData] = React.useState(loadUserData(userName));

    const userDataRef = React.useRef(userData);
    const accountRef = React.useRef(account);

    React.useEffect(() => {
        userDataRef.current = userData;
    }, [userData]);

    React.useEffect(() => {
        accountRef.current = account;
    }, [account]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const currentUser = userDataRef.current;
            const currentAccount = accountRef.current;

            if (!currentUser) return;

            saveGame(currentUser, currentAccount);
            console.log("Autosaving...");

        }, 30000);

        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => { // Auto-increment pixels based on Miners every second.
        const interval = setInterval(() => {
            if (!userData) return;
            setUserData(prev => 
                prev ? applyMinerProduction(prev, 1) : prev
            );
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
                            setAccount={setAccount}
                            setUserData={setUserData} />
                            : <Game 
                            userData={userData}
                            setUserData={setUserData}
                            account={account}
                            setAccount={setAccount} />} exact /> 
                            
                <Route path='/register' element={<Register 
                            account={account}
                            setAccount={setAccount}
                            setUserData={setUserData}/>} />
                <Route path='/social' element={<Social 
                            userData={userData}
                            account={account}
                            setUserData={setUserData}
                            setAccount={setAccount}/>} />
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
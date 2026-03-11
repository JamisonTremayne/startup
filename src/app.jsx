import React from 'react';
import { BrowserRouter, useNavigate, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Register } from './register/register';
import { Game } from './game/game';
import { Social } from './social/social';
import { applyMinerProduction } from './utilities/userData.js';
import { loadUserData } from './utilities/saveSystem.js';
import { saveGame } from './utilities/account.js';
import { Toast } from './utilities/toast.jsx';
import './app.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; -- I don't currently use bootstrap.

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const [userData, setUserData] = React.useState(null);
    const [toast, setToast] = React.useState(null);

    const userDataRef = React.useRef(userData);
    const userNameRef = React.useRef(userName);

    console.log(userData);

    React.useEffect(() => {
        userDataRef.current = userData;
    }, [userData]);

    React.useEffect(() => {
        userNameRef.current = userName;
    }, [userName]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const currentUser = userDataRef.current;
            const currentUserName = userNameRef.current;

            if (!currentUser) return;

            saveGame(currentUser, currentUserName, setToast);
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

    React.useEffect(() => { // Toast timeout 
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast(null);
        }, 1500);

        return () => clearTimeout(timer);
    }, [toast]);

  return (
    <BrowserRouter>
        <div>
            <header>
                <img src="pixel_hoarder_title.png" alt="Pixel Hoarder Title" className="mx-auto" width="500"/>
                <hr />
            </header>

            <Routes>
                <Route path='/' element={
                    userName == '' ? <Login
                            setUserName={setUserName}
                            setUserData={setUserData} />
                            : <Game 
                            userName={userName}
                            setUserName={setUserName}
                            userData={userData}
                            setUserData={setUserData}
                            setToast={setToast} />} exact /> 
                <Route path='/register' element={<Register 
                            setUserName={setUserName}
                            setUserData={setUserData}/>} />
                <Route path='/social' element={<Social 
                            userName={userName}
                            setUserName={setUserName}
                            userData={userData}
                            setUserData={setUserData}
                            setToast={setToast}/>} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            {toast && <Toast message={toast.message} type={toast.type} />}

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
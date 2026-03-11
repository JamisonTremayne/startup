import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../login/login.css';

export function Register({ account, setAccount, setUserData }) {
    const [inputUserName, setInputUserName] = React.useState('');
    const [inputPassword, setInputPassword] = React.useState('');
    const [inputEmail, setInputEmail] = React.useState('');
    const [guestAccount, setGuest] = React.useState(JSON.parse(localStorage.getItem('guest_account')) || null);
    const [accountExists, setAccountExists] = React.useState(false);
    const navigate = useNavigate();

    async function handleGuest() {
        const guestId = localStorage.getItem('guestId') || null;
        if (guestAccount === null) {
            const res = await fetch("/guest/", { method: "POST" });
            const data = await res.json();
            guestId = data.guestId;
            localStorage.setItem("guestId", guestId);
            await registerRequest(guestId, "", "");
        } else {
            const res = await fetch("/auth/login/", { 
                method: "POST" 
            });
            const loadedUserData = loadUserData(guestAccount.userName);
            setUserData(() => loadedUserData);
            setAccount(() => guestAccount);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await registerRequest(inputUserName, inputPassword, inputEmail);
    }

    async function registerRequest(userName, password, email) {
        const response = await fetch(`/auth/create/`, {
            method: 'POST',
            body: JSON.stringify({ userName: userName, password: password, email: email }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            setAccountExists(() => true);
            return;
        }
        const newAccount = await response.json();
        setAccount(() => newAccount);
        setUserData(() => newAccount.userData);
        setAccountExists(() => false);
        navigate('/');
    }
    
  return (
    <main>
        <div className="login-register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email Add. : </label>
                    <input className="px-4 rounded-lg bg-purple-900 text-white
                        border border-purple-600
                        focus:outline-none focus:ring-2 focus:ring-purple-400
                        placeholder-purple-300"
                        type="email" id="email" name="email" placeholder="Enter your email" required 
                        onChange={(e) => setInputEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input className="px-4 rounded-lg bg-purple-900 text-white
                        border border-purple-600
                        focus:outline-none focus:ring-2 focus:ring-purple-400
                        placeholder-purple-300"
                        type="text" id="username" name="username" placeholder="Enter your username" required 
                        onChange={(e) => setInputUserName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input className="px-4 rounded-lg bg-purple-900 text-white
                        border border-purple-600
                        focus:outline-none focus:ring-2 focus:ring-purple-400
                        placeholder-purple-300"
                        type="password" id="password" name="password" placeholder="Enter your password" required 
                        onChange={(e) => setInputPassword(e.target.value)}/>
                </div>
                <div>
                    <button className="w-full mt-4 rounded-lg
                        bg-purple-600 hover:bg-purple-500
                        text-white font-semibold
                        transition duration-200
                        focus:outline-none focus:ring-2 focus:ring-purple-400"
                        type="submit">Register</button>
                </div>
                {accountExists && <div className="error-message">
                An account with that username already exists! Please pick a different username, or
                <NavLink to='/'> Login </NavLink>if you already have an account.
                </div>}
            </form>
        </div>
        <div className="login-options">
            <h3>Other Options</h3>
            <nav>
                <ul>
                    <li> <span id="already-have-account">Have an account?</span> <NavLink to="/">Login instead.</NavLink></li>
                    <li><NavLink to="/" onClick={handleGuest}>Play as Guest</NavLink></li>
                    <li><NavLink to="/social">See Social Page</NavLink></li>
                </ul>
            </nav>
        </div>
    </main>
  );
}
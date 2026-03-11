import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';
import { loadUserData } from '../utilities/saveSystem.js';

export function Login({ setUserName, setUserData }) {

  const [inputUserName, setInputUserName] = React.useState('');
  const [inputPassword, setInputPassword] = React.useState('');
  const [loginFail, setLoginFail] = React.useState(false);

async function handleGuest() {
    let guestId = localStorage.getItem('guestId') || null;
    if (guestId === null) {
        const res = await fetch(`/api/guest`, { method: "post" });
        const data = await res.json();
        guestId = data.guestId;
        localStorage.setItem("guestId", guestId);
        await registerRequest(guestId, "", "");
    } else {
        await fetch(`/api/auth/login`, {
            method: 'post',
            body: JSON.stringify({ userName: guestId, password: "" }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const loadedUserData = await loadUserData(guestId);
        setUserData(loadedUserData);
        localStorage.setItem('userName', guestId);
        setUserName(guestId);
    }
}

async function loginRequest(userName, password) {
    const response = await fetch(`/api/auth/login`, {
        method: 'post',
        body: JSON.stringify({ userName: userName, password: password }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (response?.status === 200) {
        localStorage.setItem('userName', userName);
        setUserName(userName);
        const userData = await loadUserData(userName);
        setUserData(userData);
        setLoginFail(false);
        navigate('/');
    } else {
        setLoginFail(true);
        return;
    }
}

// For if a guest account is chosen but one doesn't exist
async function registerRequest(userName, password, email) {
    const response = await fetch(`/api/auth/create`, {
        method: 'post',
        body: JSON.stringify({ userName: userName, password: password, email: email }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (response?.status === 200) {
        const newUserData = await loadUserData(userName); //Should make a new user data object
        setUserData(newUserData);
        localStorage.setItem('userName', userName);
        setUserName(() => userName);
    } 
}

  async function handleSubmit(e) {
      e.preventDefault();
      await loginRequest(inputUserName, inputPassword);
  }

  return (
    <main>
      <div className="login-register">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
                          type="submit">Login</button>
          </div>
        </form>
        {loginFail && <div className="error-message">
          Login attempt failed. Make sure your password is correct, or
          <NavLink to='/register'> Register </NavLink>if you don't have an account.
          </div>}
      </div>
      <div className="login-options">
        <h3>Other Options</h3>
        <nav>
          <ul>
            <li><NavLink to="/register">Register an Account</NavLink></li>
            <li><NavLink to="/" onClick={handleGuest}>Play as Guest</NavLink></li>
            <li><NavLink to="/social">See Social Page</NavLink></li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
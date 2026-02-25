import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';
import { Account } from '../register/account.js';
import { verifyAccount } from './authentication.js';
import { createUserData } from '../userData.js';

export function Login({ userData, setUserData }) {

  const [inputUserName, setInputUserName] = React.useState('');
  const [inputPassword, setInputPassword] = React.useState('');
  const [guestAccount, setGuestAccount] = React.useState(localStorage.getItem('guestAccount') || '');
  
  function handleGuest() {
    if (guestAccount === '') {
      makeGuestAccount();
    } else {
      loginRequest(guestAccount);
    }
  }

  function loginRequest(account) {
    if (verifyAccount(account)) {
      // Normally, get user data for the account in the database.
      setUserData(() => new createUserData(account.userName))
    } else {
      // TO-DO
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const account = getAccount(inputUserName);
    if (!account) {
      // TO-DO
      return;
    }
    loginRequest(account);
  }

  function getAccount(userName) {
    // Currently not useful, but maybe once database is added.
    return null;
  }

  return (
    <main>
      <div className="login-register">
        <h1>Login</h1>
        <form action="game" method="get" onSubmit={handleSubmit}>
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
      </div>
      <div className="login-options">
        <h3>Other Options</h3>
        <nav>
          <ul>
            <li><NavLink to="/register">Register an Account</NavLink></li>
            <li><NavLink to="/game" onClick={handleGuest}>Play as Guest</NavLink></li>
            <li><NavLink to="/social">See Social Page</NavLink></li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
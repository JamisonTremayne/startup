import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';
import { makeGuestAccount, findAccount } from '../utilities/account.js';
import { verifyAccount } from './authentication.js';
import { createUserData } from '../utilities/userData.js';
import { loadUserData } from '../utilities/saveSystem.js';

export function Login({ account, setAccount, setUserData }) {

  const [inputUserName, setInputUserName] = React.useState('');
  const [inputPassword, setInputPassword] = React.useState('');
  const [guestAccount, setGuest] = React.useState(JSON.parse(localStorage.getItem('guest_account')) || null);
  const [loginFail, setLoginFail] = React.useState(false);

  function handleGuest() {
    if (!guestAccount) {
      const newGuestAccount = makeGuestAccount();
      setAccount(() => newGuestAccount);
      setUserData(() => newGuestAccount.userData);
      setAccountExists(() => false);
    } else {
      localStorage.setItem('account', JSON.stringify(guestAccount));
      const loadedUserData = loadUserData(guestAccount.userName);
      setUserData(() => loadedUserData);
      setAccount(() => guestAccount);
    }
  }

  function loginRequest(userName, password) {
    const requestAccount = findAccount(userName);
    if (!requestAccount) {
      setLoginFail(() => true);
      console.log("Bad Login Request");
      return;
    }
    if (verifyAccount(requestAccount, password)) {
      // Normally, get user data for the account in the database.
      console.log("Account verified");
      localStorage.setItem('account', JSON.stringify(requestAccount));
      const loadedUserData = loadUserData(requestAccount.userName);
      setUserData(() => loadedUserData);
      setAccount(() => requestAccount);
      setLoginFail(() => false);
    } else {
      setLoginFail(() => true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginRequest(inputUserName, inputPassword);
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
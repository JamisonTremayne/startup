import React from 'react';
import { NavLink } from 'react-router-dom';
import '../login/login.css';

export function Register() {
  return (
    <main>
            <div className="login-register">
                <h2>Register</h2>
                <form action="game" method="get">
                    <div>
                        <label htmlFor="email">Email Add. : </label>
                        <input className="px-4 rounded-lg bg-purple-900 text-white
                            border border-purple-600
                            focus:outline-none focus:ring-2 focus:ring-purple-400
                            placeholder-purple-300"
                            type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input className="px-4 rounded-lg bg-purple-900 text-white
                            border border-purple-600
                            focus:outline-none focus:ring-2 focus:ring-purple-400
                            placeholder-purple-300"
                            type="text" id="username" name="username" placeholder="Enter your username" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input className="px-4 rounded-lg bg-purple-900 text-white
                            border border-purple-600
                            focus:outline-none focus:ring-2 focus:ring-purple-400
                            placeholder-purple-300"
                            type="password" id="password" name="password" placeholder="Enter your password" required />
                    </div>
                    <div>
                        <button className="w-full mt-4 rounded-lg
                            bg-purple-600 hover:bg-purple-500
                            text-white font-semibold
                            transition duration-200
                            focus:outline-none focus:ring-2 focus:ring-purple-400"
                        type="submit">Register</button>
                    </div>
                </form>
            </div>
            <div className="login-options">
                <h3>Other Options</h3>
                <nav>
                    <ul>
                        <li> <span id="already-have-account">Have an account?</span> <NavLink to="/">Login instead.</NavLink></li>
                        <li><NavLink to="/game">Play as Guest</NavLink></li>
                        <li><NavLink to="/social">See Social Page</NavLink></li>
                    </ul>
                </nav>
            </div>
        </main>
  );
}
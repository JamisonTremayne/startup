import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; -- I don't currently use bootstrap.
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Register } from './register/register';
import { Social } from './social/social';

export default function App() {
  return (
    <div className="body">
        <header>
            <img src="pixel_hoarder_title.png" alt="Pixel Hoarder Title" className="mx-auto" width="500"/>
            <hr />
        </header>

        <footer>
            <hr />
            <p>Author: Jamison Tremayne</p>
            <NavLink href="https://github.com/JamisonTremayne/startup">Github Link</NavLink>
        </footer>
    </div>
  );
}
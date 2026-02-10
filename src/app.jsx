import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; -- I don't currently use bootstrap.
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Register } from './register/register';
import { Game } from './game/game';
import { Social } from './social/social';

export default function App() {
  return (
    <BrowserRouter>
        <div className="body">
            <header>
                <img src="pixel_hoarder_title.png" alt="Pixel Hoarder Title" className="mx-auto" width="500"/>
                <hr />
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/game' element={<Game />} />
                <Route path='/register' element={<Register />} />
                <Route path='/social' element={<Social />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
                <hr />
                <p>Author: Jamison Tremayne</p>
                <NavLink href="https://github.com/JamisonTremayne/startup">Github Link</NavLink>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}
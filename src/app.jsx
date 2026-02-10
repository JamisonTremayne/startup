import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; -- I don't currently use bootstrap.
import './app.css';


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
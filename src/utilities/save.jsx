import React from 'react';

import { saveGame } from './account.js';

export function SaveButton({ userData, setToast }) {

    function handleSaveGame() {
        saveGame(userData, setToast);
    }

    return (
        <div>
            <button 
                className='save-button' 
                onClick={handleSaveGame}>SAVE
            </button>
        </div>
    );
}
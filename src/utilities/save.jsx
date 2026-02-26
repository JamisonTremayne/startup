import React from 'react';

import { saveGame } from './account.js';

export function SaveButton({ account, userData, setToast }) {

    function handleSaveGame() {
        saveGame(userData, account, setToast);
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
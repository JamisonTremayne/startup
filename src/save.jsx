import React from 'react';

import { saveGame } from './register/account.js';

export function SaveButton({ account, userData }) {

    function handleSaveGame() {
        saveGame(userData, account);
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
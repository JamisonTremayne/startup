import React from 'react';

export function Toast({ message, type }) {
    return (
        <div className={`toast ${type}`}>
            {message}
        </div>
    );
}
import React from 'react';

export function ColoredPixels(r_px, g_px, b_px) {
    return (
        <div className="pixels">
            <div className="pixel-row">
                <div className="red-pixel">
                    <svg width="10" height="10">
                        <rect width="10" height="10" fill="rgb(255,80,80)"/>
                    </svg>
                </div>
                <div className="red-pixels">{r_px}</div>
            </div>
            <div className="pixel-row">
                <div className="green-pixel">
                    <svg width="10" height="10">
                        <rect width="10" height="10" fill="rgb(80,255,80)"/>
                    </svg>
                </div>
                <div className="green-pixels">{g_px}</div>
            </div>
            <div className="pixel-row">
                <div className="blue-pixel">
                    <svg width="10" height="10">
                        <rect width="10" height="10" fill="rgb(80,80,255)"/>
                    </svg>
                </div>
                <div className="blue-pixels">{b_px}</div>
            </div>
        </div>
    );
}
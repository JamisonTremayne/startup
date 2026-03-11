import React from 'react';
import { ColoredPixels } from './colored_pixels';

export function Upgrades({ userData, setUserData }) {

    const upgradeList = [
        "greenPixel",
        "redPixel",
        "redPixelUpgrade",
        "greenPixelUpgrade",
        "bluePixelUpgrade",
        "redPixelMiner",
        "greenPixelMiner",
        "bluePixelMiner",
        "hoardCapacity"
    ];

    const maxedCost = { r: -1, g: -1, b: -1 };

    class UpgradeData {
        constructor(name, src, level, maxed, cost_r, cost_g, cost_b) {
            this.name=name;
            this.src=src;
            this.level=level;
            this.maxed=maxed;
            this.cost = {
                r: cost_r,
                g: cost_g,
                b: cost_b
            }
        }
    }

    function getUpgradeName(pseudoName) {
        const upgradeIndex = getUpgradeIndex(pseudoName);
        switch (upgradeIndex) {
            case 0: { return "Green Pixel" };
            case 1: { return "Red Pixel" };
            case 2: { return "Red Pixel Upgrade" };
            case 3: { return "Green Pixel Upgrade" };
            case 4: { return "Blue Pixel Upgrade" };
            case 5: { return "Red Pixel Miner" };
            case 6: { return "Green Pixel Miner" };
            case 7: { return "Blue Pixel Miner" };
            case 8: { return "Hoard Capacity" };
            default: { return "UNDEFINED" };
        }
    }

    function getUpgradeIndex(upgradeName) {
        for (let i = 0; i < upgradeList.length; i++) {
            const upgrade = upgradeList[i];
            if (upgrade === upgradeName) {
                return i;
            }
        }
        return -1;
    }

    function getUpgradeList(data) {
        const upg = data.upgrades;
        let list = [];
        list.push(getUpgradeData('greenPixel', upg.greenPixel));
        list.push(getUpgradeData('bluePixelUpgrade', upg.bluePixelUpgrade));
        list.push(getUpgradeData('bluePixelMiner', upg.bluePixelMiner));
        list.push(getUpgradeData('hoardCapacity', upg.hoardCapacity));
        if (upg.greenPixel > 0) {
            list.push(getUpgradeData('redPixel', upg.redPixel));
            list.push(getUpgradeData('greenPixelUpgrade', upg.greenPixelUpgrade));
            list.push(getUpgradeData('greenPixelMiner', upg.greenPixelMiner));
            if (upg.redPixel > 0) {
                list.push(getUpgradeData('redPixelUpgrade', upg.redPixelUpgrade));
                list.push(getUpgradeData('redPixelMiner', upg.redPixelMiner));
            }
        }
        const ORDER_MAP = Object.fromEntries(
            upgradeList.map((name, index) => [name, index])
        );
        list.sort((a, b) => {
            const orderA = ORDER_MAP[a.name] ?? Infinity;
            const orderB = ORDER_MAP[b.name] ?? Infinity;

            if (orderA !== orderB) return orderA - orderB;

            return Number(a.maxed) - Number(b.maxed);
        });
        return list;
    }

    function getUpgradeData(upgrade, level) {
        const upgradeName = getUpgradeName(upgrade);
        const cost = getUpgradeCost(upgrade, level);
        const maxed = cost === maxedCost;
        const upgradeData = new UpgradeData(upgradeName, upgrade, level, maxed, cost.r, cost.g, cost.b);
        return upgradeData;
    }

    function getUpgradeCost(upgrade, level) {
        const upgradeIndex = getUpgradeIndex(upgrade);
        switch (upgradeIndex) {
            case 0: {
                if (level === 0) {
                    return { r: 0, g: 0, b: 256 };
                } else {
                    return maxedCost;
                }
            };
            case 1: {
                if (level === 0) {
                    return { r: 0, g: 256, b: 512 };
                } else {
                    return maxedCost;
                }
            };
            case 2: {
                if (level < 16) {
                    const r_cost = Math.round(100 * (2.2 ** level));
                    const g_cost = Math.max(Math.round(50 * (1.6 ** level) - 50), 0);
                    const b_cost = Math.max(Math.round(50 * (1.6 ** level) - 50), 0);
                    return { r: r_cost, g: g_cost, b: b_cost };
                } else {
                    return maxedCost;
                }
            };
            case 3: {
                if (level < 16) {
                    const r_cost = Math.max(Math.round(50 * (1.6 ** level) - 128), 0);
                    const g_cost = Math.round(100 * (2.2 ** level));
                    const b_cost = Math.max(Math.round(50 * (1.6 ** level) - 50), 0);
                    return { r: r_cost, g: g_cost, b: b_cost };
                } else {
                    return maxedCost;
                }
            };
            case 4: {
                if (level < 16) {
                    const r_cost = Math.max(Math.round(50 * (1.6 ** level) - 328), 0);
                    const g_cost = Math.max(Math.round(50 * (1.6 ** level) - 128), 0);
                    const b_cost = Math.round(100 * (2.2 ** level));
                    return { r: r_cost, g: g_cost, b: b_cost };
                } else {
                    return maxedCost;
                }
            };
            case 5: {
                if (level < 1025) {
                    const r_cost = Math.round(50 * (1.4 ** level) + 450);
                    const g_cost = Math.max(Math.round(50 * (1.4 ** level) - 98), 0);
                    const b_cost = Math.max(Math.round(50 * (1.4 ** level) - 98), 0);
                    return { r: r_cost, g: g_cost, b: b_cost };
                } else {
                    return maxedCost;
                }
            };
            case 6: {
                if (level < 1025) {
                    const r_cost = Math.max(Math.round(50 * (1.4 ** level) - 192), 0);
                    const g_cost = Math.round(50 * (1.4 ** level) + 200);
                    const b_cost = Math.max(Math.round(50 * (1.4 ** level) - 98), 0);
                    return { r: r_cost, g: g_cost, b: b_cost };
                } else {
                    return maxedCost;
                }
            };
            case 7: {
                if (level < 1025) {
                    const r_cost = Math.max(Math.round(50 * (1.4 ** level) - 376), 0);
                    const g_cost = Math.max(Math.round(50 * (1.4 ** level) - 192), 0);
                    const b_cost = Math.round(50 * (1.4 ** level));
                    return { r: r_cost, g: g_cost, b: b_cost };
                } else {
                    return maxedCost;
                }
            };
            case 8: {
                if (level < 32) {
                    const r_cost = Math.max(Math.round(100 * (2 ** level) - 1600), 0);
                    const g_cost = Math.max(Math.round(100 * (2 ** level) - 400), 0);
                    const b_cost = Math.round(100 * (2 ** level));
                    return { r: r_cost, g: g_cost, b: b_cost };
                } else {
                    return maxedCost;
                }
            };
            default: {
                return maxedCost;
            };
        }
    }

    function canBuyUpgrade(pixels, upgradeData) {
        const cost = upgradeData.cost;
        if (cost.r <= pixels.red &&
            cost.g <= pixels.green &&
            cost.b <= pixels.blue && 
            !upgradeData.maxed) {
                return true;
        } else {
            return false;
        }
    }

    function buyUpgrade(upgrade, cost_r, cost_g, cost_b, setUserData) {
        setUserData(prev => {
            return {
                ...prev,
                pixels: {
                    red: prev.pixels.red - cost_r,
                    green: prev.pixels.green - cost_g,
                    blue: prev.pixels.blue - cost_b
                },
                upgrades: {
                    ...prev.upgrades,
                    [upgrade]: prev.upgrades[upgrade] + 1
                }
            };
        });
    }

    function handleBuyUpgrade(upgradeData) {
        if (canBuyUpgrade(userData.pixels, upgradeData)) {
            const cost = upgradeData.cost;
            buyUpgrade(upgradeData.src, cost.r, cost.g, cost.b, setUserData);
        } else {
            // TODO
        }
    }

    function UpgradeEntry(upgradeData) {
        if (!upgradeData.maxed) {
            return (
                <div className="shop-row">
                    <div>{upgradeData.name} - ( lvl {upgradeData.level} )</div>
                    <div>Cost{ColoredPixels(
                        upgradeData.cost.r, 
                        upgradeData.cost.g,
                        upgradeData.cost.b)}
                    </div>
                    <div>
                        <button 
                        className={ canBuyUpgrade(userData.pixels, upgradeData) ? 
                            "buy-button" : "buy-button-poor"} 
                        onClick={() => handleBuyUpgrade(upgradeData)}>BUY
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="shop-row-maxed">
                    <div>{upgradeData.name} - ( lvl {upgradeData.level} )</div>
                    <div>
                        <button 
                        className="maxed-button">MAXED
                        </button>
                    </div>
                </div>
            )
        }
    }

    const upgrades = getUpgradeList(userData);
    return (
        <div className='upgrades'>
            {upgrades.map(upgrade => (
                <UpgradeEntry
                    key={upgrade.name}
                    {...upgrade}
                />
            ))}
        </div>
    );
}


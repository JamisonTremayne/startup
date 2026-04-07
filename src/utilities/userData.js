export function createUserData(userName) {
    return {
        userName,

        pixels: {
            red: 0,
            green: 0,
            blue: 0
        },

        upgrades: {
            greenPixel: 0,
            redPixel: 0,
            redPixelUpgrade: 0,
            greenPixelUpgrade: 0,
            bluePixelUpgrade: 0,
            redPixelMiner: 0,
            greenPixelMiner: 0,
            bluePixelMiner: 0,
            hoardCapacity: 0
        },

        milestones: [],
        timeStamp: Date.now(),
        version: 1
    };
}

export function incrementPixel(data, color, amount) {
    const capacity = getCapacity(data.upgrades.hoardCapacity);
    amount = Math.min(capacity - data.pixels[color], amount);
    return {
        ...data,
        pixels: {
            ...data.pixels,
            [color]: data.pixels[color] + amount
        }
    };
}

export function applyMinerProduction(data, seconds) {
    const capacity = getCapacity(data.upgrades.hoardCapacity);
    const redGain = Math.min(capacity - data.pixels.red, data.upgrades.redPixelMiner);
    const greenGain = Math.min(capacity - data.pixels.green, data.upgrades.greenPixelMiner);
    const blueGain = Math.min(capacity - data.pixels.blue, data.upgrades.bluePixelMiner);
    return {
        ...data,
        pixels: {
            red: data.pixels.red + redGain * seconds,
            green: data.pixels.green + greenGain * seconds,
            blue: data.pixels.blue + blueGain * seconds
        }
    };
}

export function updateTimeStamp(data) {
    return {
        ...data,
        timeStamp: Date.now()
    };
}

export function getCapacity(level) {
    return 256 * 2 ** level;
}
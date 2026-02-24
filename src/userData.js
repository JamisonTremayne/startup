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

        timeStamp: Date.now(),
        version: 1
    };
}

export function incrementPixel(data, color, amount) {
    return {
        ...data,
        pixels: {
            ...data.pixels,
            [color]: data.pixels[color] + amount
        }
    };
}

export function applyMinerProduction(data, seconds) {
    return {
        ...data,
        pixels: {
            red: data.pixels.red + data.upgrades.redPixelMiner * seconds,
            green: data.pixels.green + data.upgrades.greenPixelMiner * seconds,
            blue: data.pixels.blue + data.upgrades.bluePixelMiner * seconds
        }
    };
}

export function updateTimeStamp(data) {
    return {
        ...data,
        timeStamp: Date.now()
    };
}
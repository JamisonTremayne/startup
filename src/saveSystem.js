import { UserData } from "./userData.js";

export function saveUserData(userData) {
    userData.updateTimeStamp();
    localStorage.setItem(userData.username, JSON.stringify(userData));
}

export function loadUserData(userName) {
    const data = localStorage.getItem(userName);
    if (!data) {
        return new UserData(userName);
    }

    const parsedData = JSON.parse(data);

    const userData = new UserData(parsedData.userName);
    userData.pixels = parsedData.pixels;
    userData.upgrades = parsedData.upgrades;
    userData.timeStamp = parsedData.timeStamp;
    userData.version = parsedData.version;

    compareTimeStamps(userData);

    return userData;
}

function compareTimeStamps(userData) {
    const currentTime = Date.now();
    const elapsedTimeInSeconds = Math.floor((currentTime - userData.timeStamp) / 1000);

    const gainedRedPixels = elapsedTimeInSeconds * userData.upgrades.redPixelMiner;
    const gainedGreenPixels = elapsedTimeInSeconds * userData.upgrades.greenPixelMiner;
    const gainedBluePixels = elapsedTimeInSeconds * userData.upgrades.bluePixelMiner;

    userData.incrementPixel('red', gainedRedPixels);
    userData.incrementPixel('green', gainedGreenPixels);
    userData.incrementPixel('blue', gainedBluePixels);

    userData.updateTimeStamp();
}

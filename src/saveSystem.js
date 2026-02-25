import { createUserData, applyMinerProduction, updateTimeStamp } from "./userData.js";

export function saveUserData(userData) {
    const newData = updateTimeStamp(userData);
    localStorage.setItem(userData.userName, JSON.stringify(newData));
}

export function loadUserData(userName) {
    const rawData = localStorage.getItem(userName);
    console.log(rawData);
    if (!rawData) {
        return createUserData(userName);
    }

    return applyOfflineProgress(JSON.parse(rawData));
}

function applyOfflineProgress(data) {
    const currentTime = Date.now();
    const elapsedTimeInSeconds = Math.floor((currentTime - data.timeStamp) / 1000);

    data = applyMinerProduction(data, elapsedTimeInSeconds);

    return updateTimeStamp(data);
}

import { createUserData, applyMinerProduction, updateTimeStamp } from "./userData.js";

export async function saveUserData(userData) {
    const newData = updateTimeStamp(userData);
    await fetch(`/api/userdata/submit`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newData),
    });
}

export async function loadUserData(userName) {
    if (!userName) return null;
    const response = await fetch(`/api/userdata/${encodeURIComponent(userName)}`);
    if (!response.ok) {
        return createUserData(userName);
    }

    const data = await response.json();
    return applyOfflineProgress(data);
}

function applyOfflineProgress(data) {
    const currentTime = Date.now();
    const elapsedTimeInSeconds = Math.floor((currentTime - data.timeStamp) / 1000);

    data = applyMinerProduction(data, elapsedTimeInSeconds);

    return updateTimeStamp(data);
}

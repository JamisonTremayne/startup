export class UserData {
    constructor(userName) {
        this.userName = userName;

        this.pixels = {
            red: 0,
            green: 0,
            blue: 0
        }

        this.upgrades = {           // Object with all possible upgrades and their levels.
            "redPixelUpgrade": 0,
            "greenPixelUpgrade": 0,
            "bluePixelUpgrade": 0,
            "redPixelMiner": 0,     // For now, each level of miners will produce 1 pixel per second.
            "greenPixelMiner": 0,
            "bluePixelMiner": 0,
            "hoardCapacity": 0
        }

        this.timeStamp = Date.now();    // Used to calculate offline progress.
        this.version = 1; // Was recommended by AI, so I will include it to be safe.
    }

    updateTimeStamp() {
        this.timeStamp = Date.now();
    }
}
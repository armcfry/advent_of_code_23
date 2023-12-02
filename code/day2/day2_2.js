const { default: test } = require('node:test');

const fs = require('fs').promises;

async function getStringFromLines() {
    let validGameSum = 0;
    let maximumValues = [];
    let power = 0;
    let powerSum = 0;
    const diceMap = new Map([
        ['red', 12],
        ['green', 13],
        ['blue', 14]
    ]);
    const file = await fs.open('../../input_files/day2/input2.txt');
    for await (const line of file.readLines()) {
        maximumValues = isGameValid(diceMap, line);
        power = maximumValues[0] * maximumValues[1] * maximumValues[2];
        console.log(`Power: ${power}`);
        powerSum += power;
        console.log("testing");
    }
    return powerSum;
}

function isGameValid(diceMap, line) {
    // clean line
    let newLine = line.replace(/\s+/g, '');     // remove spaces
    let gameNumber = newLine.split(":");
    let gameNumberString = gameNumber[0].replace("Game", '');
    let gameInteger = parseInt(gameNumberString);
    let validGame = true;

    let lineArrays = gameNumber[1].split(";")    // make an array of the game info
    let maxVals = [2];
    maxVals[0] = 0; // red
    maxVals[1] = 0; // blue
    maxVals[2] = 0; // green
    for (let i = 0; i < lineArrays.length; i++) {
        let currentRound = lineArrays[i];
        let anotherSplit = currentRound.split(",");
        for (let k = 0; k < anotherSplit.length; k++) {
            let currentConsideration = anotherSplit[k];
            if (currentConsideration.includes("red")) {
                currentConsideration.replace("red", '')
                let value = parseInt(currentConsideration);
                if (value > maxVals[0]) {
                    maxVals[0] = value;
                }
            } else if (currentConsideration.includes("blue")) {
                currentConsideration.replace("blue", '')
                let value = parseInt(currentConsideration);
                if (value > maxVals[1]) {
                    maxVals[1] = value;
                }

            } else if (currentConsideration.includes("green")) {
                currentConsideration.replace("green", '')
                let value = parseInt(currentConsideration);
                if (value > maxVals[2]) {
                    maxVals[2] = value;
                }
            } else {
                throw "Error in data. Reassess";
            }
        }
    }
    return maxVals;
}

async function day2() {
    const testData = await getStringFromLines();
    return testData;
}

day2().then(solution => {
    console.log(solution);
});
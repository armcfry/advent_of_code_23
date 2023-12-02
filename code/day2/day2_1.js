const { default: test } = require('node:test');

const fs = require('fs').promises;

async function getStringFromLines() {
    let validGameSum = 0;
    const diceMap = new Map([
        ['red', 12],
        ['green', 13],
        ['blue', 14]
    ]);
    const file = await fs.open('../../input_files/day2/input2.txt');
    for await (const line of file.readLines()) {
        let valueToAdd = isGameValid(diceMap, line);
        validGameSum += valueToAdd;
    }
    return validGameSum;
}

function isGameValid(diceMap, line) {
    // clean line
    let newLine = line.replace(/\s+/g, '');     // remove spaces
    let gameNumber = newLine.split(":");
    let gameNumberString = gameNumber[0].replace("Game", '');
    let gameInteger = parseInt(gameNumberString);
    let validGame = true;

    let lineArrays = gameNumber[1].split(";")    // make an array of the game info
    for (let i = 0; i < lineArrays.length; i++) {
        let currentRound = lineArrays[i];
        let anotherSplit = currentRound.split(",");
        for (let k = 0; k < anotherSplit.length; k++) {
            let currentConsideration = anotherSplit[k];
            if (currentConsideration.includes("red")) {
                // remove word
                currentConsideration.replace("red", '')
                // convert integer
                let value = parseInt(currentConsideration);
                // compare with map
                if (value > diceMap.get("red")) {
                    // console.log(`Invalid Game #: ${gameInteger}`);
                    validGame = false;
                    break;
                }
            } else if (currentConsideration.includes("blue")) {
                // remove word
                currentConsideration.replace("blue", '')
                // convert integer
                let value = parseInt(currentConsideration);
                // compare with map
                if (value > diceMap.get("blue")) {
                    // console.log(`Invalid Game #: ${gameInteger}`);
                    validGame = false;
                    break;
                }

            } else if (currentConsideration.includes("green")) {
                // remove word
                currentConsideration.replace("green", '')
                // convert integer
                let value = parseInt(currentConsideration);
                // compare with map
                if (value > diceMap.get("green")) {
                    // console.log(`Invalid Game #: ${gameInteger}`);
                    validGame = false;
                    break;
                }
            } else {
                throw "Error in data. Reassess";
            }
        }
    }
    if(validGame){
        return gameInteger;
    } else {
        return 0;
    }
}

async function day2() {
    const testData = await getStringFromLines();
    return testData;
}

day2().then(solution => {
    console.log(solution);
});
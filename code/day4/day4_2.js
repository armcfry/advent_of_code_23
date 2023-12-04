const fs = require('fs').promises;

async function getStringFromLines() {
    let lineCount = 1;
    let cardMap = new Map();
    const file = await fs.open('../../input_files/day4/input4.txt');
    let sum = 0;
    for await (const line of file.readLines()) {
        let winCount = getWinCount(line);
        let iterator = 1;
        // always iterate for the original card
        if(cardMap[lineCount]){
            cardMap[lineCount] += 1;
            iterator = cardMap[lineCount]; // how many copies of this card are there?
        } else {
            cardMap[lineCount] = 1;
        }

        if(winCount > 0){ // check for winning numbers
            for (let i = 0; i < iterator; i++){        // for each copy of the card
                for (let j = 1; j <= winCount; j++){     // calculate copy based on wincount
                    if(cardMap[lineCount+j]){
                        cardMap[lineCount+j] += 1;
                    } else {
                        cardMap[lineCount+j] = 1;
                    }
                }
            }
        }
        lineCount ++;
    }
    let cardSum = 0;
    for (const key in cardMap) {
        cardSum += cardMap[key];
    }
    return cardSum;
}

function getWinCount(line) {
    let linee = line.replaceAll("  ", " ");
    let stringg = linee.split(": ");
    let stringgg = stringg[1].split(" | ");
    let winning_nums = stringgg[0].split(" ");
    let actual_nums = stringgg[1].split(" ");
    let intersection = winning_nums.filter(x => actual_nums.includes(x));
    return intersection.length;
}

async function day4() {
    const testData = await getStringFromLines();
    return testData;
}

day4().then(solution => {
    console.log(solution);
});
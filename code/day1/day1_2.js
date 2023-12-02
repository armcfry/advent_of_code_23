const fs = require('fs').promises;

async function getStringFromLines() {
    let allLines = "";
    let doubleDigits = [];
    const digitSpellingMap = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
        [4, 'four'],
        [5, 'five'],
        [6, 'six'],
        [7, 'seven'],
        [8, 'eight'],
        [9, 'nine']
    ]);
    const file = await fs.open('../input_files/day1/input1.txt');
    for await (const line of file.readLines()) {
        // convert the spelling of the digits to digits before proceeding
        const wordsGone = cleanData(digitSpellingMap, line);
        const lineInts = getIntegersFromString(wordsGone);
        if(lineInts.length > 1){
            // number is the edges
            let number = "" + lineInts[0] + lineInts[lineInts.length-1];
            // console.log(number);
            doubleDigits.push(parseInt(number));
        } else if (lineInts.length == 1) {
            // number is the middle twice
            let number = "" + lineInts + lineInts;
            //console.log(number)
            doubleDigits.push(parseInt(number));
        }

    }
    return doubleDigits;
}

function getIntegersFromString(data){
    let allIntegers = "";
    for(let i = 0; i < data.length; i++){
        if (!isNaN(data[i])){
            //console.log(`A number! ${data[i]}`);
            allIntegers += data[i];
        }
    }
    return allIntegers;
}

function cleanData(wordMap, line){
    let cleanString = line;
    for(let i = 1; i < 10; i++){
        let word = wordMap.get(i);
        if (cleanString.includes(word)) {
            switch (word) {
                case 'one':
                    cleanString = cleanString.replaceAll(word, "o1e");
                    break;
                case 'two':
                    cleanString = cleanString.replaceAll(word, "t2o");
                    break;
                case 'three':
                    cleanString = cleanString.replaceAll(word, "t3e");
                    break;
                case 'four':
                    cleanString = cleanString.replaceAll(word, "4");
                    break;
                case 'five':
                    cleanString = cleanString.replaceAll(word, "5e");
                    break;
                case 'six':
                    cleanString = cleanString.replaceAll(word, "6");
                    break;
                case 'seven':
                    cleanString = cleanString.replaceAll(word, "7n");
                    break;
                case 'eight':
                    cleanString = cleanString.replaceAll(word, "e8");
                    break;
                case 'nine':
                    cleanString = cleanString.replaceAll(word, "9");
                    break;
            }
        }
    }
    return cleanString;
}

async function day1 (){
    const testData = await getStringFromLines();
    const sum = await testData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum;
}

day1().then(solution => {
    console.log(solution);
});


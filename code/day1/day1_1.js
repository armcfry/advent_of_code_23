const fs = require('fs').promises;

async function getStringFromLines() {
    let allLines = "";
    let doubleDigits = [];
    const file = await fs.open('../input_files/day1/input1.txt');
    for await (const line of file.readLines()) {
        const lineInts = getIntegersFromString(line);
        if(lineInts.length > 1){
            // number is the edges
            let number = "" + lineInts[0] + lineInts[lineInts.length-1];
            console.log(number);
            doubleDigits.push(parseInt(number));
        } else if (lineInts.length == 1) {
            // number is the middle twice
            let number = "" + lineInts + lineInts;
            console.log(number)
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

function parseNumbers(stringOfIntegers){
    let newNumber = "";
    let doubleDigits = [];
    for(let i = 0; i<stringOfIntegers.length; i+=2){
        newNumber += stringOfIntegers[i];
        newNumber += stringOfIntegers[i+1];
        // console.log(`New number: ${newNumber}`);
        doubleDigits.push(parseInt(newNumber));
        newNumber = "";
    }
    return doubleDigits;
}

async function day1 (){
    const testData = await getStringFromLines();
    // const ints = getIntegersFromString(testData);
    // const doubleNums = parseNumbers(ints);
    const sum = await testData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum;
}

day1().then(solution => {
    console.log(solution);
});


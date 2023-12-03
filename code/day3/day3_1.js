const fs = require('fs').promises;

async function getStringFromLines() {
    let matrix = [];
    const file = await fs.open('../../input_files/day3/input3.txt');
    for await (const line of file.readLines()) {
        let lineArray = line.split("");
        matrix.push(lineArray);
    }
    let numsToSum = getisValidNumbers(matrix);
    const sum = numsToSum.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      return sum;
}

function getisValidNumbers(matrix){
    let validNumbers = [];
    const specialChar = /[!@#$%^&*/()_+\-=]/;
    console.log(specialChar.test("/"));
    for(let i = 0; i< matrix.length; i++){
        let number = "";
        let isValidNumber = false;
        let index = 0;
        let startIndex = 0;
        let endIndex = 0;

        let array = matrix[i];
        while(index < array.length+1){
            if(!isNaN(array[index])){
                startIndex = index;
                endIndex = index;
                while(!isNaN(array[index])){
                    number += array[index];
                    endIndex = index;
                    index++;
                }
                // console.log(number);
                let frontIndex = endIndex;
                let backIndex = startIndex;
                // are there any special characters around the number?
                if(backIndex > 0){
                    // check behind
                    backIndex-=1;
                    if(specialChar.test(array[backIndex])){
                        isValidNumber = true;
                    }
                }

                if (frontIndex < array.length){
                    // check in front
                    frontIndex+=1;
                    if(specialChar.test(array[frontIndex])){
                        isValidNumber = true;
                    }
                }
                if(i > 0){
                    // check above
                    let arrayAbove = matrix[i-1];
                    for(let j = backIndex; j <= frontIndex; j++){
                        if(specialChar.test(arrayAbove[j])){
                            isValidNumber = true;
                        }
                    }
                }

                if(i < matrix.length-1){
                    // check below
                    let arrayBelow = matrix[i+1];
                    for(let k = backIndex; k <= frontIndex; k++){
                        if(specialChar.test(arrayBelow[k])){
                            isValidNumber = true;
                        }
                    }
                }

                if(isValidNumber){
                    validNumbers.push(parseInt(number));
                }
                
                // reset markers
                number="";
                isValidNumber = false;
            }
            index++;
            
        }
    }
    console.log(validNumbers);
    return validNumbers;
}

async function day3() {
    const testData = await getStringFromLines();
    return testData;
}

day3().then(solution => {
    console.log(solution);
});
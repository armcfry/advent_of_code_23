const fs = require('fs').promises;

async function getStringFromLines() {
    let matrix = [];
    const file = await fs.open('../../input_files/day3/input3.txt');
    for await (const line of file.readLines()) {
        let lineArray = line.split("");
        matrix.push(lineArray);
    }
    return getisValidNumbers(matrix);
}

function getisValidNumbers(matrix){
    const specialChar = /[*]/;
    let gearMap = new Map();
    for(let i = 0; i< matrix.length; i++){
        let number = "";
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
                    if(specialChar.test(array[backIndex])) {
                        let key = `${i}_${backIndex}`;
                        //console.log(`key: ${key} number: ${number}`);
                        if(!gearMap[key]){
                            gearMap[key] = [number];
                        } else {
                            gearMap[key].push(number);
                        }
                    }
                }

                if (frontIndex < array.length){
                    // check in front
                    frontIndex+=1;
                    if(specialChar.test(array[frontIndex])) {
                        let key = `${i}_${frontIndex}`;
                        //console.log(`key: ${key} number: ${number}`);
                        if(!gearMap[key]){
                            gearMap[key] = [number];
                        } else {
                            gearMap[key].push(number);
                        }
                    }
                }
                if(i > 0){
                    // check above
                    let arrayAbove = matrix[i-1];
                    for(let j = backIndex; j <= frontIndex; j++){
                        if(specialChar.test(arrayAbove[j])) {
                            
                            let key = `${i-1}_${j}`;
                            //console.log(`key: ${key} number: ${number}`);
                            if(!gearMap[key]){
                                gearMap[key] = [number];
                            } else {
                                gearMap[key].push(number);
                            }
                        }
                    }
                }

                if(i < matrix.length-1){
                    // check below
                    let arrayBelow = matrix[i+1];
                    for(let k = backIndex; k <= frontIndex; k++){
                        if(specialChar.test(arrayBelow[k])){
                            let key = `${i+1}_${k}`;
                            //console.log(`key: ${key} number: ${number}`);
                            if(!gearMap[key]){
                                gearMap[key] = [number];
                            } else {
                                gearMap[key].push(number);
                            }
                        }
                    }
                }
                
                // reset markers
                number="";
                isValidNumber = false;
            }
            index++;
        }
    }

    // for each key array with length 2, multiply and add sum
    let gearSum = 0;
    for (const key in gearMap) {
        if (gearMap[key].length === 2) {
          const multipliedValue = gearMap[key].reduce((acc, currentValue) => {
            return acc * parseInt(currentValue, 10);
          }, 1);
          gearSum += multipliedValue;
        }
    }
    return gearSum;
}

async function day3() {
    const testData = await getStringFromLines();
    return testData;
}

day3().then(solution => {
    console.log(solution);
});
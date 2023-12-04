const fs = require('fs').promises;

async function getStringFromLines() {
    const file = await fs.open('../../input_files/day4/input4.txt');
    let sum = 0;
    for await (const line of file.readLines()) {
        let linee = line.replaceAll("  ", " ");
        let stringg = linee.split(": ");
        let stringgg = stringg[1].split(" | ");
        let winning_nums = stringgg[0].split(" ");
        let actual_nums = stringgg[1].split(" ");
        let intersection = winning_nums.filter(x => actual_nums.includes(x));
        const winning_count = intersection.length;
        
        if (winning_count == 1){
            sum += 1;
        } else if (winning_count > 1) {
            let start = 1;
            for(let i = 1; i < winning_count; i++){
                start = start+start;
            }
            sum+=start;
        }
    }
    console.log(sum);
}

async function day4() {
    const testData = await getStringFromLines();
    return testData;
}

day4().then(solution => {
    console.log(solution);
});
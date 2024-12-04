import fs from 'fs/promises';

let rawData: string | undefined;
const fileName = "./input";

try {
    rawData = await fs.readFile(fileName, 'utf8');
} catch(_err) {
    throw Error("An error occured while opening the file.");
}

if (!rawData) {
    throw Error("An error occured.");
}

//part one
const rawMultiplicatons: string[] | null = rawData.match(/mul\(\d{1,3},\d{1,3}\)/g);

if (!rawMultiplicatons) {
    throw Error("No operation was found.");
}

let multiplicationsSum = rawMultiplicatons.map(rawMultiplication => {
    const numbers: number[] = (rawMultiplication.match(/\d{1,3}/g) ?? []) as number[];
    return numbers[0] * numbers[1];
}).reduce((accumulator, multipicationResult) => accumulator + multipicationResult, 0);

console.log(`Here is your answer: ${multiplicationsSum}`);

//part two
const rawInstructions: string[] | null = rawData.match(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g);

if (!rawInstructions) {
    throw Error("No instruction was found.");
}

let multiplicationEnabled = true;
multiplicationsSum = 0;
for (let i = 0; i < rawInstructions.length; i ++) {
    if (rawInstructions[i] === "do()") {
        multiplicationEnabled = true;
        continue ;
    } else if (rawInstructions[i] === "don't()") {
        multiplicationEnabled = false;
        continue ;
    }
    if (!multiplicationEnabled) {
        continue ;
    }
    const numbers: number[] = (rawInstructions[i].match(/\d{1,3}/g) ?? []) as number[];
    if (!numbers.length) {
        continue ;
    }
    multiplicationsSum += (numbers[0] * numbers[1]);
}

console.log(`Here is your second answer: ${multiplicationsSum}`);

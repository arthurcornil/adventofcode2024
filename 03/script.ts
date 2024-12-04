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

const rawMultiplicatons: string[] | null = rawData.match(/mul\(\d{1,3},\d{1,3}\)/g);

if (!rawMultiplicatons) {
    throw Error("No operation was found.");
}

const multiplicationsSum = rawMultiplicatons.map(rawMultiplication => {
    const numbers: number[] = (rawMultiplication.match(/\d{1,3}/g) ?? []) as number[];
    return numbers[0] * numbers[1];
}).reduce((accumulator, multipicationResult) => accumulator + multipicationResult, 0);

console.log(`Here is your answer: ${multiplicationsSum}`);

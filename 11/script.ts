import fs from 'fs/promises'

function insertOnIndex(stones: number[], num: number, index: number): void {
    for (let i = stones.length - 1; i > index - 1; i --) {
        stones[i + 1] = stones[i];
    }
    stones[index] = num;
}

function blink(stones: number[]): void {
    for (let i = 0; i < stones.length; i++) {
        if (stones[i] === 0) {
            stones[i] = 1;
        } else if ((`${stones[i]}`).length % 2 === 0) {
            const sliceIndex: number = (`${stones[i]}`).length / 2;
            const numA: number = Number((`${stones[i]}`).slice(0, sliceIndex));
            const numB: number = Number((`${stones[i]}`).slice(sliceIndex));
            stones[i] = numA;
            insertOnIndex(stones, numB, ++i);
        } else {
            stones[i] = stones[i] * 2024;
        }
    }
}

const fileName = "input";
const rawData: string = (await fs.readFile(fileName, 'utf-8')).split('\n').filter(line => line !== '').join('\n');
let stones: number[] = rawData.split(' ').map(stone => Number(stone));
const numberOfBlinks = 75;

for (let i = 0; i < numberOfBlinks; i++) {
    blink(stones);
}


console.log(`Here is your answer: ${stones.length}`);

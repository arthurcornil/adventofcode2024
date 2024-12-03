import * as fs from 'fs/promises';

const fileName: string = "./input";
let rawData: string | undefined;

function getLists(rawData: string): {leftList: number[], rightList: number[]} {
    const lines: string[] = rawData.split(/\n/);
    const leftList: number[] = [];
    const rightList: number[] = [];

    lines.map(line => {
        const listElements: number[] = line
            .split(' ')
            .map(num => Number(num))
            .filter(num => num !== 0);
        if (!listElements.length) {
            return ;
        }
        leftList.push(listElements[0]);
        rightList.push(listElements[1]);
    });

    return {
        leftList,
        rightList
    };
}

try {
    rawData = await fs.readFile(fileName, 'utf8');
} catch (_err) {
    throw Error("An error occured when openeing the file.");
}

if (!rawData) {
    throw Error("An error occured.");
}

const { leftList, rightList } = getLists(rawData);

leftList.sort();
rightList.sort();

//part one

const totalDistance: number = leftList
    .map((leftNum, index) => Math.abs(leftNum - rightList[index]))
    .reduce((total, distance) => total + distance, 0);

console.log(`Here is your answer: ${totalDistance}`);

//part two

const totalSimilarityScore: number = leftList
    .map(leftNum => leftNum * rightList.filter(rightNum => rightNum === leftNum).length)
    .reduce((total, similarityScore) => total + similarityScore, 0);

console.log(`Here is your second answer: ${totalSimilarityScore}`);


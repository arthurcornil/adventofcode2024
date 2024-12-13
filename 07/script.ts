import fs from 'fs/promises';

type Calculation = {
    result: number,
    operands: number[]
}

function getCalculations(rawOperations: string []): Calculation[] {
    return rawOperations.map(operation => {
        const splitOperation: string[] = operation.split(': ');
        return {
            result: Number(splitOperation[0]),
            operands: splitOperation[1].split(' ').map(num => Number(num))
        };
    });
}

function isResultReachable(currentTotal: number, calculation: Calculation, index: number): boolean {
    if (calculation.operands.length - 1 === index) {
        return currentTotal === calculation.result;
    }
    index ++;

    return (isResultReachable(currentTotal + calculation.operands[index], calculation, index)
        || isResultReachable(currentTotal * calculation.operands[index], calculation, index)
        || isResultReachable(Number(`${currentTotal}${calculation.operands[index]}`), calculation, index));
}

const fileName = "input";
const rawData: string = await fs.readFile(fileName, 'utf-8');
const rawOperations: string[] = rawData.split('\n').filter(line => line !== '');
const calculations: Calculation[] = getCalculations(rawOperations);

const validCalculations = calculations.filter(calculation => isResultReachable(calculation.operands[0], calculation, 0));
const totalResultValidCalculations = validCalculations.reduce((accumulator, calculation) => accumulator + calculation.result, 0);
console.log(`Here is your answer ${totalResultValidCalculations}`);

import fs from 'fs/promises';

type TwoUnkownEquation = {
    a1: number,
    a2: number,
    b1: number,
    b2: number,
};

type EquationSolution = {
    x: number,
    y: number
} | null;

function getEquations(rawEquations: string[][]): TwoUnkownEquation[] {
    let equations: TwoUnkownEquation[] = [];
    rawEquations.forEach(equation => {
        la;
    });
}

const fileName = "test-input";
const rawData: string = await fs.readFile(fileName, 'utf-8');
const rawEquations: string[][] = rawData.split('\n\n').map(rawEquation => rawEquation.split('\n').filter(line => line !== ''));
const equations: TwoUnkownEquation[] = getEquations(rawEquations);


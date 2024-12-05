import fs from 'fs/promises';

type Coordinate = {
    x: number,
    y: number
}

let rawData: string | undefined;
const fileName = "./test-input";
const needle = "XMAS";
const needle2 = "MAS";
let numberOfNeedles = 0;
let numberOfNeedles2 = 0;

function willOverflow(x: number, y: number, path: number): boolean {
    if (path >= 0 && path < 3 && y < needle.length - 1) {
        return true;
    } else if (path % 3 === 0 && x < needle.length - 1) {
        return true;
    } else if (path >= 6 && y > rawLines.length - needle.length) { 
        return true;
    } else if (path % 3 === 2 && x > rawLines[y].length - needle.length) {
        return true;
    }
    return false;
}

function matchNeedle(word: string, needle: string): boolean {
    if (needle.includes(word) || needle.split('').reverse().join('').includes(word)) {
        return true;
    }
    return false;
}

function findNeedleInPath(x: number, y: number, path: number, needle: string): Coordinate | null {
    let currentWordFound: string = rawLines[y].charAt(x);
    const yIncrementor: number = Math.floor(path / 3) - 1;
    const xIncrementor: number = path - (4 + (yIncrementor * 3));
    let currentPosition: Coordinate = {x, y};
    if (willOverflow(x, y, path)) {
        return null;
    }
    for (let i = 0; i < needle.length - 1; i ++) {
        currentPosition.x += xIncrementor;
        currentPosition.y += yIncrementor;
        currentWordFound += rawLines[currentPosition.y].charAt(currentPosition.x);
        if (!matchNeedle(currentWordFound, needle)) {
            return null;
        }
    }
    if (needle !== currentWordFound && needle.split('').reverse().join('') !== currentWordFound) {
        return null;
    }

    if (needle === "MAS") {
        console.log({x, y, path})
    }
    return currentPosition
}

try {
    rawData = await fs.readFile(fileName, 'utf8');
} catch (_err) {
    throw Error("An error occured when openeing the file.");
}

if (!rawData) {
    throw Error("An error occured.");
}

const rawLines: string[] = rawData.split(/\n/).filter(line => line.length);

//part one
rawLines.forEach((line, index) => {
    if (!line.length) {
        return ;
    }
    for (let i = 0; i < line.length; i ++) {
        if (line.charAt(i) !== needle.charAt(0) && line.charAt(i) !== needle.charAt(needle.length - 1)) {
            continue ;
        }
        for (let j = 0; j <= 8; j ++) {
            if (j === 4) {
                continue ;
            }
            const otherEnd: Coordinate | null = findNeedleInPath(i, index, j, needle);
            if (!otherEnd) {
                continue ;
            }
            numberOfNeedles ++;
        }
    }
});

console.log(`Here is your answer: ${numberOfNeedles / 2}`);

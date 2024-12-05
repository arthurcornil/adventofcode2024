import fs from 'fs/promises';

type Coordinate = {
    x: number,
    y: number
}

let rawData: string | undefined;
const fileName = "./input";
const needle = "XMAS";
let numberOfNeedles = 0;

function willOverflow(x: number, y: number, path: number): boolean {
    if (path >= 0 && path < 3 && y < 3) {
        return true;
    } else if (path % 3 === 0 && x < 3) {
        return true;
    } else if (path >= 6 && y > rawLines.length - 4) { 
        return true;
    } else if (path % 3 === 2 && x > rawLines[y].length - 4) {
        return true;
    }
    return false;
}

function matchNeedle(word: string): boolean {
    if (needle.includes(word) || needle.split('').reverse().join('').includes(word)) {
        return true;
    }
    return false;
}

function findNeedleInPath(x: number, y: number, path: number): Coordinate | null {
    let currentWordFound: string = rawLines[y].charAt(x);
    const yIncrementor: number = Math.floor(path / 3) - 1;
    const xIncrementor: number = path - (4 + (yIncrementor * 3));
    let currentPosition: Coordinate = {x, y};
    if (willOverflow(x, y, path)) {
        return null;
    }
    for (let i = 0; i < 3; i ++) {
        currentPosition.x += xIncrementor;
        currentPosition.y += yIncrementor;
        currentWordFound += rawLines[currentPosition.y].charAt(currentPosition.x);
        if (!matchNeedle(currentWordFound)) {
            return null;
        }
    }
    if (needle !== currentWordFound && needle.split('').reverse().join('') !== currentWordFound) {
        return null;
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
            const otherEnd: Coordinate | null = findNeedleInPath(i, index, j);
            if (!otherEnd) {
                continue ;
            }
            numberOfNeedles ++;
        }
    }
});

console.log(`Here is your answer: ${numberOfNeedles / 2}`);

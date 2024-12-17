import fs from 'fs/promises';

type MemoryRepresentation = (number|null)[];

function buildMemory(rawData: string): MemoryRepresentation {
    let memory: MemoryRepresentation = [];
    let currentId = 0;
    let isFile = true;

    for (const digit of rawData) {
        let memoryBit: number|null = currentId;
        if (!isFile) {
            memoryBit = null;
        }
        for (let i = 0; i < Number(digit); i ++) {
            memory.push(memoryBit);
        }
        isFile = !isFile;
        if (isFile) {
            currentId ++;
        }
    }
    
    return memory;
}

function getLastNonNullBlockIndex(memory: MemoryRepresentation): number|null {
    for (let i = memory.length - 1; i >= 0; i --) {
        if (memory[i] !== null) {
            return i;
        }
    }
    
    return null;
}

function reorganiseMemory(memory: MemoryRepresentation, numberOfFileBlocks: number): void {
    for (let i = 0; i < memory.length - numberOfFileBlocks; i++) {
        const newMemorySpotIndex: number = memory.indexOf(null);
        const memorySpotIndex: number|null = getLastNonNullBlockIndex(memory);
        memory[newMemorySpotIndex] = memory[memorySpotIndex!];
        memory[memorySpotIndex!] = null;
    }
}

const fileName = "input";
const rawData: string = (await fs.readFile(fileName, 'utf-8')).split('\n')[0];
let memory: MemoryRepresentation = buildMemory(rawData);
const numberOfFileBlocks: number = memory.filter(block => block !== null).length;
reorganiseMemory(memory, numberOfFileBlocks);
let answer = 0;

memory.forEach((block, index) => {
    if (block === null) {
        return ;
    }
    answer += (block * index);
});

console.log(`Here is your answer: ${answer}`);

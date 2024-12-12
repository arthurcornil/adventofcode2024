import fs from 'fs/promises';

type AdjacencyList = {
    [key: number]: number[];
};

function buildAdjacencyList(rawRules: string[]): AdjacencyList {
    const rules: AdjacencyList = {};
    rawRules.forEach(rule => {
        const pages: number[] = rule.split('|').map(page => Number(page));
        if (!rules[pages[0]]) {
            rules[pages[0]] = [];
        }
        rules[pages[0]].push(pages[1]);
    });
    
    return rules;
}

function isPageOrderValid(pages: number[]): boolean {
    for (let i = 1; i < pages.length; i ++) {
        if (!rules[pages[i]]) {
            continue ;
        }
        let isRuleBroken = false;
        rules[pages[i]].forEach(page => {
            if (pages.slice(0, i).includes(page)) {
                isRuleBroken = true;
                return ;
            }
        });
        if (isRuleBroken) {
            return false;
        }
    }
    return true;
}

const fileName = "input";
const rawData: string = await fs.readFile(fileName, 'utf-8');
const lines: string[] = rawData.split('\n');
const separationIndex: number = lines.indexOf('');
const rawRules: string[] = lines.slice(0, separationIndex);
const rawPages: string[] = lines.slice(separationIndex + 1).filter(line => line !== '');
const rules: AdjacencyList = buildAdjacencyList(rawRules);

const totalValidMiddleNumbers = rawPages.map(pages =>
    pages.split(',')
    .map(page => Number(page))
).filter(pages => isPageOrderValid(pages))
.map(validPageOrder => validPageOrder[Math.ceil(validPageOrder.length / 2) - 1])
.reduce((accumulator, middleNumber) => accumulator + middleNumber, 0);

console.log(`Here is your answer: ${totalValidMiddleNumbers}`);

import fs from 'fs/promises';

let rawData: string | undefined;
const fileName = "./input";

function getReports(rawData: string): number[][] {
    return rawData.split(/\n/)
        .map(line => line.split(' ')
            .map(num => Number(num))
            .filter(num => num !== 0)
        ).filter(report => report.length);
}

function isReportSafe(report: number[]): boolean {
    const growthReference: number = (report[1] - report[0]) / Math.abs(report[1] - report[0]);

    for (let i = 1; i < report.length; i ++) {
        const currentDifference: number = report[i] - report[i - 1];
        if (currentDifference === 0) {
            return false;
        }
        if ((growthReference < 0 && currentDifference > growthReference)
            || (growthReference > 0 && currentDifference < growthReference)
            || (Math.abs(currentDifference) < 1) || Math.abs(currentDifference) > 3) {
            return false;
        }
    }

    return true;
}

function isReportSafeForTheProblemDampener(report: number[]): boolean {
    if (isReportSafe(report)) {
        return true;
    }
    for (let i = 0; i < report.length; i ++) {
        const reportCopy = [...report];
        reportCopy.splice(i, 1);
        if (isReportSafe(reportCopy)) {
            return true;
        }
    }
    return false;
}

try { 
    rawData = await fs.readFile(fileName, 'utf8');
} catch (_err) {
    throw Error("An error occured while opening the file..");
}

if (!rawData) {
    throw Error("An error occured.");
}

const reports: number[][] = getReports(rawData);

//part one
const numOfSafeReports: number = reports.filter(report => isReportSafe(report)).length;
console.log(`Here is your answer: ${numOfSafeReports}`);

//part two
const numOfSafeReportsForTheProblemDampener: number = reports.filter(report => isReportSafeForTheProblemDampener(report)).length;
console.log(`Here is your second answer: ${numOfSafeReportsForTheProblemDampener}`);

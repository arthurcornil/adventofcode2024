import fs from 'fs/promises';

type Coordinates = {
    x: number,
    y: number
};

type FrequencyLocations = {
    frequency: string,
    locations: Coordinates[]
}

function getAntennaLocations(lines: string[]): FrequencyLocations[] {
    let antennaLocations: FrequencyLocations[] = [];

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y].charAt(x) === '.') {
                continue ;
            }
            if (antennaLocations.some(antenna => antenna.frequency === lines[y].charAt(x))) {
                antennaLocations.find(antenna => antenna.frequency === lines[y].charAt(x))!.locations.push({ x, y });
                continue ;
            }
            antennaLocations.push({
                frequency: lines[y].charAt(x),
                locations: [{ x , y }]
            });
        }
    }
    
    return antennaLocations;
}

function isInMap(coordinates: Coordinates): boolean {
    if (coordinates.x <= lines[0].length - 1
        && coordinates.y <= lines.length - 1
        && coordinates.x >= 0
        && coordinates.y >= 0
    ) {
        return true;
    }
    return false;
}

function getAntinodeLocationsFromAntennas(antennaA: Coordinates, antennaB: Coordinates): Coordinates[] {
    const antinodes: Coordinates[] = [];
    const xDelta: number = antennaA.x - antennaB.x;
    const yDelta: number = antennaA.y - antennaB.y;
    const firstAntinode: Coordinates = {
        x: antennaA.x + xDelta,
        y: antennaA.y + yDelta
    }
    const secondAntinode: Coordinates = {
        x: antennaB.x - xDelta,
        y: antennaB.y - yDelta
    }
    if (isInMap(firstAntinode)) {
        antinodes.push(firstAntinode);
    }
    if (isInMap(secondAntinode)) {
        antinodes.push(secondAntinode);
    }

    return antinodes;
}

function getAntinodeLocations(antennas: FrequencyLocations[]): FrequencyLocations[] {
    let antinodeLocations: FrequencyLocations[] = [];
    for (let i = 0; i < antennas.length; i++) {
        if (antennas[i].locations.length <= 1) {
            continue ;
        }
        for (let j = 0; j < antennas[i].locations.length - 1; j ++) {
            for (let h = j + 1; h < antennas[i].locations.length; h ++) {
                let antinodeLocationsForAntennas: Coordinates[] = getAntinodeLocationsFromAntennas(antennas[i].locations[j], antennas[i].locations[h]);
                if (!antinodeLocations.some(antinode => antinode.frequency === antennas[i].frequency)) {
                    antinodeLocations.push({
                        frequency: antennas[i].frequency,
                        locations: antinodeLocationsForAntennas
                    });
                    continue ;
                }
                antinodeLocationsForAntennas.forEach(antinodeLocation => {
                    antinodeLocations.find(antinode => antinode.frequency === antennas[i].frequency)!.locations.push(antinodeLocation);
                });
            }
        }
    }

    return antinodeLocations;
}

const fileName = "input";
const rawData: string = await fs.readFile(fileName, 'utf-8');
const lines: string[] = rawData.split('\n').filter(line => line !== '');
const antennas: FrequencyLocations[] = getAntennaLocations(lines);
const antinodes: FrequencyLocations[] = getAntinodeLocations(antennas);
const uniqueAntinodeLocations: Coordinates[] = [];

antinodes.forEach(antinode => {
    antinode.locations.forEach(location => {
        if (uniqueAntinodeLocations.some(uniqueLocation => uniqueLocation.x === location.x && uniqueLocation.y === location.y)) {
            return ;
        }
        uniqueAntinodeLocations.push(location);
    });
});

console.log(`Here is your answer: ${uniqueAntinodeLocations.length}`);

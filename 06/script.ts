import fs from 'fs/promises';

type Coordinates = {
    x: number,
    y: number
};

type Direction = "up" | "down" | "left" | "right";

class Guard {
    private coordinates: Coordinates;
    private direction: Direction;

    constructor(coordinates: Coordinates) {
        this.coordinates = coordinates;
        this.direction = "up";
    }

    isInMap(): boolean {
        const nextPosition: Coordinates = this.getNextPosition();
        if (nextPosition.x <= mapWidth 
            && nextPosition.y <= mapHeight
            && nextPosition.x >= 0
            && nextPosition.y >= 0
        ) {
            return true;
        }
        return false;
    }

    updatePosition(): void {
        switch(this.direction) {
            case "up": 
                this.coordinates.y --;
                break ;
            case "down": 
                this.coordinates.y ++;
                break ;
            case "left": 
                this.coordinates.x --;
                break ;
            case "right": 
                this.coordinates.x ++;
                break ;
        }
    }

    getNextPosition(): Coordinates {
        const nextPosition: Coordinates = {... this.coordinates};

        switch(this.direction) {
            case "up": 
                nextPosition.y --;
                break ;
            case "down": 
                nextPosition.y ++;
                break ;
            case "left": 
                nextPosition.x --;
                break ;
            case "right": 
                nextPosition.x ++;
                break ;
        }

        return nextPosition;
    }

    switchDirection(): void {
        switch(this.direction) {
            case "up": 
                this.direction = "right"
                break ;
            case "down": 
                this.direction = "left"
                break ;
            case "left": 
                this.direction = "up"
                break ;
            case "right": 
                this.direction = "down"
                break ;
        }
    }

    getCoordinates(): Coordinates {
        return this.coordinates;
    }
}

function getGuardCoordinates(lines: string[]): Coordinates {
    let coordinates: Coordinates;

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y].charAt(x) !== '^') {
                continue ;
            }
            coordinates = { x, y };
            return coordinates;
        }
    }
    
    throw Error("404 - The guard could not be found.");
}

function getObstacleCoordinates(lines: string[]): Coordinates[] {
    const coordinates: Coordinates[] = [];

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y].charAt(x) !== '#') {
                continue ;
            }
            coordinates.push({ x, y });
        }
    }
    
    return coordinates;
}

function addToVisitedSpots(spot: Coordinates) {
    const key: string = JSON.stringify(spot);
    visitedSpots.add(key);
}

const fileName = "input";
const rawData: string = await fs.readFile(fileName, 'utf-8');
const lines: string[] = rawData.split('\n').filter(line => line !== '');
const mapHeight: number = lines.length;
const mapWidth: number = lines[0].length;
const guardCoordinates: Coordinates = getGuardCoordinates(lines);
const guard: Guard = new Guard(guardCoordinates);
const obstacleCoordinates: Coordinates[] = getObstacleCoordinates(lines);
const visitedSpots = new Set<string>();

while (guard.isInMap()) {
    console.log(guard.getCoordinates());
    const nextPosition = guard.getNextPosition();

    if (obstacleCoordinates.some(coord => nextPosition.x === coord.x && nextPosition.y === coord.y)) {
        guard.switchDirection();
    }

    guard.updatePosition();
    addToVisitedSpots(guard.getCoordinates());
}

console.log(visitedSpots.size);

// Author: Christopher Kennedy
// Date: 12-22-24

import { Color } from "../../Utilities/types";

type SaveStructure = {
    count: number;
    start: number;
    end: number;
}

export function getGuessCountForEachColor(selected: number[], correctColors: Color[]): [yellowCount: number, greenCount: number, blueCount: number, purpleCount: number] {
    const yellow = {
        count: 0,
        start: 0,
        end: 3,
    } as SaveStructure;
    const green = {
        count: 0,
        start: 4,
        end: 7,
    } as SaveStructure;
    const blue = {
        count: 0,
        start: 8,
        end: 11,
    } as SaveStructure;
    const purple = {
        count: 0,
        start: 12,
        end: 15,
    } as SaveStructure;

    if (correctColors.includes("Yellow" as Color)) {
        yellow.start -= 4;
        yellow.end -= 4;
        green.start -= 4;
        green.end -= 4;
        blue.start -= 4;
        blue.end -= 4;
        purple.start -= 4;
        purple.end -= 4;
    }
    if (correctColors.includes("Green" as Color)) {
        green.start -= 8;
        green.end -= 8;
        blue.start -= 4;
        blue.end -= 4;
        purple.start -= 4;
        purple.end -= 4;
    }
    if (correctColors.includes("Blue" as Color)) {
        blue.start -= 12;
        blue.end -= 12;
        purple.start -= 4;
        purple.end -= 4;
    }

    selected.forEach(value => {
        if (yellow.start <= value && yellow.end >= value) {
            yellow.count++;
        } else if (green.start <= value && green.end >= value) {
            green.count++;
        } else if (blue.start <= value && blue.end >= value) {
            blue.count++;
        } else if (purple.start <= value && purple.end >= value) {
            purple.count++;
        }
    });

    return [yellow.count, green.count, blue.count, purple.count];
}
// Author: Christopher Kennedy
// Date: 12-22-24

import { Color } from "../../Utilities/types";

export function getGuessCountForEachColor(selected: number[], correctColors: Color[]): [yellowCount: number, greenCount: number, blueCount: number, purpleCount: number] {
    let yellowCount = 0;
    let greenCount = 0;
    let blueCount = 0;
    let purpleCount = 0;

    selected.forEach(value => {
        if (0 <= value && 3 >= value) {
            if (correctColors.includes("Yellow" as Color)) {
                if (correctColors.includes("Green" as Color)) {
                    if (correctColors.includes("Blue" as Color)) {
                        purpleCount++;
                    } else {
                        blueCount++;
                    }
                } else {
                    greenCount++;
                }
            } else {
                yellowCount++;
            }
        } else if (4 <= value && 7 >= value) {
            if (correctColors.includes("Yellow" as Color)) {
                if (correctColors.includes("Green" as Color)) {
                    purpleCount++;
                } else {
                    blueCount++;
                }
            } else {
                greenCount++;
            }
        } else if (8 <= value && 11 >= value) {
            if (correctColors.length === 1 && correctColors[0] !== "Purple" as Color) {
                purpleCount++;
            } else {
                blueCount++;
            }
        } else if (12 <= value && 15 >= value) {
            purpleCount++;
        }
    });

    return [yellowCount, greenCount, blueCount, purpleCount];
}
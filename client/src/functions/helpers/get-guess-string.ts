// Author: Christopher Kennedy
// Date: 3-5-24

import { Category, Color, Values } from "../../Utilities/types";

export function getGuessString(
    selected: number[],
    values: Values,
    correctSoFar: Category[]
): string {
    if (selected.length !== 4) {
        return "";
    }

    const correctColors: Color[] = [];
    correctSoFar.forEach(correct => {
        correctColors.push(correct.color);
    });

    selected.sort((a, b) => a - b);
    let guess = "";
    for (const selection of selected) {
        let valueIndex = Math.floor(selection / 4); // integer division, 0 = yellow, 1 = green, etc.
        if (correctColors.includes(Color.Yellow)) {
            valueIndex += 1;
        }
        if (correctColors.includes(Color.Green) && valueIndex >= 1) {
            valueIndex += 1;
        }
        if (correctColors.includes(Color.Blue) && valueIndex >= 2) {
            valueIndex += 1;
        }

        const valueNumber = selection % 4; // is this the third purple, e.g.
        switch (valueNumber) {
            case 0:
                guess += values[valueIndex].value1;
                break;
            case 1:
                guess += values[valueIndex].value2;
                break;
            case 2:
                guess += values[valueIndex].value3;
                break;
            case 3:
                guess += values[valueIndex].value4;
                break;
        }
    }

    return guess;
}
// Author: Christopher Kennedy
// Date: 12-22-24

import { Category, Color, Values } from "../Utilities/types";
import { shuffleOrder } from "./shuffle-order";

export function reveal(
    color: Color,
    values: Values,
    correctSoFar: Category[],
    setCorrectSoFar: (correctSoFar: Category[]) => void,
    setOrder: (order: number[]) => void,
): void {
    switch (color) {
        case Color.Yellow:
            correctSoFar.push(values[0]);
            break;
        case Color.Green:
            if (!correctSoFar.some(v => v.color === Color.Yellow)) {
                correctSoFar.push(values[0]);
            }
            correctSoFar.push(values[1]);
            break;
        case Color.Blue:
            if (!correctSoFar.some(v => v.color === Color.Yellow)) {
                correctSoFar.push(values[0]);
            }
            if (!correctSoFar.some(v => v.color === Color.Green)) {
                correctSoFar.push(values[1]);
            }
            correctSoFar.push(values[2]);
            break;
        case Color.Purple:
            if (!correctSoFar.some(v => v.color === Color.Yellow)) {
                correctSoFar.push(values[0]);
            }
            if (!correctSoFar.some(v => v.color === Color.Green)) {
                correctSoFar.push(values[1]);
            }
            if (!correctSoFar.some(v => v.color === Color.Blue)) {
                correctSoFar.push(values[2]);
            }
            correctSoFar.push(values[3]);
            break;
    }
    
    setCorrectSoFar(correctSoFar);
    setOrder(shuffleOrder(16 - 4 * correctSoFar.length, []));
}
// Author: Christopher Kennedy
// Date: 12-22-24

import { Category, Color, Values } from "../Utilities/types";
import { getGuessCountForEachColor } from "./helpers/get-guess-count-for-each-color";
import { shuffleOrder } from "./shuffle-order";

// https://www.youtube.com/watch?v=huGd4efgdPA
export function guess(selected: number[],
    values: Values,
    correctSoFar: Category[],
    mistakesRemaining: number,
    setCorrectSoFar: (correctSoFar: Category[]) => void,
    setOneAway: (isOneAway: boolean) => void,
    setSelected: (selected: number[]) => void,
    setOrder: (order: number[]) => void,
    setMistakesRemaining: (mistakesRemaining: number) => void,
): void {
    if (selected.length !== 4) {
        return;
    }

    const correctColors: Color[] = [];
    correctSoFar.forEach(correct => {
        correctColors.push(correct.color);
    });

    const counts = getGuessCountForEachColor(selected, correctColors);

    counts.forEach((count, index) => {
        if (count === 4) {
            const nowCorrect = [...correctSoFar, values[index]];
            setCorrectSoFar(nowCorrect);
            setSelected([]);
            setOrder(shuffleOrder(16 - 4 * nowCorrect.length, []));
        } else if (count === 3) {
            setOneAway(true);
            setTimeout(() => {
                setOneAway(false);
            }, 3000);
            setMistakesRemaining(mistakesRemaining - 1);
        } else {
            setMistakesRemaining(mistakesRemaining - 1);
        }
    });
}
// Author: Christopher Kennedy
// Date: 12-17-24

import { CSV_HEADER } from "../Utilities/constants";
import { Color } from "../Utilities/types";

/**
 * Makes sure the built content is valid before offering chance to save.
 * @param setSaveString React useState function to set the save string
 * @returns True if the current game should be valid to save, false otherwise.
 */
export function getCsvFormat(setSaveString: (saveString: string) => void): boolean {
    const NUMBER_FIELDS = 5; // 4 for number in each category + description
    let output = CSV_HEADER + "\n";
    const uniqueVals = new Set();

    for (let color in Color) {
        for (let i = 1; i <= NUMBER_FIELDS; i++) {
            const currentValue = document.getElementById(color + i) as HTMLTextAreaElement;
            if (!currentValue?.value || currentValue.value.length === 0 || uniqueVals.has(currentValue.value)) {
                return false;
            }
            
            output += currentValue.value + ","
            uniqueVals.add(currentValue.value);
        }
    }

    setSaveString(output);
    return true;
}
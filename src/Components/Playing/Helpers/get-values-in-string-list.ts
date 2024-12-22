// Author: Christopher Kennedy
// Date: 12-22-24

import { Values } from "../../../Utilities/types";

export function getValuesInStringList(values: Values): string[] {
    const stringVals: string[] = [];
    values.forEach(value => {
        stringVals.push(value.value1);
        stringVals.push(value.value2);
        stringVals.push(value.value3);
        stringVals.push(value.value4);
    });
    return stringVals;
}
// Author: Christopher Kennedy
// Date: 12-19-24

import { getDummyValues } from "../../Components/Playing/Helpers/get-dummy-values";
import { Color, Values } from "../../Utilities/types";

export function getValuesFromCSV(fileContents: string): Values {
    const headerAndValues = fileContents.split("\n");
    if (headerAndValues.length !== 2) {
        return getDummyValues();
    }

    const commaSeparatedValues = headerAndValues[1];
    const splitValues = commaSeparatedValues.split(",");
    if (splitValues.length < 20) {
        return getDummyValues();
    }

    return [
        {
            value1: splitValues[0],
            value2: splitValues[1],
            value3: splitValues[2],
            value4: splitValues[3],
            categoryDesc: splitValues[4],
            color: "Yellow" as Color,
        },
        {
            value1: splitValues[5],
            value2: splitValues[6],
            value3: splitValues[7],
            value4: splitValues[8],
            categoryDesc: splitValues[9],
            color: "Green" as Color,
        },
        {
            value1: splitValues[10],
            value2: splitValues[11],
            value3: splitValues[12],
            value4: splitValues[13],
            categoryDesc: splitValues[14],
            color: "Blue" as Color,
        },
        {
            value1: splitValues[15],
            value2: splitValues[16],
            value3: splitValues[17],
            value4: splitValues[18],
            categoryDesc: splitValues[19],
            color: "Purple" as Color,
        },
    ];
}
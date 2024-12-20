// Author: Christopher Kennedy
// Date: 12-19-24

import { getDummyValues } from "../../Components/Playing/Helpers/get-dummy-values";
import { Values } from "../../Utilities/types";

export function getValuesFromCSV(fileContents: string): Values {
    const headerAndValues = fileContents.split("\n");
    if (headerAndValues.length !== 2) {
        return getDummyValues();
    }

    const commaSeparatedValues = headerAndValues[1];
    const splitValues = commaSeparatedValues.split(",");
    if (splitValues.length !== 20) {
        return getDummyValues();
    }

    return [
        [splitValues[0], splitValues[1], splitValues[2], splitValues[3], splitValues[4]],
        [splitValues[5], splitValues[6], splitValues[7], splitValues[8], splitValues[9]],
        [splitValues[10], splitValues[11], splitValues[12], splitValues[13], splitValues[14]],
        [splitValues[15], splitValues[16], splitValues[17], splitValues[18], splitValues[19]],
    ];
}
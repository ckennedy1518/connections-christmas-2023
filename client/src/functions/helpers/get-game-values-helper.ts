// Author: Christopher Kennedy
// Date: 12-19-24

import { getDummyValues } from "../../Components/Playing/Helpers/get-dummy-values";
import { SaveResult, Values } from "../../Utilities/types";
import { getValuesFromCSV } from "./get-values-from-csv";

export async function getGameValuesHelper(fileName: string, setValues: (values: Values) => void): Promise<SaveResult> {
    const result = await fetch(`http://localhost:5000/api/files/${fileName}`);
    if (result.status !== 200) {
        return SaveResult.NoGameFound;
    }

    const fileObject = await result.json();
    const fileContents = fileObject.content as unknown as string;
    const saveResult = getValuesFromCSV(fileContents);
    if (saveResult === getDummyValues()) {
        return SaveResult.NoGameFound;
    }

    setValues(saveResult);
    return SaveResult.Good;
}
// Author: Christopher Kennedy
// Date: 12-19-24

import { SaveResult, Values } from "../Utilities/types";
import { fileExists } from "./helpers/file-exists";
import { getGameValuesHelper } from "./helpers/get-game-values-helper";

export async function getGameValues(fileName: string, setValues: (values: Values) => void): Promise<SaveResult> {
    if (!fileName || fileName.length === 0) {
        return SaveResult.BadString;
    }

    if (fileName.includes(".") || fileName.includes("/") || fileName.includes("\\")) {
        return SaveResult.NoGameFound;
    }

    fileName += ".csv";
    if (!(await fileExists(fileName))) {
        return SaveResult.NoGameFound;
    }

    return await getGameValuesHelper(fileName, setValues);
}
// Author: Christopher Kennedy
// Date: 12-17-24

import { SaveResult } from "../Utilities/types";
import { fileExists } from "./helpers/file-exists";
import { saveGameHelper } from "./helpers/save-game-helper";

export async function saveGame(textAreaId: string, saveString: string): Promise<SaveResult> {
    const text = document.getElementById(textAreaId) as HTMLTextAreaElement;
    let fileName = text?.value;
    if (!fileName || fileName.length === 0) {
        return SaveResult.BadString;
    }

    if (fileName.includes(".") || fileName.includes("/") || fileName.includes("\\")) {
        return SaveResult.BadCharacter;
    }

    fileName += ".csv";
    if (await fileExists(fileName)) {
        return SaveResult.FileAlreadyExists;
    }

    return await saveGameHelper(fileName, saveString);
}
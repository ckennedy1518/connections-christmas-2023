// Author: Christopher Kennedy
// Date: 12-17-24

import { SaveResult } from "../types";
import { fileExists } from "./helpers/file-exists";

export async function saveGame(textAreaId: string): Promise<SaveResult> {
    const text = document.getElementById(textAreaId) as HTMLTextAreaElement;
    const fileName = text?.value;
    if (!fileName || fileName.length === 0) {
        return SaveResult.BadString;
    }

    if (fileName.includes(".") || fileName.includes("/") || fileName.includes("\\")) {
        return SaveResult.BadCharacter;
    }

    if (await fileExists(fileName + ".csv")) {
        return SaveResult.FileAlreadyExists;
    }

    return SaveResult.Good;
}
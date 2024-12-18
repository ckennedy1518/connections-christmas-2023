// Author: Christopher Kennedy
// Date: 12-17-24

import { SaveResult } from "../types";
import { fileExists } from "./helpers/file-exists";

export function saveGame(textAreaId: string): SaveResult {
    const text = document.getElementById(textAreaId) as HTMLTextAreaElement;
    const fileName = text?.value;
    if (!fileName || fileName.length === 0) {
        return SaveResult.BadString;
    }

    if (fileExists(fileName)) {
        return SaveResult.FileAlreadyExists;
    }

    return SaveResult.Good;
}
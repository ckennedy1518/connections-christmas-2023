// Author: Christopher Kennedy
// Date: 12-17-24

import { SaveResult } from "../../Utilities/types";

export async function saveGameHelper(fileName: string, content: string): Promise<SaveResult> {
    const response = await fetch('http://localhost:5000/api/files', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName, content }),
    });

    if (response.status === 500) {
        return SaveResult.FailedToCreateFile
    }

    return SaveResult.Good;
}
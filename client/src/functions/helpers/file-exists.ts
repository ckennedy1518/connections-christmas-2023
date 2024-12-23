// Author: Christopher Kennedy
// Date: 12-17-24

/**
 * Queries all stored files to make sure no duplicates are saved.
 * @param fileName The name of the file we're searching for
 * @returns True if the file exists, false otherwise
 */
export async function fileExists(fileName: string): Promise<boolean> {
    const result = await fetch('https://connections-christmas-2023.onrender.com/api/files');
    if (result.status !== 200) {
        return true; // Don't let them save
    }

    const fileList: string[] = await result.json();
    return fileList.includes(fileName);
}
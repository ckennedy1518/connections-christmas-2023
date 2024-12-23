// Author: Christopher Kennedy
// Date: 12-22-24

/**
 * Queries all stored files to display so the user can choose one.
 * @returns the list of files
 */
export async function getListOfFiles(): Promise<string[]> {
    const result = await fetch('https://connections-christmas-2023.onrender.com/api/files');
    if (result.status !== 200) {
        return []; // Don't show them anything
    }

    const listOfFiles = await result.json();
    return listOfFiles;
}
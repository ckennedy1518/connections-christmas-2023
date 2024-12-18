// Author: Christopher Kennedy
// Date: 12-17-24

export function fileExists(fileName: string): boolean {
    // TODO: get list of file names
    const files = ["hello"];
    return files.includes(fileName);
}
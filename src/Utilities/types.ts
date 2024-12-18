// Author: Christopher Kennedy
// Date: 12-17-24

export type Stage = "GameTypeSelect" | "Creating" | "Previewing" | "Playing" | "Finished";
export enum Color {
    Yellow = "Yellow",
    Green = "Green",
    Blue = "Blue",
    Purple = "Purple"
}
export enum SaveResult {
    BadString,
    BadCharacter,
    FileAlreadyExists,
    Good,
    NotCalledYet,
    FailedToCreateFile,
}

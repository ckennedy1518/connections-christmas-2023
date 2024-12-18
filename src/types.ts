// Author: Christopher Kennedy
// Date: 12-17-24

export type Stage = "GameTypeSelect" | "Creating" | "Previewing" | "Playing" | "Finished";
export type Color = "Yellow" | "Green" | "Blue" | "Purple";
export enum SaveResult {
    BadString,
    BadCharacter,
    FileAlreadyExists,
    Good,
    NotCalledYet,
}

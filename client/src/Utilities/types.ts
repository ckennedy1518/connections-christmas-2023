// Author: Christopher Kennedy
// Date: 12-17-24

export type Stage = "GameTypeSelect" | "Creating" | "PlayEntry" | "Playing";
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
    NoGameFound,
}
export type Category = {
    value1: string,
    value2: string,
    value3: string,
    value4: string,
    categoryDesc: string,
    color: Color,
};
export type Values = [yellow: Category, green: Category, blue: Category, purple: Category];

// Author: Christopher Kennedy
// Date: 12-22-24

export function shuffleOrder(length: number, selected: number[], setSelected: (selected: number[]) => void): number[] {
    if (length % 4 !== 0 || length > 16) {
        return [];
    }

    // array like [0,1,2,...,N] where N = length - 1
    const zeroToN = Array.from({length: length}, (_value, key) => key);
    const shuffledOrder: number[] = [];
    const newSelected: number[] = [];
    let loopCounter = 0;
    for (let orderArrLength = length; orderArrLength > 0; orderArrLength--) {
        const randIndex = Math.floor(Math.random() * orderArrLength);

        if (selected.includes(loopCounter)) {
            newSelected.push(zeroToN[randIndex]);
        }

        shuffledOrder.push(zeroToN[randIndex]);
        zeroToN.splice(randIndex, 1);
        loopCounter++;
    }

    return shuffledOrder;
}
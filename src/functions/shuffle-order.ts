// Author: Christopher Kennedy
// Date: 12-22-24

export function shuffleOrder(length: number): number[] {
    if (length % 4 !== 0 || length > 16) {
        return [];
    }

    // array like [0,1,2,...,N] where N = length - 1
    const zeroToN = Array.from({length: length}, (_value, key) => key);
    const shuffledOrder: number[] = [];
    for (let orderArrLength = length; orderArrLength > 0; orderArrLength--) {
        // i is the size of orderArr
        const randIndex = Math.floor(Math.random() * orderArrLength);

        shuffledOrder.push(zeroToN[randIndex]);
        zeroToN.splice(randIndex, 1);
    }

    return shuffledOrder;
}
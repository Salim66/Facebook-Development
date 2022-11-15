
// generate random number
export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
}
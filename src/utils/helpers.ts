export const generateRandomId=(length = 8)=> {
    return Math.random().toString(36).slice(2, length);
}

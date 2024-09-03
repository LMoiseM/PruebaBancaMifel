export const extractLetters = (valueInput: string): string => {
    return valueInput.replace(/[^a-zA-Z\s]/g, '');
}

export const extractNumbers = (valueInput: string): string => {
    return valueInput.replace(/[^0-9]/g, '').slice(0, 5);
}

export const extractAlphanumeric = (valueInput: string): string => {
    return valueInput.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
}
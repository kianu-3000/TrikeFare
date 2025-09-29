
const currentYear = new Date().getFullYear();
export const years = Array.from({ length: currentYear - 1899 }, (_, index) => currentYear - index);

export const currentDate = new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];


export function isEmpty(obj) {
    if (obj === null || obj === undefined) return true;

    if (Array.isArray(obj) || typeof obj === 'string') {
        return obj.length === 0;
    }

    if (typeof obj === 'object') {
        return Object.keys(obj).length === 0;
    }

    return false;
};

export function formatCurrency(amount) {
    if (isNaN(amount) || amount === '') return '0';
    if (amount.startsWith('0') && amount.length > 1 && !amount.includes('.')) {
        return amount.slice(1);
    }
    return amount;

}
export function isEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email); // true if valid email, false otherwise
}

export function isValidPassword(password) {
    // At least 8–24 chars, 1 uppercase letter, 1 number
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&^#()_\-+=<>.,]{8,24}$/;
    return regex.test(password);
}

export function log(level, fn) {
    return function (...args) {
        console.log(`[${level}] Function called`);

        console.log("Arguments:", args);

        const result = fn(...args);

        console.log("Result:", result);

        return result;
    };
}
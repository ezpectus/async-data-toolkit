export function log(level, fn) {
    return function (...args) {
        console.log(`[${level}] Function called`);

        console.log("Arguments:", args);

        try {
            const result = fn(...args);

            console.log("Result:", result);

            return result;
        } catch (error) {
            console.log("Error:", error.message);

            throw error;
        }
    };
}
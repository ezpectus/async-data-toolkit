export function log(level, fn) {
    return function (...args) {
        console.log(`[${level}] Function called`);

        console.log("Arguments:", args);

        const start = Date.now();

        try {
            const result = fn(...args);

            const end = Date.now();

            console.log("Execution time:", end - start, "ms");

            console.log("Result:", result);

            return result;
        } catch (error) {
            console.log("Error:", error.message);

            throw error;
        }
    };
}
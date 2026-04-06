export function memoize(fn, maxSize = Infinity) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log("Getting value from cache");

            return cache.get(key);
        }

        console.log("Calculating result");
        const result = fn(...args);

        if (cache.size >= maxSize) {
            const firstKey = cache.keys().next().value;

            cache.delete(firstKey);
        }

        cache.set(key, result);
        return result;
    };
}
export function memoize(fn, maxSize = Infinity) {
    const cache = new Map();

    let hits = 0;

    const memoized = function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log("Getting value from cache");

            hits++;

            const value = cache.get(key);

            cache.delete(key);
            cache.set(key, value);

            return value;
        }

        console.log("Calculating result");
        const result = fn(...args);
        cache.set(key, result);

        if (cache.size > maxSize) {
            const firstKey = cache.keys().next().value;

            cache.delete(firstKey);
        }

        return result;
    };

    memoized.clearCache = function () {
        cache.clear();

        console.log("Cache cleared");
    };

    memoized.getHits = function () {
        return hits;
    };

    return memoized;
}
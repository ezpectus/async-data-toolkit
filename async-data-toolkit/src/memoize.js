export function memoize(
    fn,
    maxSize = Infinity,
    expirationTime = 0,
    evictionCallback = null
) {
    const cache = new Map();

    let hits = 0;

    const memoized = function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            const cached = cache.get(key);

            if (
                expirationTime > 0 &&
                Date.now() - cached.timestamp > expirationTime
            ) {
                cache.delete(key);
            } else {
                console.log("Getting value from cache");

                hits++;

                cache.delete(key);
                cache.set(key, cached);

                return cached.value;
            }
        }

        console.log("Calculating result");

        const result = fn(...args);

        cache.set(key, {
            value: result,
            timestamp: Date.now()
        });

        if (cache.size > maxSize) {
            const firstKey = cache.keys().next().value;

            const deletedValue = cache.get(firstKey);

            if (evictionCallback) {
                 evictionCallback(firstKey, deletedValue);
            }
            
           cache.delete(firstKey);
        }

        return result;
    };

    memoized.clearCache = function () {
        cache.clear();

        hits = 0;

        console.log("Cache cleared");
    };

    memoized.getHits = function () {
        return hits;
    };

    return memoized;
}
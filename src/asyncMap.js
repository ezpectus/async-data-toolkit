export function asyncMap(array, callback, done) {
    const results = [];

    let completed = 0;

    if (array.length === 0) {
        done(results);

        return;
    }

    array.forEach((item, index) => {
        setTimeout(() => {
            results[index] = callback(item);

            completed++;

            if (completed === array.length) {
                done(results);
            }
        }, 300);
    });
}

export function asyncMapPromise(
    array,
    callback,
    signal = null
) {
    return new Promise((resolve, reject) => {
        const results = [];

        let completed = 0;

        if (array.length === 0) {
            resolve(results);

            return;
        }

        array.forEach((item, index) => {
            setTimeout(() => {
                if (signal && signal.aborted) {
                    reject("Operation aborted");

                    return;
                }

                results[index] = callback(item);

                completed++;

                if (completed === array.length) {
                    resolve(results);
                }
            }, 300);
        });
    });
}
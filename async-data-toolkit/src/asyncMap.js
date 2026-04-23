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

export function asyncMapPromise(array, callback) {
    return new Promise(resolve => {
        const results = [];

        let completed = 0;

        if (array.length === 0) {
            resolve(results);

            return;
        }

        array.forEach((item, index) => {
            setTimeout(() => {
                results[index] = callback(item);

                completed++;

                if (completed === array.length) {
                    resolve(results);
                }
            }, 300);
        });
    });
}
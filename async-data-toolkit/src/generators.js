export function* fibonacciGenerator() {
    let a = 0;
    let b = 1;

    while (true) {
        yield a;

        const temp = a;
        a = b;
        b = temp + b;
    }
}

export function iterateWithTimeout(iterator, seconds) {
    const endTime = Date.now() + seconds * 1000;

    while (Date.now() < endTime) {
        console.log(iterator.next().value);
    }
}
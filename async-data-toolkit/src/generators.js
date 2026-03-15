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
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

export async function iterateWithTimeout(iterator, seconds) {
    const endTime = Date.now() + seconds * 1000;

    while (Date.now() < endTime) {
        const value = iterator.next().value;
        console.log("Generated:", value);

        await sleep(300);
    }
}

export function* randomNumberGenerator(min = 1, max = 100) {
    while (true) {
        yield Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export function* roundRobinGenerator(items) {
    let index = 0;

    while (true) {
        yield items[index];

        index++;

        if (index >= items.length) {
            index = 0;
        }
    }
}

export function* counterGenerator(start = 0) {
    let current = start;

    while (true) {
        yield current;
        current++;
    }
}
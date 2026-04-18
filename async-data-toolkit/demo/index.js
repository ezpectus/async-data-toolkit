import {
    fibonacciGenerator,
    iterateWithTimeout,
    randomNumberGenerator,
    roundRobinGenerator,
    counterGenerator
} from "../src/generators.js";
import { memoize } from "../src/memoize.js";

async function run() {
    console.log("Fibonacci:");

    const fib = fibonacciGenerator();
    await iterateWithTimeout(fib, 2);

    console.log("Random:");
    const random = randomNumberGenerator();
    await iterateWithTimeout(random, 2);

    console.log("Round Robin:");
    const roundRobin = roundRobinGenerator([
        "A",
        "B",
        "C"
    ]);

    await iterateWithTimeout(roundRobin, 2);
    console.log("Counter:");
    const counter = counterGenerator(10);
    await iterateWithTimeout(counter, 2);
}

function slowSum(a, b) {
    for (let i = 0; i < 100000000; i++) {}

    return a + b;
}

function onCacheEviction(key, value) {
    console.log("Removed from cache:", key);
}

const memoizedSum = memoize(
    slowSum,
    2,
    5000,
    onCacheEviction
);

console.log(memoizedSum(2, 3));
console.log(memoizedSum(2, 3));
memoizedSum.clearCache();
console.log("Cache hits:", memoizedSum.getHits());
console.log("Cache size:", memoizedSum.getCacheSize());

run();
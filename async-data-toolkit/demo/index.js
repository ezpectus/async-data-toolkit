import {
    fibonacciGenerator,
    iterateWithTimeout,
    randomNumberGenerator
} from "../src/generators.js";

async function run() {
    console.log("Fibonacci:");

    const fib = fibonacciGenerator();
    await iterateWithTimeout(fib, 2);
    console.log("Random:");

    const random = randomNumberGenerator();
    await iterateWithTimeout(random, 2);
}

run();
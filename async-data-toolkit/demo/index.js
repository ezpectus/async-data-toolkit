import {
    fibonacciGenerator,
    iterateWithTimeout,
    randomNumberGenerator,
    roundRobinGenerator
} from "../src/generators.js";

async function run() {
    console.log("Fibonacci:");

    const fib = fibonacciGenerator();
    await iterateWithTimeout(fib, 2);
    console.log("Random:");

    const random = randomNumberGenerator();
    await iterateWithTimeout(random, 2);
}

console.log("Round Robin:");
const roundRobin = roundRobinGenerator([
    "A",
    "B",
    "C"
]);

await iterateWithTimeout(roundRobin, 2);

run();
import {
    fibonacciGenerator,
    iterateWithTimeout,
    randomNumberGenerator
} from "../src/generators.js";

console.log("Fibonacci:");
const fib = fibonacciGenerator();

iterateWithTimeout(fib, 1);
console.log("Random:");

const random = randomNumberGenerator();
iterateWithTimeout(random, 1);
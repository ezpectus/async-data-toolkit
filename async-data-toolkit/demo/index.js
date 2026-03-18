import {
    fibonacciGenerator,
    iterateWithTimeout
} from "../src/generators.js";

const fib = fibonacciGenerator();
iterateWithTimeout(fib, 2);
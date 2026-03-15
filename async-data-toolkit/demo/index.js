import { fibonacciGenerator } from "../src/generators.js";

const fib = fibonacciGenerator();

for (let i = 0; i < 10; i++) {
    console.log(fib.next().value);
}
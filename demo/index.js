import {
    fibonacciGenerator,
    iterateWithTimeout,
    randomNumberGenerator,
    roundRobinGenerator,
    counterGenerator
} from "../src/generators.js";
import { memoize } from "../src/memoize.js";
import { PriorityQueue } from "../src/priorityQueue.js";
import {
    asyncMap,
    asyncMapPromise
} from "../src/asyncMap.js";
import { processFileStream } from "../src/streamProcessor.js";
import { MessageSystem } from "../src/events.js";
import { AuthProxy } from "../src/authProxy.js";
import { log } from "../src/logger.js";

const messages = new MessageSystem();

messages.on("notification", notification => {
    console.log("Notification:", notification);
});

messages.on("message", message => {
    console.log("Message:", message);
});

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

function multiply(a, b) {
    return a * b;
}

const loggedMultiply = log("INFO", multiply);

async function runGeneratorsDemo() {
    console.log("\n=== Generators Demo ===");

    const fib = fibonacciGenerator();
    await iterateWithTimeout(fib, 2);

    const random = randomNumberGenerator();
    await iterateWithTimeout(random, 2);

    const roundRobin = roundRobinGenerator([
        "A",
        "B",
        "C"
    ]);

    await iterateWithTimeout(roundRobin, 2);
    const counter = counterGenerator(10);
    await iterateWithTimeout(counter, 2);
}

async function runAsyncMapDemo() {
    console.log("\n=== Async Map Demo ===");

    asyncMap(
        [1, 2, 3, 4],
        number => number * 2,
        results => {
            console.log("Async map results:", results);
        }
    );

    const promiseResults = await asyncMapPromise(
        [5, 6, 7],
        number => number + 1
    );

    console.log("Promise map results:", promiseResults);
}

function runQueueDemo() {
    console.log("\n=== Queue Demo ===");

    const queue = new PriorityQueue();

    queue.enqueue("Process file", 10);
    queue.enqueue("Send notification", 5);
    queue.enqueue("Generate report", 8);

    console.log(queue.peekHighest());

    const nextTask = queue.dequeueHighest();
    console.log("Processing task:", nextTask);

    messages.sendNotification(
        `Completed task: ${nextTask.item}`
    );
}

function runMemoizeDemo() {
    console.log("\n=== Memoize Demo ===");

    console.log(memoizedSum(2, 3));
    console.log(memoizedSum(2, 3));
    console.log("Cache hits:", memoizedSum.getHits());

    memoizedSum.clearCache();
}

async function runProxyDemo() {
    console.log("\n=== Proxy Demo ===");

    const proxy = new AuthProxy("demo-api-key");
    const data = await proxy.request(
        "https://jsonplaceholder.typicode.com/todos/1"
    );

    console.log("API response:", data);
}

function runLoggerDemo() {
    console.log("\n=== Logger Demo ===");

    console.log(loggedMultiply(4, 5));
}

async function runStreamDemo() {
    console.log("\n=== Stream Demo ===");

    await processFileStream("./demo/data.txt");
}

async function startDemoSystem() {
    messages.sendMessage("System started");

    runMemoizeDemo();
    runQueueDemo();

    await runAsyncMapDemo();
    await runStreamDemo();
    await runProxyDemo();

    runLoggerDemo();
    await runGeneratorsDemo();
    messages.sendMessage("System finished");
}

startDemoSystem();
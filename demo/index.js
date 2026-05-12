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

const eventBus = new MessageSystem();

eventBus.on("notification", notification => {
    console.log("Notification:", notification);
});

eventBus.on("message", message => {
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

async function generateTaskData() {
    console.log("\n=== Task Generators ===");

    const fib = fibonacciGenerator();
    await iterateWithTimeout(fib, 2);

    const random = randomNumberGenerator();
    await iterateWithTimeout(random, 2);

    const roundRobin = roundRobinGenerator([
        "LOW",
        "MEDIUM",
        "HIGH"
    ]);

    await iterateWithTimeout(roundRobin, 2);

    const counter = counterGenerator(1000);
    await iterateWithTimeout(counter, 2);
}

async function processTasksAsync() {
    console.log("\n=== Async Task Processing ===");

    asyncMap(
        [1, 2, 3, 4],
        number => number * 2,
        results => {
            console.log("Processed tasks:", results);
        }
    );

    const promiseResults = await asyncMapPromise(
        [5, 6, 7],
        number => number + 1
    );

    console.log("Promise processing results:", promiseResults);
}

function processTaskQueue() {
    console.log("\n=== Task Queue ===");

    const queue = new PriorityQueue();

    queue.enqueue("Process file", 10);
    queue.enqueue("Send notification", 5);
    queue.enqueue("Generate report", 8);

    console.log("Highest priority task:", queue.peekHighest());

    const nextTask = queue.dequeueHighest();

    console.log("Processing task:", nextTask);

    eventBus.sendNotification(
        `Completed task: ${nextTask.item}`
    );
}

function runCachedCalculations() {
    console.log("\n=== Cached Calculations ===");

    console.log(memoizedSum(2, 3));
    console.log(memoizedSum(2, 3));

    console.log(
        "Cache hits:",
        memoizedSum.getHits()
    );

    memoizedSum.clearCache();
}

async function fetchExternalTaskData() {
    console.log("\n=== External API Integration ===");

    const proxy = new AuthProxy("demo-api-key");

    const data = await proxy.request(
        "https://jsonplaceholder.typicode.com/todos/1"
    );

    console.log("API response:", data);
}

function runSystemLogger() {
    console.log("\n=== System Logger ===");

    console.log(loggedMultiply(4, 5));
}

async function processTaskLogs() {
    console.log("\n=== Stream Processing ===");

    await processFileStream("./demo/data.txt");
}

async function startTaskProcessingSystem() {
    eventBus.sendMessage(
        "Task processing system started"
    );

    runCachedCalculations();

    processTaskQueue();

    await processTasksAsync();

    await processTaskLogs();

    await fetchExternalTaskData();

    runSystemLogger();

    await generateTaskData();

    eventBus.sendMessage(
        "Task processing system finished"
    );
}

startTaskProcessingSystem();
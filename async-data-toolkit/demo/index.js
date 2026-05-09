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


async function run() {
    console.log("\n=== Fibonacci ===");

    const fib = fibonacciGenerator();
    await iterateWithTimeout(fib, 2);

    console.log("\n=== Random ===");
    const random = randomNumberGenerator();
    await iterateWithTimeout(random, 2);

    console.log("\n=== Round Robin ===");
    const roundRobin = roundRobinGenerator([
        "A",
        "B",
        "C"
    ]);

    await iterateWithTimeout(roundRobin, 2);
    cconsole.log("\n=== Counter ===");
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

const queue = new PriorityQueue();

queue.enqueue("Low", 1);
queue.enqueue("Medium", 5);
queue.enqueue("High", 10);

console.log(queue.peekHighest());
console.log(queue.peekLowest());
console.log(queue.dequeueHighest());
console.log(queue.dequeueLowest());
console.log(queue.dequeueOldest());
console.log(queue.dequeueNewest());

asyncMap(
    [1, 2, 3, 4],
    number => number * 2,
    results => {
        console.log("Async map results:", results);
    }
);

asyncMapPromise(
    [5, 6, 7],
    number => number + 1
).then(results => {
    console.log("Promise map results:", results);
});

async function testAsyncMap() {
    const results = await asyncMapPromise(
        [10, 20, 30],
        number => number / 2
    );

    console.log("Async await results:", results);
}

testAsyncMap();

const controller = new AbortController();

asyncMapPromise(
    [1, 2, 3],
    number => number * 5,
    controller.signal
)
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.log(error);
    });

controller.abort();

processFileStream("./demo/data.txt");

const messages = new MessageSystem();
messages.on("message", message => {
    console.log("Listener 1:", message);
});

messages.on("message", message => {
    console.log("Listener 2:", message.toUpperCase());
});

messages.on("message", message => {
    console.log("Listener 3 length:", message.length);
});

messages.sendMessage("Hello event system");

function temporaryListener(message) {
    console.log("Temporary listener:", message);
}

messages.on("message", temporaryListener);
messages.sendMessage("First event");
messages.off("message", temporaryListener);
messages.sendMessage("Second event");

messages.on("notification", notification => {
    console.log("Notification listener:", notification);
});

messages.sendNotification("System update");

const proxy = new AuthProxy("demo-api-key");

proxy.request("https://jsonplaceholder.typicode.com/todos/1")
    .then(data => {
        console.log("API response:", data);
    });


function multiply(a, b) {
    return a * b;
 }
    
const loggedMultiply = log("INFO", multiply);
    
console.log(loggedMultiply(4, 5));

run();
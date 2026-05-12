# Async Data Toolkit

Modular asynchronous task processing toolkit built with Node.js and modern JavaScript. 

The project was developed as a continuation and integration of multiple laboratory works focused on async programming patterns, modular application structure, stream processing, caching systems, reactive communication, and utility abstractions.

Instead of keeping each laboratory task isolated, all implemented modules were combined into a single demo system that demonstrates interaction between independent components and asynchronous workflows.

The application includes examples of:
- infinite generators and iterators,
- asynchronous array processing,
- memoization with cache management,
- priority-based task processing,
- stream-based file handling,
- event-driven communication,
- API proxy requests,
- configurable logging utilities.

## Features

- Generators and iterators
- Memoization with cache support
- Priority queue
- Async array processing
- Stream processing
- EventEmitter communication
- Authentication proxy
- Logging decorator


## Technologies

- JavaScript (ES6 Modules)
- Node.js
- Async/Await
- Promises
- EventEmitter
- Streams API

## Project Structure

```text
src/   - core library modules
demo/  - demo application and examples
```
## Example Workflow

1. Tasks are generated and added into the priority queue
2. The queue dispatches tasks based on priority
3. Async processors handle tasks concurrently
4. Events are emitted during processing
5. Logs and stream processors track execution
6. External APIs are accessed through the authentication proxy
7. Memoization optimizes repeated calculations

## Run
```
npm install
npm start
```

---
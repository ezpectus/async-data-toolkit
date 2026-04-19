export class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(item, priority) {
        this.items.push({
            item,
            priority
        });
    }

    dequeueHighest() {
        if (this.items.length === 0) {
            return null;
        }

        this.items.sort((a, b) => b.priority - a.priority);

        return this.items.shift();
    }

    dequeueLowest() {
        if (this.items.length === 0) {
            return null;
        }

        this.items.sort((a, b) => a.priority - b.priority);

        return this.items.shift();
    }

    peekHighest() {
        if (this.items.length === 0) {
            return null;
        }

        this.items.sort((a, b) => b.priority - a.priority);

        return this.items[0];
    }

    peekLowest() {
        if (this.items.length === 0) {
            return null;
        }

        this.items.sort((a, b) => a.priority - b.priority);

        return this.items[0];
    }
}
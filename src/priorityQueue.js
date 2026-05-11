export class PriorityQueue {
    constructor() {
        this.items = [];
        this.index = 0;
    }

    enqueue(item, priority) {
        this.items.push({
            item,
            priority,
            index: this.index++
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

    dequeueOldest() {
        if (this.items.length === 0) {
            return null;
        }

        return this.items.shift();
    }

    dequeueNewest() {
        if (this.items.length === 0) {
            return null;
        }

        return this.items.pop();
    }

    peekHighest() {
        if (this.items.length === 0) {
            return null;
        }

        const sorted = [...this.items].sort(
            (a, b) => b.priority - a.priority
        );
        
        return sorted[0];
    }

    peekLowest() {
        if (this.items.length === 0) {
            return null;
        }

        const sorted = [...this.items].sort(
            (a, b) => a.priority - b.priority
        );
        
        return sorted[0];
    }
}
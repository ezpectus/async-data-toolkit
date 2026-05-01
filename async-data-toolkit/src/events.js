import EventEmitter from "events";

export class MessageSystem extends EventEmitter {
    sendMessage(message) {
        console.log("Sending message:", message);

        this.emit("message", message);
    }
}
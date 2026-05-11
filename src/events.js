import EventEmitter from "events";

export class MessageSystem extends EventEmitter {
    sendMessage(message) {
        this.emit("message", message);
    }

    sendNotification(notification) {
        this.emit("notification", notification);
    }
}
import EventEmitter from "events";

export class MessageSystem extends EventEmitter {
    sendMessage(message) {
        console.log("Sending message:", message);

        this.emit("message", message);
    }

    sendNotification(notification) {
        console.log("Notification:", notification);

        this.emit("notification", notification);
    }
}
// const WebSocket = require("ws");
import { WebSocket } from "ws";

// Create websocket client
const client = new WebSocket("ws://localhost:8080");

client.on("open", () =>
{
    console.log("Connected");
});

//Handling the event when receiving a message from the server.
client.on("message", (message) =>
{
    console.log(`Reeived message: ${message}`);
});
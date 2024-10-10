import { WebSocket } from "ws";
import readline from "readline"

const serverAddress = "ws://localhost:8080";

// Create websocket client
const client = new WebSocket(serverAddress);

client.on("open", () =>
{
    client.send("I have connected.");
});

//Handling the event when receiving a message from the server.
client.on("message", (message) =>
{
    console.log(`${message}`);
});
import { WebSocket } from "ws";
import readline from "readline"

const serverAddress = "ws://localhost:8080";

// Create websocket client
const client = new WebSocket(serverAddress);

client.on("open", () =>
{
    client.send("I have connected.");
    
    /* const rl = readline.createInterface
    ({
        input: process.stdin,
        output: process.stdout
    }); */
});

//Handling the event when receiving a message from the server.
client.on("message", (message) =>
{
    console.log(`MESSAGE: ${message}`);
});
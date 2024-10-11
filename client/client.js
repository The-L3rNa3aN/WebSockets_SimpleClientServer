import { WebSocket } from "ws";
import readline from "readline"

const serverAddress = "ws://localhost:8080";
var clientName = undefined

var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "" });

onStartName("Enter a name to proceed: ");

function onStartName(_str)
{
    rl.question(_str, name =>
    {
        if(name.length !== 0)
        {
            clientName = name;
            main();
        }
        else onStartName("That ain't a name. Enter again: ");
    });
}

function main()
{
    // Create websocket client
    const client = new WebSocket(serverAddress);
    
    rl.prompt();
    
    // client.on("open", () => { client.send(clientName + " has connected."); });
    client.on("open", () => { client.send(`${clientName} has connected.`); });
    
    // Disconnecting doesn't stop the readline. Closing it here.
    client.on('close', () => { rl.close(); });
    
    // Handling the event when receiving a message from the server.
    client.on("message", (message) => { console.log(`${message}`); });
    
    // Sending a message across the network.
    rl.on('line', (line) =>
    {
        client.send(clientName + ": " + line);
    });
}
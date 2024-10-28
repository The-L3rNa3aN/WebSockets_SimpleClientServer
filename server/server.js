import { WebSocketServer } from 'ws';
import readline from "readline";

//Creating a server with a port.
const server = new WebSocketServer({port: 8080});
var clientList = [];

//Enabling readline for sending messages across the connections.
var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "" });
rl.prompt();

server.on('connection', function connection(ws)
{
  ws.on('error', console.error);

  //Connected clients are added to clientList.
  clientList.push(ws);

  //TO DO: handling "disconnect" messages with the name of the client.
  // ws.on("close", () => {});

  // Receiving messages from clients.
  ws.on('message', function message(data)
  {
    console.log(`${data}`);
    broadcastToAll(ws, data);
  });

  // Sending a message to the client on connecting.
  ws.send("SERVER: You have connected to the server.");

  /* readline.emitKeypressEvents(process.stdin);
  if(process.stdin.isTTY) process.stdin.setRawMode(true);
  process.stdin.on('keypress', (key) =>
  {
    // console.log("KEY PRESSED: " + key);
    if(key === '/')
    {
      // process.stdin.setRawMode(false);
      var _rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "SAY> " });
      _rl.prompt();

      _rl.on('line', (line) =>
      {
        ws.send(line);
        _rl.close();
      });
    }
  }); */

  rl.on('line', (line) =>
  {
    ws.send(`SERVER: ${line}`);
  });
});

//Broadcasting a message sent by a client to all the other clients except to the client sending the message.
function broadcastToAll(sender, message)
{
  clientList.forEach(_client => { if(_client !== sender) _client.send(`${message}`); });
}

//Adding code snippet here for future reference.
/* import http from "http";
import open from "open";

(async () =>
{
    await open("./index.html", { "wait": true });
})(); */

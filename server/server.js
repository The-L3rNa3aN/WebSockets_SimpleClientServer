import { WebSocketServer } from 'ws';
import readline from "readline";

//Creating a server with a port.
const server = new WebSocketServer({port: 8080});

//Enabling readline for sending messages across the connections.
var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "" });
rl.prompt();

server.on('connection', function connection(ws)
{
  ws.on('error', console.error);

  // Receiving messages from clients.
  ws.on('message', function message(data) { console.log(`${data}`); });

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
    // readline.clearLine(process.stdout, 0);
    readline.clearScreenDown(process.stdout);
    ws.send(`SERVER: ${line}`);
  });
});
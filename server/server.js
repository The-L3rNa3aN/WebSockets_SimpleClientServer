import { WebSocketServer } from 'ws';
import readline from "readline";

const server = new WebSocketServer({port: 8080});
var rl = undefined;

server.on('connection', function connection(ws) {
  ws.on('error', console.error);

  // Receiving messages from clients.
  ws.on('message', function message(data) {
    console.log('CLIENT: %s', data);
  });

  // Sending a message to the client on connecting.
  ws.send("You have connected to the server.");

  rl = readline.emitKeypressEvents(process.stdin);
  /* if(process.stdin.isTTY)  */process.stdin.setRawMode(true);
  process.stdin.on('keypress', (key) =>
  {
    if(key === '/')
    {
      process.stdin.setRawMode(false);
      rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.question("SAY: ", (s) =>
      {
        ws.send(s);
        rl = readline.emitKeypressEvents(process.stdin);
        /* if(process.stdin.isTTY) */ process.stdin.setRawMode(true);
      });
    }
  });

  //TRY EXPERIMENTING WITH PROCESS.STDOUT
});
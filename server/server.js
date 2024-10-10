import { WebSocketServer } from 'ws';
import readline from "readline";

const server = new WebSocketServer({port: 8080});

server.on('connection', function connection(ws)
{
  ws.on('error', console.error);

  // Receiving messages from clients.
  ws.on('message', function message(data) {
    console.log('CLIENT: %s', data);
  });

  // Sending a message to the client on connecting.
  ws.send("You have connected to the server.");

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

  var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "" });
  rl.prompt();

  rl.on('line', (line) =>
  {
    // rl.clearLine();
    ws.send(`SERVER: ${line}`);
  });
});
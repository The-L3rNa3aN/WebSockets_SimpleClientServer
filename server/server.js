import { WebSocketServer } from 'ws';
// import si from "systeminformation";
import readline from "readline";

const wss = new WebSocketServer({port: 8080});

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  // Receiving messages from clients.
  ws.on('message', function message(data) {
    console.log('CLIENT: %s', data);
  });

  // Sending a message to the client on connecting.
  ws.send("You have connected to the server.");

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question("Test", (ans) => { ws.send(ans) });

  /* setInterval(async () =>
  {
    const cpuTemp = JSON.stringify(await si.currentLoad());
    ws.send(cpuTemp);
  }, 1000); */
});
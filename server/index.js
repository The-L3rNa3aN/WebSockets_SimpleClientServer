const ws = require("ws");
const express = require("express");
const path = require("path");
const http = require('http');
const fs = require('fs');
const readline = require("readline");
const PORT = 3000;

var exapp = express();

// http://localhost:3000/ <- to fetch request.
/* exapp.get('/', (req, res) =>
{
    const options = { root: path.join(__dirname)};
    const fileName = "index.html";
    res.sendFile(fileName, options);
});

exapp.listen(PORT); */

//Creating a server with a port.
const server = new ws.WebSocketServer({port: 8080});
var clientList = [];

//Enabling readline for sending messages across the connections.
var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "" });
rl.prompt();

server.on('connection', function connection(ws)
{
  //Connected clients are added to clientList.
  clientList.push(ws);

  //Popping clients off clientList which are no longer connected the server.
  ws.on('close', () => { clientList.forEach(_client => { if (ws === _client) clientList.pop(_client); }); });

  // Receiving messages from clients.
  ws.on('message', function message(data)
  {
    console.log(`${data}`);
    broadcastToAll(ws, data);
  });

  // Sending a message to the client on connecting.
  ws.send("SERVER: You have connected to the server.");

  rl.on('line', (line) =>
  {
    ws.send("SERVER: " + line);
  });
});

//Broadcasting a message sent by a client to all the other clients except to the client sending the message.
function broadcastToAll(sender, message)
{
  clientList.forEach(_client => { if(_client !== sender) _client.send(message); });
}

//Adding code snippet here for future reference.
/* import http from "http";
import open from "open";

(async () =>
{
    await open("./index.html", { "wait": true });
})(); */

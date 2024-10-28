import { WebSocket } from "ws";
import readline from "readline";

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
            // main();

            console.log("Searching for local servers... Please wait!");
            findLocalServers(8080, "10.10.12.", 1, 255, 20, 500, (servers) => { serverSelect(servers); });
        }
        else onStartName("That ain't a name. Enter again: ");
    });
}

function findLocalServers(port, ipBase, ipLow, ipHigh, maxInFlight, timeout, callback)
{
    var ipCurrent = +ipLow, numInFlight = 0, servers = [];
    ipHigh = +ipHigh;

    function tryOne(ip)
    {
        ++numInFlight;
        var address = "ws://" + ipBase + ip + ":" + port;
        var socket = new WebSocket(address);
        var timer = setTimeout(function()
        {
            // console.log(address + " timeout");
            var s = socket;
            socket = null;
            s.close();
            --numInFlight;
            next();
        }, timeout);
        socket.onopen = function()
        {
            if (socket)
            {
                // console.log(socket._socket);
                // console.log(address + " success");
                clearTimeout(timer);
                servers.push(socket.url);
                --numInFlight;
                next();
            }
        };
        socket.onerror = function(err)
        {
            if (socket)
            {
                // console.log(address + " error");
                clearTimeout(timer);
                --numInFlight;
                next();
            }
        }
    }

    function next()
    {
        while (ipCurrent <= ipHigh && numInFlight < maxInFlight)
        {
            tryOne(ipCurrent++);
        }
        // if we get here and there are no requests in flight, then
        // we must be done
        if (numInFlight === 0) callback(servers);
    }

    next();
}

function serverSelect(serverList)
{
    for(let i = 0; i < serverList.length; i++)
    {
        let listNo = i + 1;
        console.log(`${listNo}          ${serverList[i]}`);
    }

    enterServerNum("Enter a number from the list to join: ");

    function enterServerNum(s)
    {
        rl.question(s, num =>
        {
            if(num <= serverList.length)
            {
                serverAddress = serverList[num - 1];
                main();
            }
            else
                enterServerNum("Invalid entry! Enter again: ");
        });
    }
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

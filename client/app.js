// var socket = new WebSocket("ws://10.10.12.59:8080/")
var clientSocket = undefined;

var namepage = undefined; var chatpage = undefined; var browserpage = undefined;
var box_name = undefined; var box_chat = undefined;
var btn_chat = undefined; var btn_name = undefined;

var text_nameError = undefined;
var text_loading = undefined;

var serverList = undefined;

var chatarea = undefined;

var clientName = undefined;

//Initializing the HTML elements and their visibilities.
function init()
{
    document.body.querySelectorAll("*").forEach(element =>
    {
        switch(element.getAttribute("class"))
        {
            case "namepage": namepage = element; break;
            case "chatpage": chatpage = element; break;
            case "browserpage": browserpage = element; break;

            case "namebox": box_name = element; break;
            case "chatbox": box_chat = element; break;
            case "namebutton": btn_name = element; break;
            case "chatbutton": btn_chat = element; break;

            case "errortext": text_nameError = element; break;
            case "loadingtext": text_loading = element; break;

            case "serverlist": serverList = element;

            case "chatarea": chatarea = element;
        }
    });

    chatpage.classList.add("hide");
    browserpage.classList.add("hide");
}

// Error text which pops up at the name entry section if the client
// hasn't entered an appropriate name.
function showErrorText(_str)
{
    text_nameError.innerHTML = _str;
    let t = setTimeout(() =>
    {
        text_nameError.innerHTML = "";
        clearTimeout(t);
    }, 5000);
}

// Code which I definitely wrote all by myself, that searches for any running
// servers within the local area network.
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
                // servers.push(socket.url);
                servers.push(socket);
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

// Returns a HTML-converted message within the network which is
// displayed in the "chatarea".
function displayMessage(message)
{
    let newEntry = document.createElement("span");
    newEntry.classList.add("msgElement");
    newEntry.innerHTML = `<p id="content">${message}</p>`;
    return newEntry;
}

function startChatPage()
{
    clientSocket.onopen = (message) =>
    {
        let _m = clientName + " has connected.";
        clientSocket.send(_m);
    };

    clientSocket.onmessage = (message) => { chatarea.appendChild(displayMessage(message.data)); };

    btn_chat.addEventListener('click', () =>
    {
        let _m = clientName + ": " + box_chat.value;
        clientSocket.send(_m);
        chatarea.appendChild(displayMessage(_m));
        box_chat.value = "";
    });
}

// Contains loading text with dots, and displays servers running locally to the frontend.
function serverBrowser()
{
    // Hide namepage and reveal server browser page.
    namepage.classList.add("hide");
    browserpage.classList.remove("hide");

    //Three dots text loading
    let s = "";
    let t = setInterval(() =>
    {
        if(s.length > 2)
            s = "";
        else
            s += ".";

        text_loading.innerHTML = "Searching for local servers" + s;
    }, 250);

    //For searching servers within local area network.
    findLocalServers(8080, "10.10.12.", 1, 255, 20, 5000, (servers) =>
    {
        clearInterval(t);
        text_loading.classList.add("hide");
        // console.log(servers);

        //Add servers to unordered list.
        let count = 1;
        servers.forEach(element =>
        {
            let item = document.createElement("div");
            item.innerHTML = `<li class="serverlistitem">
                                    <p class="serverlistindex">${count}</p>
                                    <p id="serverName">${element.url}</p>
                                    <span class="buttonContainer">
                                        <input type="button" id="serverJoin" ip=${element.url} value="Join!">
                                    </span>
                                </li>`;

            let _button = item.querySelector("input");
            _button.onclick = () =>
            {
                clientSocket = new WebSocket(_button.getAttribute("ip"));
                browserpage.classList.add("hide");
                chatpage.classList.remove("hide");
                startChatPage();
                // console.log(clientSocket);
            };
            
            serverList.appendChild(item);

            count++;
        })
    });
}

init();

btn_name.addEventListener('click', () =>
{
    if(box_name.value === "" || box_name.value === null)
        showErrorText("Just enter something, man. It can even be made up garbage.");
    else if(box_name.value.length < 3)
        showErrorText("You either enter something lengthier or I'll give you one. A BAD ONE.");
    else
    {
        clientName = box_name.value;
        serverBrowser();
    }

    box_name.value = "";
});

console.log(window);
window.onclose = () => { alert("This is a test."); };

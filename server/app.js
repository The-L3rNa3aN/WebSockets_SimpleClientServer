const PORT = 8080;
const serverClient = new WebSocket("ws://localhost:" + PORT);
var chatpage = undefined; var box_chat = undefined;
var btn_chat = undefined; var chatarea = undefined;

function init()
{
    document.body.querySelectorAll("*").forEach(element =>
    {
        switch(element.getAttribute("class"))
        {
            case "chatpage": chatpage = element; break;
            case "chatbox": box_chat = element; break;
            case "chatbutton": btn_chat = element; break;
            case "chatarea": chatarea = element;
        }
    });

    console.log(chatpage, box_chat, btn_chat, chatarea);

    //Starting message to notify the user of their server and the port its running on.
    let firstMsg = document.createElement("span");
    firstMsg.classList.add("msgElement");
    firstMsg.innerHTML = `<p id="content">Server started on port ${PORT}.`;
    chatarea.appendChild(firstMsg);
}

function displayMessage(message)
{
    let newEntry = document.createElement("span");
    newEntry.classList.add("msgElement");
    newEntry.innerHTML = `<p id="content">${message}</p>`;
    return newEntry;
}

init();

// Handling input and output of messages.
serverClient.onmessage = (message) => { chatarea.appendChild(displayMessage(message.data)); };

btn_chat.addEventListener('click', () =>
{
    let _m = "SERVER: " + box_chat.value;
    serverClient.send(_m);
    chatarea.appendChild(displayMessage(_m));
    box_chat.value = "";
})

//Refreshing / closing the webpage should close the serverClient message to prevent memory leaks.
window.onbeforeunload = (event) =>
{
    if(clientSocket)
    {
        serverClient.close();
    }
};

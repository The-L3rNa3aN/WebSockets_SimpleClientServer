//Required for hot loading HTML changes.
require("../index.html");
// require("../style.css")
import "../style.css";

//Variables.
var ele_mainPage;
var btn_startClient;
var btn_startServer;

//Initialize document elements to variables.
document.body.querySelectorAll("*").forEach(element =>
{
    switch(element.getAttribute("class"))
    {
        case "mainpage":
            ele_mainPage = element;
            break;

        case "startclient":
            btn_startClient = element;
            break;

        case "startserver":
            btn_startServer = element;
            break;
    }
});

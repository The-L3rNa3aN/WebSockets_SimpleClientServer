//Required for hot loading HTML changes.
require("../index.html");
require("../style.css")

//Variables.
var ele_mainPage;
var btn_startClient;
var btn_startServer;
var ele_modeHeading;

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
            
        case "mode-heading":
            ele_modeHeading = element;
            break;
    }
});

btn_startServer.addEventListener("click", () =>
{
    setPageHeading(0);
});

btn_startClient.addEventListener("click", () =>
{
    setPageHeading(1);
});

function setPageHeading(i)
{
    ele_modeHeading.innerHTML = i === 0 ? "SERVER" : "CLIENT";
}

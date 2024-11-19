import express from "express";
import path from "path";
import open from "open";

// Create Express server to serve frontend and launch frontend link.
var exapp = express();
const PORT = 3001;
exapp.get("/", (req, res) =>
{
    const options = { root: path.join("./") };
    res.sendFile("index.html", options);
});
exapp.use(express.static("./"));
exapp.listen(PORT);
open("http://localhost:" + PORT);

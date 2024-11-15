import express from "express";
import path from "path";
import open from "open";

// Create Express server to serve frontend and launch frontend link.
var exapp = express();
exapp.get("/", (req, res) =>
{
    const options = { root: path.join("./") };
    res.sendFile("index.html", options);
});
exapp.use(express.static("./"));
exapp.listen(3000);
open("http://localhost:3000");

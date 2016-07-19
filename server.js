"use strict";

const express = require("express");
const config = require("./config.js").config;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);


app.use(express.static("public"));
app.get("/", (req, res) => res.sendFile("index.html"));
server.listen(process.env.PORT || config.port);
console.log(`server listening on port: ${process.env.PORT || config.port}`);


const sockets = [];
io.sockets.on("connection", socket => {
    sockets.push(socket);

    socket.on("sendChat", data => {
        console.log("sendChat", data);
        sockets.forEach(s => {
            s.emit("receiveChat", {
                name: "chat",
                message: data.message
            })
        })
    })

});

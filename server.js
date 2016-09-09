"use strict";

const express = require("express");
const config = require("./config.js").config;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const Room = require('./lib/room.js').Room;
const path = require("path");
const root = path.join(__dirname, "public");


// rooms["1"] = new Room("1");
// rooms["2"] = new Room("2");

// rooms["1"].setGame("1", {});
// rooms["2"].setGame("2", {});

// rooms["1"].game.addPlayer("1", "Henry");
// rooms["1"].game.addPlayer("2", "Bob");






app.use(express.static("public"));
app.use(express.static("node_modules/angular"));
app.use(express.static("node_modules/angular-route"));

app.get("/", (req, res) => res.sendFile("index.html", {root: root}));

server.listen(process.env.PORT || config.port);
console.log(`server listening on port: ${process.env.PORT || config.port}`);

const rooms = {};
const sockets = [];
io.sockets.on("connection", socket => {
    sockets.push(socket);
    
    socket.on("joinRoom", roomId => {
        if(!rooms[roomId])
            rooms[roomId] = new Room(roomId);
        const room = rooms[roomId];
        room.sockets.push(socket);
        socket.room = room;
    });

    socket.on("sendChat", data => {
        console.log("sendChat", data);
        socket.room.sockets.forEach(s => {
            s.emit("receiveChat", {
                name: "chat",
                message: data.message
            })
        })
    })
});

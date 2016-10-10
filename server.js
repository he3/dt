"use strict";

const express = require("express");
const config = require("./config.js").config;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const Room = require('./lib/room.js').Room;
const path = require("path");
const root = path.join(__dirname, "public");


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
    });
    
    socket.on("sendGame", data => {
        console.log("sendGame", data);
        const room = socket.room;
        
        if(data.command === "getState"){
            
        }
        
    })
});

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



// -------------------------------------------------------------
// Socket
// -------------------------------------------------------------
const rooms = {};
const sockets = [];

function getRoom(roomId){
    if(!rooms[roomId])
        rooms[roomId] = new Room(roomId);
    return rooms[roomId];
}

function req(){
    throw new Error("Missing Parm");
}

io.sockets.on("connection", socket => {
    sockets.push(socket);
    
    socket.on("joinRoom", ({name = req(), room: roomId = req()}) => {
        socket.name = name;
        const room = getRoom(roomId);
        socket.emit("joinRoomResponse", room.join(socket));
    });

    socket.on("sendChat", data => {
        console.log("sendChat", data);
        io.to(socket.room.id).emit("receiveChat", {
            name: "chat",
            message: data.message
        });
    });
    
    socket.on("sendGame", data => {
        console.log("sendGame", data);
        const room = socket.room;
        
        if(data.command === "getState"){
            
        }
        
    });
});

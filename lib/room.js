"use strict";

const Game = require("./game.js").Game;

function Room(id){
    this.id = id;
    this.sockets = [];

    function nameExists(sockets, name){
        return sockets.some(s => s.name.toLowerCase() === name.toLowerCase());
    }

    this.join = socket => {
        
        if(nameExists(this.sockets, socket.name))
            return {success: false, reason: "Name is already taken!"};
        
        socket.join(this.id);
        socket.room = this;
        this.sockets.push(socket);
        
        console.log(`${socket.name} joined room ${this.id}`);
        return {success: true, reason: null};
    };


    console.log(`Room "${id}" created."`);
}

exports.Room = Room;
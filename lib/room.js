"use strict";

const Game = require("./game.js").Game;

function Room(id){
    this.id = id;
    this.game = null;

    this.setGame = (gameId, config) =>{
        this.game = new Game(gameId);
        console.log(`Game added to room "${id}"`, gameId);
    }

    console.log(`Room "${id}" created."`);
}

exports.Room = Room;
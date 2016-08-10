"use strict";

const Player = require("./player.js").Player;

function Game(gameId){
    this.id = gameId;
    this.players = [];

    this.addPlayer = (id, name) =>{
        const player = new Player(id, name); 
        this.players.push(player);
        console.log(`Player added to game "${gameId}"`, player);
    };

    console.log(`Game "${gameId}" created."`);
}

exports.Game = Game;
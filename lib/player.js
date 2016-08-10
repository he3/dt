"use strict";

function Player(id, name){
    this.id = id;
    this.name = name;
    console.log(`Player "${this.id}":${this.name} created."`);
}

exports.Player = Player;
"use strict"
const player = require("./player.js");

const _game = new game();
_game.run();

function game(){
    var self = this;

    const players = [
         player("Alex"),
         player("Henry")
    ];

    self.run = () => {
        console.log("game.run()");
        players.forEach(p => console.log(`Player Name: ${p.name}`));
    };
}

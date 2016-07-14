"use strict"
const player = require("./player.js").Player;

const _game = new game();
_game.run();

function game(){
    var self = this;

    const players = [
        new player("Alex"),
        new player("Henry")
    ];

    self.run = () => {
        console.log("game.run()");
        players.forEach(p => console.log(`Player Name: ${p.name}`));
    };
}

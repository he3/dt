(() => {
    "use strict";

    angular
        .module("app")
        .component("room", {
            templateUrl: "./app/room/room.html",
            controller: controller
        });

    function controller($routeParams, socket) {
        const $ctrl = this;
        $ctrl.roomId = $routeParams.roomId;
        $ctrl.chats = [];
        $ctrl.message = "";

        socket.on('connect', function () {
            socket.emit('joinRoom', $ctrl.roomId);
        });

        $ctrl.onSend = () => {

            socket.emit("sendChat", {
                message: $ctrl.message
            });

            $ctrl.message = "";
        };

        socket.on("receiveChat", data => {
            console.log("receiveChat", data);
            $ctrl.chats.push(data);
        })
    }
    controller.$inject = ["$routeParams", "socket"];

})();
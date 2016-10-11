(() => {
    "use strict";

    angular
        .module("app")
        .component("home", {
            templateUrl: "./app/home/home.html",
            controller: controller
        });

    function controller($location, socket) {
        const $ctrl = this;
        $ctrl.name = "";
        $ctrl.room = "";

        $ctrl.onGotoRoom = () => {
            $location.path(`/room/${$ctrl.room}`);
        };

        $ctrl.socketStatus = "Unknown";

        socket.on("connect", () => {
            $ctrl.socketStatus = "Connected";
            console.log("Socket Connected");
        });
        socket.on("error", error => {
            $ctrl.socketStatus = "Error";
            console.error("Socket Error", error);
        });
        socket.on("disconnect", () => {
            $ctrl.socketStatus = "Disconnected";
            console.log("Socket Disconnected");
        });
        socket.on("reconnect", attemptNumber => {
            $ctrl.socketStatus = "Reconnected";
            console.log("Socket Reconnected. Attempt #:", attemptNumber);
        });
        socket.on("reconnect_attempt", () => {
            $ctrl.socketStatus = "Reconnect Attempt";
            console.log("Socket Reconnect Attempt");
        });
        socket.on("reconnecting", attemptNumber => {
            $ctrl.socketStatus = "Reconnecting";
            console.log("Socket Reconnecting. Attempt #:", attemptNumber);
        });
        socket.on("reconnect_error", error => {
            $ctrl.socketStatus = "Disconnected";
            console.error("Socket Reconnect Error", error);
        });
        socket.on("reconnect_failed", () => {
            $ctrl.socketStatus = "Reconnect Failed";
            console.log("Socket Reconnect Failed");
        });

    }
    controller.$inject = ["$location", "socket"];

})();
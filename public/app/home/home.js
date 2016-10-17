(() => {
    "use strict";

    angular
        .module("app")
        .component("home", {
            templateUrl: "./app/home/home.html",
            controller: controller
        });

    controller.$inject = ["$location", "$cookies", "socket"];
    function controller($location, $cookies, socket) {
        const $ctrl = this;
        $ctrl.name = $cookies.get("user.name") || "";
        $ctrl.room = "";
        $ctrl.statusMessage = "";

        $ctrl.onGotoRoom = () => {
            if($ctrl.name.length == 0){
                $ctrl.statusMessage = "Name is required";
                return;
            }
            
            if($ctrl.room.length == 0){
                $ctrl.statusMessage = "Room is required";
                return;
            }
            
            $ctrl.statusMessage = "Joining room...";
            $cookies.set("user.name", $ctrl.name);
            socket.emit("joinRoom", {
                name:$ctrl.name,
                room:$ctrl.room
            });
        };
        socket.on("joinRoomResponse", ({success, reason}) => {
           if(success){
               $ctrl.statusMessage = "Joined!";
               $location.path(`/room/${$ctrl.room}`);
           } else {
               $ctrl.statusMessage = reason;
           }
        });



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

})();
(()=>{
    "use strict";

    angular
        .module("app")
        .controller("indexCtrl", controller);

    function controller(socket){
        const $ctrl = this;
        $ctrl.chats = [];
        $ctrl.message = "";

        $ctrl.onSend = () =>{
            
            socket.emit("sendChat", {
                message: $ctrl.message
            });

            $ctrl.message = "";
        };

        socket.on("receiveChat", data =>{
            console.log("receiveChat", data);
            $ctrl.chats.push(data);
        })
    }
    controller.$inject = ["socket"];
})();
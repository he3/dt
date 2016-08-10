(()=>{
    "use strict";

    angular
        .module("app")
        .component("home", {
            templateUrl: "./app/home/home.html",
            controller: controller    
        });

    function controller($location){
        const $ctrl = this;
        $ctrl.name = "";
        $ctrl.room = "";

        $ctrl.onGotoRoom = () =>{
            $location.path(`/room/${$ctrl.room}`);    
        };
    }
    controller.$inject = ["$location"];
    
})();
(()=>{
    "use strict";

    angular
        .module("app", ["ngRoute"])
        .config(routes);



    function routes($routeProvider) {

        $routeProvider
            .when("/", { template: "<home></home>" })
            .when("/room/:roomId", { template: "<room></room>" })
            .otherwise({ redirectTo: "/" });

    }
    routes.$inject = ["$routeProvider"];
})();

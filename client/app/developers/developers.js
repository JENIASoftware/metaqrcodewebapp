(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .config(config);

    config.$inject=['$stateProvider']

    function config($stateProvider){
        $stateProvider
            .state('developers', {
                url: '/developers',
                templateUrl: 'app/developers/developers.html',
                controller: 'DevelopersCtrl',
                controllerAs:'vm',
                bindToController:true
            });
    }
})();

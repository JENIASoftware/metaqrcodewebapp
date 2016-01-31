(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .config(hiw);
    hiw.$inject=['$stateProvider'];

    function hiw($stateProvider) {
            $stateProvider
                .state('hiw', {
                    url: '/hiw',
                    templateUrl: 'app/hiw/hiw.html',
                    controller: 'HiwCtrl',
                    controllerAs:'vm'
                });
        };
})();

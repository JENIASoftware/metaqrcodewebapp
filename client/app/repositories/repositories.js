(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .config(configure);

    configure.$inject=['$stateProvider'];
    function configure($stateProvider){
        $stateProvider
            .state('repositories', {
                url: '/repositories',
                templateUrl: 'app/repositories/repositories.html',
                controller: 'RepositoriesCtrl',
                controllerAs:'vm'
            });
    }
})();


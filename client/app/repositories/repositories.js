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
            }).state('viewRepository', {
                url: '/repositories/:id/view',
                templateUrl: 'app/repositories/repository-view.html',
                controller: 'ViewRepositoryCtrl',
                controllerAs:'vm',
                bindToController:true
            }).state('updateRepository', {
                url: '/repositories/:id/update',
                templateUrl: 'app/repositories/update-view.html',
                controller: 'UpdateRepositoryCtrl',
                controllerAs:'vm',
                bindToController:true
            });
    }
})();


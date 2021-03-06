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
                controllerAs:'vm',
                requireToken:true,
                bindToController:true
            }).state('viewRepository', {
                url: '/repositories/:id/view',
                templateUrl: 'app/repositories/repository-view.html',
                controller: 'ViewRepositoryCtrl',
                controllerAs:'vm',
                bindToController:true
            }).state('viewCatalogFromRepository', {
                url: '/catalogs/:id/view',
                templateUrl: 'app/catalogs/catalog-view.html',
                controller: 'ViewCatalogCtrl',
                controllerAs:'vm',
                bindToController:true
            }).state('repositoriesFromCatalog', {
                url: '/repositories/:catalogEntryId',
                templateUrl: 'app/repositories/repositories.html',
                controller: 'RepositoriesCtrl',
                controllerAs:'vm',
                requireToken:true,
                bindToController:true
            });
    }
})();


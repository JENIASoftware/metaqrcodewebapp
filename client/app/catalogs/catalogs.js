'use strict';

angular.module('metaqrcodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('catalogs', {
        url: '/catalogs',
        templateUrl: 'app/catalogs/catalogs.html',
        controller: 'CatalogsCtrl',
        controllerAs:'vm',
            bindToController:true

      }).state('viewCatalog', {
            url: '/catalogs/:id/view',
            templateUrl: 'app/catalogs/catalog-view.html',
            controller: 'ViewCatalogCtrl',
            controllerAs:'vm',
            bindToController:true
        });
  });
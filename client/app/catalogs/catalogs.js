'use strict';

angular.module('metaqrcodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('catalogs', {
        url: '/catalogs',
        templateUrl: 'app/catalogs/catalogs.html',
        controller: 'CatalogsCtrl',
        controllerAs:'vm'
      });
  });
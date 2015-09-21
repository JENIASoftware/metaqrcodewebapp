'use strict';

angular.module('metaqrcodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs:'vm'
      });
  });
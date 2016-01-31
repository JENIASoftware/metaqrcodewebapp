'use strict';

angular.module('metaqrcodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/register.html',
        controller: 'RegisterController',
            controllerAs:'vm'
      });
  });
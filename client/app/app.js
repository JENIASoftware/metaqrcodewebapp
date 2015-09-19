'use strict';

angular.module('metaqrcodeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
    'ui.bootstrap',
  'psFramework'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

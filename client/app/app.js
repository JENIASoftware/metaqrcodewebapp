(function () {
    'use strict';

    angular.module('metaqrcodeApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'blocks.exception',
        'blocks.logger',
        'angularModalService',
        'angularFileUpload'
    ]).config(config);
    /* @ngInject */
    function config($logProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
    }
})();
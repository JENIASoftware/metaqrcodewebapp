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
        'file-model'
    ])

    .constant('app',{
        SERVER:'http://www.metaqrcode.com',
        PORT:'80'
    })
/**
        .constant('app',{
            SERVER:'http://localhost',
            PORT:'9000'
        })*/

        .constant('toastr', toastr)
    .config(config)
    .run(run);

    config.$inject=['$logProvider', '$urlRouterProvider', '$locationProvider','toastr'];
    /* @ngInject */
    function config($logProvider, $urlRouterProvider, $locationProvider,toastr) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore'];
    /* @ngInject */
    function run($rootScope, $location, $cookieStore) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/repositories', '/upload']) === 0;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });


    }
})();
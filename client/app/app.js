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
        'file-model',
        'afOAuth2',
        'angular-jwt',
        'angular-loading-bar',
        'ng-code-mirror',
        'zeroclipboard',
        'ngTable'
    ])

    .constant('app',{
        SERVER:'http://www.metaqrcode.com',
        PORT:'80'
    })
/*
        .constant('app',{
            SERVER:'http://localhost',
            PORT:'9000'
        })
*/
        .constant('toastr', toastr)
    .config(config)
    .run(run);

    config.$inject=['$logProvider', '$urlRouterProvider', '$locationProvider','toastr','cfpLoadingBarProvider','uiZeroclipConfigProvider'];
    /* @ngInject */
    function config($logProvider, $urlRouterProvider, $locationProvider,toastr,cfpLoadingBarProvider,uiZeroclipConfigProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true).hashPrefix('!');
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
        cfpLoadingBarProvider.includeSpinner = false;
        uiZeroclipConfigProvider.setZcConf({
            swfPath: '../bower_components/zeroclipboard/dist/ZeroClipboard.swf'
        });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore','UserService','jwtHelper','AccessToken','logger'];
    /* @ngInject */
    function run($rootScope, $location, $cookieStore,UserService,jwtHelper,AccessToken,logger) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/repositories', '/upload']) >= 0;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
        $rootScope.$on("oauth2:authSuccess",function(){
            $location.hash('');
            var tokenPayload = jwtHelper.decodeToken(AccessToken.get().id_token);
            UserService.ExistUser(tokenPayload.email).then(function(response){
                if(!response.data.exists) {
                    $location.path('/register');
                }
                else{
                    $location.path('/');
                }
            });
        });
        $rootScope.$on("oauth2:authError",function(error){
            logger.error("Token: ",error);
        });

    }
})();
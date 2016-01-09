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

    config.$inject=['$logProvider', '$urlRouterProvider', '$locationProvider','toastr','cfpLoadingBarProvider','uiZeroclipConfigProvider',];
    /* @ngInject */
    function config($logProvider, $urlRouterProvider, $locationProvider,toastr,cfpLoadingBarProvider,uiZeroclipConfigProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true).hashPrefix('!');

        //Config toastr
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';

        //Config loading-bar
        cfpLoadingBarProvider.includeSpinner = false;
        uiZeroclipConfigProvider.setZcConf({
            swfPath: '../bower_components/zeroclipboard/dist/ZeroClipboard.swf'
        });



    }

    run.$inject = ['$rootScope', '$location', '$cookieStore','Endpoint','jwtHelper','AccessToken','logger','$window'];
    /* @ngInject */
    function run($rootScope, $location, $cookieStore,Endpoint,jwtHelper,AccessToken,logger,$window) {

        // keep user logged in after page refresh
        $rootScope.globals = $window.sessionStorage.getItem('globals') || {};

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState && toState.requireToken) {
                if (!AccessToken.get()) {
                    event.preventDefault();
                    $window.sessionStorage.setItem('oauthRedirectRoute', $location.path());
                    Endpoint.authorize();
                }
            }
        });
        $rootScope.$on("oauth2:authSuccess",function(){
            $location.hash('');
            var tokenPayload = jwtHelper.decodeToken(AccessToken.get().id_token);
            $rootScope.globals ={
                currentUser:{username:tokenPayload.sub}
            };
            $window.sessionStorage.setItem('globals', $rootScope.globals);
        });
        $rootScope.$on("oauth2:authError",function(error){
            logger.error("Token: ",error);
        });

    }
})();
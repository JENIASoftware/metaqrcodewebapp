(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .config(googleLogin);
    googleLogin.$inject=['$stateProvider'];

    function googleLogin($stateProvider) {
            $stateProvider
                .state('googleLogin', {
                    url: '/googleLogin',
                    templateUrl: 'app/googleLogin/googleLogin.html',
                    controller: 'GoogleLoginCtrl',
                    controllerAs:'vm'
                });
        };
})();

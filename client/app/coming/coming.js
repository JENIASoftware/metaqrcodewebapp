(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .config(function ($stateProvider) {
            $stateProvider
                .state('coming', {
                    url: '/coming',
                    templateUrl: 'app/coming/coming.html',
                    controller: 'ComingCtrl'
                });
        });

})();

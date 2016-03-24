(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .config(privacy);
    privacy.$inject=['$stateProvider'];

    function privacy($stateProvider) {
            $stateProvider
                .state('privacy', {
                    url: '/privacy',
                    templateUrl: 'app/privacy/privacy.html',
                    controller: 'PrivacyCtrl',
                    controllerAs:'vm'
                });
        };
})();

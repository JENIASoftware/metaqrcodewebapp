(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .config(pricing);
    pricing.$inject=['$stateProvider'];

    function pricing($stateProvider) {
            $stateProvider
                .state('pricing', {
                    url: '/pricing',
                    templateUrl: 'app/pricing/pricing.html',
                    controller: 'PricingCtrl',
                    controllerAs:'vm'
                });
        };
})();

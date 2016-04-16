(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .config(termsConditions);
    termsConditions.$inject=['$stateProvider'];

    function termsConditions($stateProvider) {
            $stateProvider
                .state('termsConditions', {
                    url: '/termsConditions',
                    templateUrl: 'app/termsConditions/termsConditions.html',
                    controller: 'TermsConditionsCtrl',
                    controllerAs:'vm'
                });
        };
})();

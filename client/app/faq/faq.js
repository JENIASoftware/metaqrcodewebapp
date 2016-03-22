(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .config(faq);
    faq.$inject=['$stateProvider'];

    function faq($stateProvider) {
            $stateProvider
                .state('faq', {
                    url: '/faq',
                    templateUrl: 'app/faq/faq.html',
                    controller: 'FaqCtrl',
                    controllerAs:'vm'
                });
        };
})();

(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .config(confirmRegistration);

    confirmRegistration.$inject=['$stateProvider'];

    function confirmRegistration($stateProvider){
        $stateProvider
            .state('confirmRegistration', {
                url: '/confirmRegistration',
                templateUrl: 'app/confirmRegistration/confirmRegistration.html',
                controller: 'ConfirmRegistrationCtrl',
                controllerAs:'vm'
            });
    }
})();

(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .config(config);

    config.$inject=['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('profile', {
                url: '/profile',
                templateUrl: 'app/profile/profile.html',
                controller: 'ProfileCtrl',
                controllerAs:'vm',
                bindToController:true,
                requireToken:true
            }).state('editProfile', {
                url: '/profile/edit',
                templateUrl: 'app/profile/profile-edit.html',
                controller: 'ProfileEditCtrl',
                controllerAs:'vm',
                bindToController:true,
                requireToken:true
            });
    }
})();

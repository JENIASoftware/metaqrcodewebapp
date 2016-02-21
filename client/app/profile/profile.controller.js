(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .controller('ProfileCtrl',ProfileCtrl);

    ProfileCtrl.$inject=['UserService'];

    function ProfileCtrl(UserService){
        var vm=this;
        vm.user={};

        vm.updateProfile=updateProfile;
        vm.deleteProfile=deleteProfile;

        activate();
        //////////////////////////////////////////////////////////////////
        function activate(){
            UserService.GetUserProfile()
                .then(function(response){
                    vm.user=response;
                });
        }

        function updateProfile(profile){

        }

        function deleteProfile(){

        }
    }
})();


(function(){
    'use strict';
    angular.module('metaqrcodeApp')
        .controller('ProfileEditCtrl',ProfileEditCtrl);

    ProfileEditCtrl.$inject=['UserService','logger'];

    function ProfileEditCtrl(UserService,logger){
        var vm=this;
        vm.user={};
        vm.update=update;

        activate();
        //////////////////////////////////////////////////////////////////
        function activate(){
            UserService.GetUserProfile()
                .then(function(response){
                    vm.user.address= response.data.address;
                    vm.user.city= response.data.city;
                    vm.user.email= response.data.email;
                    vm.user.firstName=response.data.firstName;
                    vm.user.lastName=response.data.lastName;
                    vm.user.nickName=response.data.nickName;
                    vm.user.preferredLanguage=response.data.preferredLanguage;
                    vm.user.zipCode=response.data.zipCode;
                });
        }

        function update(){
            UserService.Update(vm.user)
                .then(function(){
                    logger.success("Update success");
                });
        }
    }
})();

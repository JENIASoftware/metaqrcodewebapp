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
                    vm.user = response;
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

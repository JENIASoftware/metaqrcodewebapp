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
                }, function (jqXHR, textStatus, errorThrown) {
                	vm.dataLoading = false;
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                        return vm.error = "" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason;
                	} else {
                        return vm.error=textStatus + " : " + errorThrown.toLocaleString();;
                	}
                });
        }

        function updateProfile(profile){

        }

        function deleteProfile(){

        }
    }
})();


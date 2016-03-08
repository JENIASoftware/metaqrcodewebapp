(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .controller('ProfileCtrl',ProfileCtrl);

    ProfileCtrl.$inject=['UserService','logger'];

    function ProfileCtrl(UserService,logger){
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
	            		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
	            	} else {
	                    logger.error(textStatus + " : " + errorThrown.toLocaleString());
	            	}
                });
        }

        function updateProfile(profile){

        }

        function deleteProfile(){

        }
    }
})();


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
                }, function (jqXHR, textStatus, errorThrown) {
                	vm.dataLoading = false;
	            	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
	            		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
	            	} else {
	                    logger.error(textStatus + " : " + errorThrown.toLocaleString());
	            	}
                });
        }

        function update(){
        	vm.user.preferredLanguage='en';
        	UserService.Update(vm.user)
                .then(function(){
                    logger.success("Update success");
                }, function (jqXHR, textStatus, errorThrown) {
                	vm.dataLoading = false;
	            	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
	            		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
	            	} else {
	                    logger.error(textStatus + " : " + errorThrown.toLocaleString());
	            	}
                });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', 'AuthenticationService','logger'];
    function RegisterController(UserService, $location, AuthenticationService,logger) {
        var vm = this;

        vm.register = register;
        vm.error=null;
        activate();
        ///////////////////////////////////////////////////////////////////////////////

        function activate(){
        }
        function register() {
            vm.dataLoading = true;
        	vm.user.preferredLanguage='en';
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.returnCode>=0) {
                        $location.path('/confirmRegistration');
                    } else {
                        vm.dataLoading = false;
                        vm.error=response.reason;
                    }
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
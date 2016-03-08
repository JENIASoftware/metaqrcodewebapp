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
           /* AuthenticationService.GetExternalUserProfile().then(function(response){
                vm.user.email=response.data.emails[0].value;
                vm.user.firstName=response.data.name.givenName;
                vm.user.lastName=response.data.name.familyName;
                vm.user.nickName=response.data.emails[0].value.split('@')[0];
                vm.user.preferredLanguage=response.data.language;
            });*/

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
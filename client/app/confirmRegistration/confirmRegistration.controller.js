
(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .controller('ConfirmRegistrationCtrl', ConfirmRegistrationCtrl);

    ConfirmRegistrationCtrl.$inject = ['AuthenticationService', '$location'];
    function ConfirmRegistrationCtrl(AuthenticationService, $location) {
        var vm = this;
        vm.validateRegistrationCode=validateRegistrationCode;
        vm.error=null;


        function validateRegistrationCode() {
            AuthenticationService.ValidateRegistrationCode(vm.email,vm.registrationConfirmationCode)
                .then(function (response) {
                    if (response.returnCode>=0) {
                        $location.path('/login');
                    } else {
                        vm.error=response.reason;
                    }
                }, function (jqXHR, textStatus, errorThrown) {
                	vm.dataLoading = false;
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                        return vm.error = "" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason;
                	} else {
                        return vm.error=textStatus + " : " + errorThrown.toLocaleString();;
                	}
                });
        }
    }

})();

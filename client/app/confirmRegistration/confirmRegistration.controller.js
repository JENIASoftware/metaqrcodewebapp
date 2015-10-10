
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
            vm.dataLoading = true;
            AuthenticationService.ValidateRegistrationCode(vm.email,vm.registrationConfirmationCode)
                .then(function (response) {
                    if (response.data.returnCode>=0) {
                        $location.path('/login');
                    } else {
                        vm.dataLoading = false;
                        vm.error=response.data.reason;
                    }
                });
        }
    }

})();

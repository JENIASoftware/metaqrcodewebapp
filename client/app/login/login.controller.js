(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$window', 'AuthenticationService'];
    function LoginController($window, AuthenticationService) {
        var vm = this;

        vm.login = login;
        vm.error=null;
        activate();
        ////////////////////////////////////////////////////////////////////////////////////////////

        function activate() {
            // reset login status
            AuthenticationService.ClearCredentials();

        };

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.data.returnCode>=0) {
                    AuthenticationService.SetCredentials(vm.username, response.data.sessionToken);
                    $window.location.href='#/';
                } else {
                    vm.dataLoading = false;
                    vm.error=response.data.reason;
                }
            },function (jqXHR, textStatus, errorThrown) {
            	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
            		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
            	} else {
                    logger.error(textStatus + " : " + errorThrown.toLocaleString());
            	}
            });
        };
    }

})();
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

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.returnCode>=0) {
                    AuthenticationService.SetCredentials(vm.username, response.sessionToken);
                    $window.location.href='/';
                } else {
                    vm.dataLoading = false;
                    vm.error=response.reason;
                }
            });
        };
    }

})();
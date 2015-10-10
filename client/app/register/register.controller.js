(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope'];
    function RegisterController(UserService, $location, $rootScope) {
        var vm = this;

        vm.register = register;
        vm.error=null;


        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
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
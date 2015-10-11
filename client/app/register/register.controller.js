(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', 'AuthenticationService'];
    function RegisterController(UserService, $location, AuthenticationService) {
        var vm = this;

        vm.register = register;
        vm.error=null;

        activate();
        ///////////////////////////////////////////////////////////////////////////////

        function activate(){
            AuthenticationService.GetExternalUserProfile().then(function(response){
                vm.user.email=response.data.emails[0].value;
                vm.user.username=response.data.emails[0].value;
                vm.user.firstName=response.data.name.givenName;
                vm.user.lastName=response.data.name.familyName;
                vm.user.nickName=response.data.emails[0].value.split('@')[0];
            });

        }
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
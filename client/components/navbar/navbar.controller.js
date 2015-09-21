(function(){
'use strict';

angular.module('metaqrcodeApp')
    .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject=['$rootScope', '$location','UserService','AuthenticationService'];

    function NavbarCtrl($rootScope, $location,UserService,AuthenticationService) {
        var vm=this;
        vm.isCollapsed = true;
        vm.user=null;
        vm.menu = null;
        vm.isActive = isActive;
        vm.logOut=logout;

        activate();

        ////////////////////////////////////////////////////////////////////
        function activate(){
            vm.menu=getMenuItems();
            loadCurrentUser();
        }

        function logout(){
            AuthenticationService.ClearCredentials();
        };
        function isActive(route) {
            return route === $location.path();
        };

        function loadCurrentUser(){
            if($rootScope.globals.currentUser) {
                UserService.GetByUsername($rootScope.globals.currentUser.username)
                    .then(function (user) {
                        vm.user = user;
                    });
            }
        }
        function getMenuItems(){
            var menu = [
                {
                    'title': 'Home',
                    'link': '/',
                    'icon':'home'
                },
                {
                    'title': 'Catalogs',
                    'link': '/catalogs',
                    'icon':'file-code-o'
                },
                {
                    'title': 'Upload',
                    'link': '/upload',
                    'icon':'upload'
                }];
            return menu;
        }
  };
})();
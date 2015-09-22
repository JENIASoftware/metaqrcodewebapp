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
        vm.logout=logout;

        activate();

        ////////////////////////////////////////////////////////////////////
        function activate(){
            vm.menu=getMenuItems();
            loadCurrentUser();
        }

        function logout(){
            AuthenticationService.ClearCredentials();
            vm.user=null;
            $location.path('/');
        };
        function isActive(route) {
            return route === $location.path();
        };

        function loadCurrentUser(){
            vm.user =$rootScope.globals.currentUser;
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
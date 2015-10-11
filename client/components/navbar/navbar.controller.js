(function(){
'use strict';

angular.module('metaqrcodeApp')
    .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject=['$rootScope', '$location','UserService','AuthenticationService','localize'];

    function NavbarCtrl($rootScope, $location,UserService,AuthenticationService,localize) {
        var vm=this;
        vm.isCollapsed = true;
        vm.user=null;
        vm.menu = null;
        vm.isActive = isActive;
        vm.logout=logout;
        vm.setLanguage=setLanguage;
        vm.selectedLanguage=null;

        activate();

        ////////////////////////////////////////////////////////////////////
        function activate(){
            vm.menu=getMenuItems();
            loadCurrentUser();
            vm.selectedLanguage='en';

        }

        function setLanguage(lang){
            localize.setLanguage(lang);
            vm.selectedLanguage=lang;
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
                    'icon':'list'
                },
                {
                    'title': 'Repositories',
                    'link': '/repositories',
                    'icon': 'qrcode'
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
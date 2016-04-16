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
        vm.getUser=getUser;
        vm.isLoginGoogle=isLoginGoogle;
        vm.isLoginBearer=isLoginBearer;

        activate();

        ////////////////////////////////////////////////////////////////////
        function activate(){
            vm.menu=getMenuItems();
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
        function getUser(){
            return $rootScope.globals.metaqrcodeUser==null?"":$rootScope.globals.metaqrcodeUser;
        }
        function isLoginGoogle(){
            return $rootScope.globals.loginType=='google';
        }
        function isLoginBearer(){
            return $rootScope.globals.loginType=='bearer';
        }
        function getMenuItems(){
            var menu = [
                {
                    'title': 'Home',
                    'link': '#/',
                    'icon':'home'
                },
                {
                    'title': 'XSD Catalog',
                    'link': '#/catalogs',
                    'icon':'list'
                },
                {
                    'title': 'XML Repository',
                    'link': '#/repositories',
                    'icon': 'qrcode'
                },
                {
                    'title': 'Developers',
                    'link': 'https://github.com/JENIASoftware/metaqrcode',
                    'icon':'laptop'
                }];
            return menu;
        }
  };
})();
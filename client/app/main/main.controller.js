(function () {
'use strict';

angular.module('metaqrcodeApp')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject=['$location','$anchorScroll'];

    function MainCtrl($location,$anchorScroll) {
        var vm = this;
        vm.catalogs = [];
        vm.navigate=navigate;

        activate();
        
        function activate() {
            $('.carousel').carousel({
                interval: 5000 //changes the speed
            });
        }

        function navigate(url){
            if(url.startsWith('http')){
            	window.location.href =url;
            }
            else{
	            $location.path(url);
            }
        }
    }
})();

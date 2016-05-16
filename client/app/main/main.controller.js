(function () {
'use strict';

angular.module('metaqrcodeApp')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject=['$location','$anchorScroll'];

    function MainCtrl($location,$anchorScroll) {
        var vm = this;
        vm.catalogs = [];
        vm.navigate=navigate;
        vm.scrollBottom=scrollBottom;

        activate();
        
        function activate() {
            $('.carousel').carousel({
                interval: 5000 //changes the speed
            });
        }

        function navigate(url){
            if(startsWith(url,'http') || startsWith(url,'https')){
            	window.open(url,'_blank');
            }
            else if(startsWith(url,'mailto')){
            	window.location.href =url;
            }
            else{
	            $location.path(url);
            }
        }

        function scrollBottom(){
        	$('html, body').scrollTop( $(document).height() );
        }
        
        function startsWith(str, prefix){
        	return (str.indexOf(prefix) === 0);
        }
    }
})();

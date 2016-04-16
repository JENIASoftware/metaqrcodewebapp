(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .controller('GoogleLoginCtrl',GoogleLoginCtrl);
    
    GoogleLoginCtrl.$inject=['dataservice','$rootScope','$scope','$timeout','logger'];

    function GoogleLoginCtrl(dataservice,$rootScope,$scope,$timeout,logger){
        var vm=this;

        activate();

        function activate(){
        	$timeout(function() {
        		  // anything you want can go here and will safely be run on the next digest.
        		$('#googleoauth2-signin').click();
        	},1000);
        	
        }
    }


})();


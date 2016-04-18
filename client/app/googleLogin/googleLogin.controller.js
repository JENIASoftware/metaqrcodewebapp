(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .controller('GoogleLoginCtrl',GoogleLoginCtrl);
    
    GoogleLoginCtrl.$inject=['dataservice','$rootScope','$scope','$timeout','logger'];

    function GoogleLoginCtrl(dataservice,$rootScope,$scope,$timeout,logger){
        var vm=this;

        activate();

        function activate(){
        }
    }


})();


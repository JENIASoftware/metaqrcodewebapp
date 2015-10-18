(function(){
    'use strict';
    angular.module('metaqrcodeApp')
        .controller('ViewRepositoryCtrl',ViewRepositoryCtrl);

    ViewRepositoryCtrl.$inject=['dataservice','$stateParams'];
    function ViewRepositoryCtrl(dataservice,$stateParams){
        var vm=this;
        vm.repository=null;
        vm.activeFormat=null;
        vm.changeTextFormat=changeTextFormat;

        activate();

        ////////////////////////////////////////////////////////////////////////////////////////
        function activate(){
            dataservice.getRepository($stateParams.id)
                .then(function(response){
                    vm.repository=response.result[0];
                    vm.activeFormat='xml';
                    dataservice.downloadRepository($stateParams.id)
                        .then(function(responseDownload){
                            vm.repository.text=responseDownload;
                        });
                });
        }

        function changeTextFormat(format){
            dataservice.downloadRepository(vm.repository.id,format)
                .then(function(response){
                    vm.repository.text=format=='json'?JSON.stringify(response, null, 2): response;
                    vm.activeFormat=format;
                });
        }
    }
})();

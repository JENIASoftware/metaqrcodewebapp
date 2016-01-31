(function(){
    'use strict';
    angular.module('metaqrcodeApp')
        .controller('ViewCatalogCtrl',ViewCatalogCtrl);

    ViewCatalogCtrl.$inject=['dataservice','$stateParams'];
    function ViewCatalogCtrl(dataservice,$stateParams){
        var vm=this;
        vm.catalog=null;

        activate();
        ////////////////////////////////////////////////////////////////////////////////////////
        function activate(){
            dataservice.getCatalog($stateParams.id)
                .then(function(response){
                    vm.catalog=response.result[0];
                    dataservice.downloadCatalog($stateParams.id)
                        .then(function(responseDownload){
                            vm.catalog.text=responseDownload;
                        });
                });
        }
    }
})();

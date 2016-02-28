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
                    vm.catalog=response.catalogEntry;
                    dataservice.downloadCatalog(vm.catalog.id)
                        .then(function(response, textStatus, jqXHR){
                            vm.catalog.text=jqXHR.responseText;
                        }, function (jqXHR, textStatus, errorThrown) {
                        	vm.dataLoading = false;
                        	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                                return vm.error = "" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason;
                        	} else {
                                return vm.error=textStatus + " : " + errorThrown.toLocaleString();;
                        	}
                        });
                }, function (jqXHR, textStatus, errorThrown) {
                	vm.dataLoading = false;
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                        return vm.error = "" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason;
                	} else {
                        return vm.error=textStatus + " : " + errorThrown.toLocaleString();;
                	}
                });
        }
    }
})();

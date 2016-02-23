
(function () {
'use strict';

angular.module('metaqrcodeApp')
    .controller('CatalogsCtrl', CatalogsCtrl);
    
    /* @ngInject */
    function CatalogsCtrl(dataservice,ModalService,$rootScope,NgTableParams) {
        var vm = this;
        vm.catalogs = [];
        vm.activeCatalog=null;
        vm.newCatalog={};
        vm.userLogged=false;
        vm.searchCriteria=null;
        vm.tableParams=null;

        vm.search=search;
        vm.showModal=showModal;

        activate();

        /////////////////////////////////////////////////////////////////////////////////////////////////
        function activate() {
            vm.searchCriteria={
                rowPerPage:10,
                currentPage:0,
                totalPages:0,
                query:''
            };
            search();


            vm.userLogged=$rootScope.globals.metaqrcodeUser==null?"":$rootScope.globals.metaqrcodeUser.email;
        }
        function search(){
            vm.tableParams=new NgTableParams({count:vm.searchCriteria.rowPerPage}, {
                counts: [10, 30, 50],
                getData: function(params) {
                    return dataservice.getCatalogs(params.page()-1,params.count(),vm.searchCriteria.query).then(function(data){
                        params.total(data.rowTotal); // recal. page nav controls
                        return data.result;
                    }, function (jqXHR, textStatus, errorThrown) {
                    	vm.dataLoading = false;
                    	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                            return vm.error = "" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason;
                    	} else {
                            return vm.error=textStatus;
                    	}
                    });
                }
            });
        }
        function showModal(){
            ModalService.showModal({
                templateUrl: "app/catalogs/catalogForm.html",
                controller: "CatalogsModalCtrl",
                inputs: {
                    title: "Add a new Catalog"
                }
            }).then(function(modal) {
                // The modal object has the element built, if this is a bootstrap modal
                // you can call 'modal' to show it, if it's a custom modal just show or hide
                // it as you need to.
                modal.element.modal();
                modal.close.then(function(result) {
                    if(result.catalog.name) {
                        vm.newCatalog = result.catalog;
                        vm.catalogs.push(vm.newCatalog);
                        vm.newCatalog = {};
                    }
                }, function (jqXHR, textStatus, errorThrown) {
                	vm.dataLoading = false;
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                        return vm.error = "" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason;
                	} else {
                        return vm.error=textStatus;
                	}
                });
            }, function (jqXHR, textStatus, errorThrown) {
            	vm.dataLoading = false;
            	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                    return vm.error = "" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason;
            	} else {
                    return vm.error=textStatus;
            	}
            });
        }
    }
})();
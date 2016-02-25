(function(){
    'use strict';
    angular.module('metaqrcodeApp')
        .controller('ViewRepositoryCtrl',ViewRepositoryCtrl);

    ViewRepositoryCtrl.$inject=['dataservice','$stateParams','ModalService'];
    function ViewRepositoryCtrl(dataservice,$stateParams,ModalService){
        var vm=this;
        vm.repository=null;
        vm.activeFormat=null;
        vm.viewcatalogs=false;
        vm.changeTextFormat=changeTextFormat;
        vm.showModal=showModal;
        vm.catalogs=catalogs;

        activate();
        ////////////////////////////////////////////////////////////////////////////////////////
        function activate(){
            dataservice.getRepository($stateParams.id)
                .then(function(response){
                    vm.repository=response.repositoryEntry;
                    vm.activeFormat='xml';
                    vm.viewcatalogs=false;
                    dataservice.downloadRepository(vm.repository.id)
                        .then(function(response, textStatus, jqXHR){
                        	vm.repository.text=jqXHR.responseText;
                        },function (jqXHR, textStatus, errorThrown) {
                        	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                        		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
                        	} else {
                                logger.error(textStatus);
                        	}
                        });
                },function (jqXHR, textStatus, errorThrown) {
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
                	} else {
                        logger.error(textStatus);
                	}
                });
        }

        function changeTextFormat(format){
            dataservice.downloadRepository(vm.repository.id,format)
                .then(function(response, textStatus, jqXHR){
                	vm.repository.text=jqXHR.responseText;
                    vm.activeFormat=format;
                    vm.viewcatalogs=false;
                },function (jqXHR, textStatus, errorThrown) {
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
                	} else {
                        logger.error(textStatus);
                	}
                });
        }

        function catalogs(){
            dataservice.getRepository(vm.repository.id)
                .then(function(response){
                	vm.activeFormat=null;
                    vm.viewcatalogs=true;
                },function (jqXHR, textStatus, errorThrown) {
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
                	} else {
                        logger.error(textStatus);
                	}
                });
        }

        function showModal(){
            ModalService.showModal({
                templateUrl: "app/repositories/repositoryModalForm.html",
                controller: "RepositoryModalCtrl",
                inputs: {
                    title: "Update an existing XML repository",
                    action:"update",
                    repository:vm.repository
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if(result.repository.qrcodeGet) {
                        vm.newRepository = result.repository;
//                        vm.repositories.push(vm.newRepository);
                        vm.newRepository = {};
                    }
                });
            });
        }
    }
})();

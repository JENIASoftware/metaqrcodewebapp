(function(){
    'use strict';
    angular.module('metaqrcodeApp')
        .controller('UpdateRepositoryCtrl',UpdateRepositoryCtrl);

    UpdateRepositoryCtrl.$inject=['dataservice','$stateParams','ModalService'];
    function UpdateRepositoryCtrl(dataservice,$stateParams,ModalService){
        var vm=this;
        vm.repository=null;
        vm.activeFormat=null;
        vm.changeTextFormat=changeTextFormat;
        vm.showModal=showModal;

        activate();

        ////////////////////////////////////////////////////////////////////////////////////////
        function activate(){
            dataservice.getRepository($stateParams.id)
                .then(function(response){
                    vm.repository=response.result[0];
                    vm.activeFormat='xml';
                    dataservice.downloadRepository($stateParams.id)
                        .then(function(response, textStatus, jqXHR){
                        	vm.repository.text=jqXHR.responseText;
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

        function changeTextFormat(format){
            dataservice.downloadRepository(vm.repository.id,format)
                .then(function(response, textStatus, jqXHR){
                    vm.repository.text=format=='json'?JSON.stringify(jqXHR.responseText, null, 2): jqXHR.responseText;
                    vm.activeFormat=format;
                }, function (jqXHR, textStatus, errorThrown) {
                	vm.dataLoading = false;
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                        return vm.error = "" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason;
                	} else {
                        return vm.error=textStatus + " : " + errorThrown.toLocaleString();;
                	}
                });
        }

        function showModal(){
            ModalService.showModal({
                templateUrl: "app/repositories/repositoryModalForm.html",
                controller: "RepositoryModalCtrl",
                inputs: {
                    title: "Update XML repository",
                    action:"update",
                    repository:vm.repository
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if(result.repository.qrcodeGet) {
                        vm.newRepository = result.repository;
                        vm.repositories.push(vm.newRepository);
                        vm.newRepository = {};
                    }
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

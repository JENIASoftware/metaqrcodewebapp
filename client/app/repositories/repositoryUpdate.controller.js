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

        function showModal(){
            ModalService.showModal({
                templateUrl: "app/repositories/repositoryModalForm.html",
                controller: "RepositoryModalCtrl",
                inputs: {
                    title: "Update Repository",
                    action:"update"
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if(result.repository.qrcodeGet) {
                        vm.newRepository = result.repository;
                        vm.repositories.push(vm.newRepository);
                        vm.newRepository = {};
                    }
                });
            });
        }
    }
})();

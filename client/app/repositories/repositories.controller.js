(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .controller(RepositoriesCtrl);

    RepositoriesCtrl.$inject=['dataservice','logger','ModalService'];
    function RepositoriesCtrl(dataservice,logger,ModalService){
        var vm=this;
        vm.repositories = [];
        vm.setActiveRepository = setActiveRepository;
        vm.activeRepository;
        vm.showModal=showModal;
        vm.newRepository={};
        activate();

        function activate() {
            dataservice.getRepositories().then(function(data){
                vm.repositories=data;
                logger.info('Activated RepositoriesCtrl View');
            });
        }
        function setActiveRepository(repository) {
            vm.activeRepository = repository;
        }
        function showModal(){
            ModalService.showModal({
                templateUrl: "app/repositories/repositoryForm.html",
                controller: "RepositoryModalCtrl",
                inputs: {
                    title: "Add a new Repository"
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if(result.repository.name) {
                        vm.newRepository = result.repository;
                        vm.repositories.push(vm.newRepository);
                        vm.newRepository = {};
                    }
                });
            });
        }
    }
})();



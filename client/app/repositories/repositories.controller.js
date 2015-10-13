(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .controller('RepositoriesCtrl',RepositoriesCtrl);

    RepositoriesCtrl.$inject=['dataservice','logger','ModalService'];

    function RepositoriesCtrl(dataservice,logger,ModalService){
        var vm=this;
        vm.repositories = [];
        vm.activeRepository;
        vm.newRepository={};
        vm.searchCriteria=null;

        vm.totalPages=totalPages;
        vm.showModal=showModal;
        vm.setActiveRepository = setActiveRepository;
        vm.search=search;

        activate();
        /////////////////////////////////////////////////////////////////////////////////
        function activate() {
            vm.searchCriteria={
                rowPerPage:10,
                currentPage:0,
                totalPages:0,
                query:''
            };
            dataservice.getRepositories(vm.searchCriteria.pageNumber,vm.searchCriteria.rowPerPage,vm.searchCriteria.query)
                .then(function(data){
                vm.repositories=data.result;
                vm.searchCriteria.currentPage=data.currentPageNumber;
                vm.searchCriteria.totalPages=data.pageTotal;
            });
        }
        function totalPages(){
            var ret=[];
            if(!vm.searchCriteria.totalPages) return 0;
            for(var i= 0;i<vm.searchCriteria.totalPages;i++){
                ret.push(i);
            }
            return ret;
        }
        function search(page){
            dataservice.getRepositories(page,vm.searchCriteria.rowPerPage,vm.searchCriteria.query).then(function(data){
                vm.repositories=data.result;
                vm.searchCriteria.currentPage=data.currentPageNumber;
                vm.searchCriteria.totalPages=data.pageTotal;
                logger.info('Search result repositories:query:['+vm.searchCriteria.query+'] totalrow['+data.rowTotal+ '] currentpage[' + data.currentPageNumber+ '] total[' +data.pageTotal+']',data.result);
            });
        }
        function setActiveRepository(repository) {
            dataservice.downloadRepository(repository.id)
                .then(function(response){
                    vm.activeRepository = repository;
                    vm.activeRepository.text=response;
                });

        }
        function showModal(){
            ModalService.showModal({
                templateUrl: "app/repositories/repositoryModalForm.html",
                controller: "RepositoryModalCtrl",
                inputs: {
                    title: "Add a new Repository"
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



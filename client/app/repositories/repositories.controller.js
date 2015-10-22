(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .controller('RepositoriesCtrl',RepositoriesCtrl);

    RepositoriesCtrl.$inject=['dataservice','$stateParams','ModalService','NgTableParams'];

    function RepositoriesCtrl(dataservice,$stateParams,ModalService,NgTableParams){
        var vm=this;
        vm.repositories = [];
        vm.activeRepository;
        vm.newRepository={};
        vm.searchCriteria=null;
        vm.activeFormat=null;
        vm.totalPages=totalPages;
        vm.showModal=showModal;
        vm.setActiveRepository = setActiveRepository;
        vm.search=search;
        vm.changeTextFormat=changeTextFormat;
        vm.tableParams=null;

        activate();
        /////////////////////////////////////////////////////////////////////////////////
        function activate() {
            vm.searchCriteria={
                rowPerPage:5,
                currentPage:0,
                totalPages:0,
                query:''
            };
            search();
        }
        function totalPages(){
            var ret=[];
            if(!vm.searchCriteria.totalPages) return 0;
            for(var i= 0;i<vm.searchCriteria.totalPages;i++){
                ret.push(i);
            }
            return ret;
        }
        function search(){
            vm.tableParams=new NgTableParams({count:vm.searchCriteria.rowPerPage}, {
                counts: [5, 10, 20],
                getData: function(params) {
                    return dataservice.getRepositories(params.page()-1,params.count(),vm.searchCriteria.query).then(function(data){
                        params.total(data.rowTotal); // recal. page nav controls
                        return data.result;
                    });
                }
            });
        }
        function setActiveRepository(repository) {
            vm.activeFormat='xml';
            dataservice.downloadRepository(repository.id)
                .then(function(response){
                    vm.activeRepository = repository;
                    vm.activeRepository.text=response;
                });

        }
        function changeTextFormat(format){
            dataservice.downloadRepository(vm.activeRepository.id,format)
                .then(function(response){
                    vm.activeRepository.text=format=='json'?JSON.stringify(response, null, 2): response;
                    vm.activeFormat=format;
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



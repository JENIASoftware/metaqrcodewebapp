
(function () {
'use strict';

angular.module('metaqrcodeApp')
    .controller('CatalogsCtrl', CatalogsCtrl);
    
    /* @ngInject */
    function CatalogsCtrl(dataservice,logger,ModalService,$rootScope,$http) {
        var vm = this;
        vm.catalogs = [];
        vm.activeCatalog=null;
        vm.newCatalog={};
        vm.userLogged=false;
        vm.searchCriteria=null;
        vm.totalPages=totalPages;

        vm.getCatalogText=getCatalogText;
        vm.setActiveCatalog = setActiveCatalog;
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
            dataservice.getCatalog(vm.searchCriteria.pageNumber,vm.searchCriteria.rowPerPage,vm.searchCriteria.query).then(function(data){
                vm.catalogs=data.result;
                vm.searchCriteria.currentPage=data.currentPageNumber;
                vm.searchCriteria.totalPages=data.pageTotal;
            });
            vm.userLogged=$rootScope.globals.currentUser;
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
            dataservice.getCatalog(page,vm.searchCriteria.rowPerPage,vm.searchCriteria.query).then(function(data){
                vm.catalogs=data.result;
                vm.searchCriteria.currentPage=data.currentPageNumber;
                vm.searchCriteria.totalPages=data.pageTotal;
                logger.info('Search result catalogs:query:['+vm.searchCriteria.query+'] totalrow['+data.rowTotal+ '] currentpage[' + data.currentPageNumber+ '] total[' +data.pageTotal+']',data.result);
            });
        }
        function setActiveCatalog(catalog) {
            vm.activeCatalog = catalog;
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
                });
            });
        }
        function getCatalogText(url){
            $http.get(url)
                .then(function(response){
                    return response.responseText;
                }).catch(function(e){
                    logger.error("Error get catalog text",e);
                })
        }
    }
})();
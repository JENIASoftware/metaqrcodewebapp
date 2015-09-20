
(function () {
'use strict';

angular.module('metaqrcodeApp')
    .controller('CatalogsCtrl', CatalogsCtrl);
    
    /* @ngInject */
    function CatalogsCtrl(dataservice,logger,ModalService) {
        var vm = this;
        vm.catalogs = [];
        vm.setActiveCatalog = setActiveCatalog;
        vm.activeCatalog;
        vm.showModal=showModal;
        vm.newCatalog={};
        activate();
        
        function activate() {
            dataservice.getCatalog().then(function(data){
                vm.catalogs=data;
                logger.info('Activated CatalogsCtrl View');
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
    }
})();
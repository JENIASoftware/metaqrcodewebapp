(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .directive('searchCatalog', searchCatalog);

    function searchCatalog(){
        var directive={
            templateUrl: 'app/searchCatalog/searchCatalog.html',
            restrict: 'E',
            link:link,
            controller:SearchCatalogCtrl,
            controllerAs:'vm',
            bindToController:true
        };

        return directive;

    }

    function link(scope, element, attrs) {

    }

    SearchCatalogCtrl.$inject=['dataservice'];
    function SearchCatalogCtrl(dataservice){
        var vm=this;
        vm.catalogs=null;
        vm.query='';
        vm.search=search;

        activate();

        function activate() {

        }

        function search(query){
            if(query) {
                dataservice.getCatalog().then(function (data) {
                    vm.catalogs = data;
                });
            }else{
                vm.catalogs=null;
            }
        }
    }
})();

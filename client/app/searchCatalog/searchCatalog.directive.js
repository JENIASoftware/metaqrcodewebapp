(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .directive('searchCatalog', searchCatalog);

    function searchCatalog(){
        var directive={
            templateUrl: 'app/searchCatalog/searchCatalog.html',
            restrict: 'E',
            scope:{},
            link:link,
            controller:SearchCatalogCtrl,
            controllerAs:'vm',
            bindToController:true
        };

        return directive;

    }

    function link(scope, element, attrs) {

    }

    SearchCatalogCtrl.$inject=['dataservice','logger'];
    function SearchCatalogCtrl(dataservice, logger){
        var vm=this;
        vm.catalogs=null;
        vm.query='';
        vm.search=search;

        activate();

        function activate() {

        }

        function search(query){
            if(query) {
                dataservice.getCatalogs(0,5,query).then(function (data) {
                    vm.catalogs = data.result;
                },function (jqXHR, textStatus, errorThrown) {
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
                	} else {
                        logger.error(textStatus + " : " + errorThrown.toLocaleString());
                	}
                });
            }else{
                vm.catalogs=null;
            }
        }
    }
})();

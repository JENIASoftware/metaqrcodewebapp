
(function () {
'use strict';

angular.module('metaqrcodeApp')
    .controller('CatalogsCtrl', CatalogsCtrl);
    
    function CatalogsCtrl(dataservice) {
        var vm = this;
        vm.catalogs = [];
        
        activate();
        
        function activate() {
            dataservice.getCatalog().then(function(data){
                vm.catalogs=data;
                //logger.info('Activated QRCode View');
            });
        }
    }
})();
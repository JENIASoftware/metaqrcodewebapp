(function () {
'use strict';

angular.module('metaqrcodeApp')
    .controller('MainCtrl', MainCtrl);
    
    function MainCtrl(dataservice) {
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

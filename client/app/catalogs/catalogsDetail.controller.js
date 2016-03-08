/**
 * Created by michele on 20/09/2015.
 */
(function(){
    'use strict';
    angular.module('metaqrcodeApp')
        .controller('CatalogsModalDetailCtrl',CatalogsModalDetailCtrl);
    CatalogsModalDetailCtrl.$inject=['$cookieStore','$scope','$element', 'title', 'activeCatalog', 'close','dataservice','logger'];
    /* @ngInject */
    function CatalogsModalDetailCtrl($cookieStore,$scope,$element, title, activeCatalog, close,dataservice,logger){
        $scope.title = title;
        $scope.activeCatalog = activeCatalog;
        //  This cancel function must use the bootstrap, 'modal' function because
        //  the doesn't have the 'data-dismiss' attribute.
        $scope.cancel = function() {

            //  Manually hide the modal.
            $element.modal('hide');

            //  Now call close, returning control to the caller.
            close({
                catalog:$scope.catalog
            }, 500); // close, but give 500ms for bootstrap to animate
        };

    }
})();
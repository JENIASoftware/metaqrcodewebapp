/**
 * Created by michele on 20/09/2015.
 */
(function(){
    'use strict';
    angular.module('metaqrcodeApp')
        .controller('CatalogsModalCtrl',CatalogsModalCtrl);
    CatalogsModalCtrl.$inject=['$scope','$element', 'title', 'close','FileUploader','dataservice','logger'];
    /* @ngInject */
    function CatalogsModalCtrl($scope,$element, title, close,FileUploader,dataservice,logger){
        $scope.catalog={};
        $scope.catalog.name = null;
        $scope.catalog.description = null;
        $scope.title = title;
        var uploader = $scope.uploader=new FileUploader({url:'api/rest/json/catalog/upload'});
        $scope.upload=function(){
            uploader.formData.push({'request':$scope.catalog});
            uploader.uploadAll();
            uploader.onCompleteItem=function(fileItem, response, status, headers){
                if(status===200){

                    close({
                        catalog:$scope.catalog
                    }, 1500);
                    $element.modal('hide');
                }
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                logger.info('onSuccessItem', fileItem, response, status, headers);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                logger.info('onErrorItem', fileItem, response, status, headers);
            };
        };
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
/**
 * Created by Michele on 24/09/2015.
 */
(function(){
    'use strict';
    angular.module('metaqrcodeApp')
        .controller('RepositoryModalCtrl',RepositoryModalCtrl);
    RepositoryModalCtrl.$inject=['$rootScope','$scope','$element', 'title', 'close','dataservice','logger','action','$stateParams','repository'];
    /* @ngInject */
    function RepositoryModalCtrl($rootScope,$scope,$element, title, close,dataservice,logger,action,$stateParams,repository){
        $scope.repository=repository || {};
        $scope.repository.defaultCatalog =repository?repository.defaultCatalog: null;
        $scope.repository.correlationId = repository?repository.correlationId: null;
        $scope.title = title;
        $scope.file=null;
        $scope.upload=function(){
            var request={
                defaultCatalog:$scope.repository.defaultCatalog,
                sessionToken:$rootScope.globals.currentUser.sessionToken,
                correlationId:$scope.repository.correlationId
            };
            if(action=="create") {

                dataservice.uploadRepository(request, $scope.file)
                    .done(success)
                    .fail(fail)
            }
            if(action=="update"){
                request.id=$stateParams.id;
                dataservice.updateRepository(request, $scope.file)
                    .done(success)
                    .fail(fail)
            }
        };
        //  This cancel function must use the bootstrap, 'modal' function because
        //  the doesn't have the 'data-dismiss' attribute.
        $scope.cancel = function() {

            //  Manually hide the modal.
            $element.modal('hide');

            //  Now call close, returning control to the caller.
            close({
                repository:$scope.repository
            }, 500); // close, but give 500ms for bootstrap to animate
        };
        function success(response){
            if (response.returnCode >= 0) {
                logger.success(response.reason);
                $element.modal('hide');
                close({
                    repository: response
                }, 500);
            } else {
                logger.error(response.reason);
            }
        }

        function fail(error){
            logger.error(error.responseText);
        }
    }
})();
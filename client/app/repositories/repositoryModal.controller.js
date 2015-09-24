/**
 * Created by Michele on 24/09/2015.
 */
(function(){
    'use strict';
    angular.module('metaqrcodeApp')
        .controller('RepositoryModalCtrl',RepositoryModalCtrl);
    RepositoryModalCtrl.$inject=['$cookieStore','$scope','$element', 'title', 'close','dataservice','logger'];
    /* @ngInject */
    function RepositoryModalCtrl($cookieStore,$scope,$element, title, close,dataservice,logger){
        $scope.repository={};
        $scope.repository.defaultCatalog = null;
        $scope.repository.correlationId = null;
        $scope.title = title;
        $scope.file=null;
        $scope.upload=function(){
            var fd = new FormData();
            var request={
                defaultCatalog:$scope.repository.defaultCatalog,
                correlationId:$scope.repository.correlationId,
                sessionToken:$cookieStore.get('globals').currentUser.sessionToken
            };
            fd.append('xml', $scope.file);
            fd.append('request', new Blob([JSON.stringify(request)]),{
                type: "application/json"
            });
            dataservice.uploadRepository(request, $scope.file)
                .done(function(response){
                    if (response.returnCode <= 0) {
                        logger.error(response.reason);
                        $element.modal('hide');
                        close({
                            repository:$scope.repository
                        }, 500);
                    } else {
                        logger.error(response.reason);
                    }
                }).fail(function(error){
                    logger.error(error);
                })
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

    }
})();
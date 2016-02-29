/**
 * Created by michele on 20/09/2015.
 */
(function(){
    'use strict';
    angular.module('metaqrcodeApp')
        .controller('CatalogsModalVoteCtrl',CatalogsModalVoteCtrl);
    CatalogsModalVoteCtrl.$inject=['$cookieStore','$scope','$element', 'title', 'activeCatalog', 'close','dataservice','logger'];
    /* @ngInject */
    function CatalogsModalVoteCtrl($cookieStore,$scope,$element, title, activeCatalog, close,dataservice,logger){
        $scope.catalog={};
    	
        $scope.catalog.id = activeCatalog.id;
        $scope.catalog.note = null;
        
        $scope.title = title;
        $scope.activeCatalog = activeCatalog;
        $scope.vote=function(){
            var request={
                id:$scope.catalog.id,
                stars:$('#stars').val(),
                note:$scope.catalog.note
            };
            dataservice.voteCatalog(request)
                .then(function(response){
                    if (response.returnCode < 0) {
                        logger.error(response.reason);
                    } else {
                        $element.modal('hide');
                        close({
                            catalog:$scope.catalog
                        }, 500);
                        logger.success(response.reason);
                    }
	            }, function (jqXHR, textStatus, errorThrown) {
	            	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
	            		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
	            	} else {
	                    logger.error(textStatus + " : " + errorThrown.toLocaleString());
	            	}
	            });
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
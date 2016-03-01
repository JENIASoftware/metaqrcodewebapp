
(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http','logger','app','exception','$rootScope','AccessToken'];
    /* @ngInject */
    function dataservice($http, logger,app,exception,$rootScope,AccessToken) {
        var service = {
            getCatalog: getCatalog,
            getCatalogs: getCatalogs,
            downloadCatalog: downloadCatalog,
            downloadRepository: downloadRepository,
            uploadCatalog: uploadCatalog,
            uploadRepository:uploadRepository,
            getRepositories:getRepositories,
            getRepository:getRepository,
            updateRepository:updateRepository,
            voteCatalog:voteCatalog
        };

        return service;
        
        function getCatalogs(pageNumber,rowPerPage,query) {
            var searchUrl=app.SERVER+"/api/rest/json/catalog/search";
            return $.ajax({
                type: "POST",
                url: searchUrl,
                data: JSON.stringify({nameLike:query,pageNumber:pageNumber,rowPerPage:rowPerPage}),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }
        
        function getCatalog(id) {
            var searchUrl=app.SERVER+"/api/rest/json/catalog/detail";
            return $.ajax({
                type: "POST",
                url: searchUrl,
                data: JSON.stringify({id:id}),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }
        
        function voteCatalog(request) {
            var voteUrl=app.SERVER+"/api/rest/json/catalog/vote";
            return $.ajax({
                type: "POST",
                url: voteUrl,
                data: JSON.stringify(request),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }
        
        function getRepositories(pageNumber,rowPerPage,catalogEntryId) {
            var request={
            	catalogEntryId:catalogEntryId,
                pageNumber:pageNumber,
                rowPerPage:rowPerPage
            };
            var searchUrl=app.SERVER+"/api/rest/json/repository/search";
            return $.ajax({
                type: "POST",
                url: searchUrl,
                data: JSON.stringify(request),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }
        
        function getRepository(id) {
            var request={
                id:id,
            };
            var detailUrl=app.SERVER+"/api/rest/json/repository/detail";
            return $.ajax({
                type: "POST",
                url: detailUrl,
                data: JSON.stringify(request),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }
        
        function downloadRepository(id,format) {
            var request={
                    id:id
                };
            if(format && format=='json'){
                return $.ajax({
                    type: "POST",
                    url: app.SERVER+"/api/rest/json/repository/downloadAsJson",
                    data: JSON.stringify(request),
                    cache: false,
                    dataType: "json",
          		    contentType: "application/json; charset=utf-8",
                    async: false,
                    beforeSend:checkBearer,
                    error: handleError
                });
            } else {
                return $.ajax({
                    type: "POST",
                    url: app.SERVER+"/api/rest/json/repository/download",
                    data: JSON.stringify(request),
                    cache: false,
          		    contentType: "application/json; charset=utf-8",
                    processData: false,
                    async: false,
                    beforeSend:checkBearer,
                    error: handleError
                });
            }
        }
        
        function downloadCatalog(id) {
            var request={
                id:id
            };
            return $.ajax({
                type: "POST",
                url: app.SERVER+"/api/rest/json/catalog/download",
                data: JSON.stringify(request),
                cache: false,
      		    contentType: "application/json; charset=utf-8",
                processData: false,
                async: false,
                beforeSend:checkBearer,
                error: handleError
            });
        }
        
        function uploadCatalog(request,file,xsd) {
            var uploadUrl=app.SERVER+"/api/rest/json/catalog/upload";
            var data = new FormData();
            data.append('request', new Blob([JSON.stringify(request)], {
                type: "application/json"
            }));
            if(file) {
                data.append('xsd', file);
            }
            if(xsd) {
                var blob = new Blob([xsd], { type: "text/xml"});
                data.append('xsd',blob);
            }
            return $.ajax({
                type: "POST",
                url: uploadUrl,
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }
        
        function uploadRepository(request,file,xml) {
            var uploadUrl = app.SERVER + "/api/rest/json/repository/upload";
            var data = new FormData();
            data.append('request', new Blob([JSON.stringify(request)], {
                type: "application/json"
            }));
            if(file) {
                data.append('xml', file);
            }
            if(xml) {
                var blob = new Blob([xml], { type: "text/xml"});
                data.append('xml',blob);
            }

            return $.ajax({
                type: "POST",
                url: uploadUrl,
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }
        
        function updateRepository(request,file) {
            var uploadUrl = app.SERVER + "/api/rest/json/repository/update";
            var data = new FormData();
            data.append('request', new Blob([JSON.stringify(request)], {
                type: "application/json"
            }));
            data.append('xml', file);
            return $.ajax({
                type: "POST",
                url: uploadUrl,
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }
        
        function checkBearer(xhr) {
        	if (AccessToken.get()!=null && AccessToken.get().access_token!=null) {
        		xhr.setRequestHeader('Authorization', 'Bearer ' + AccessToken.get().access_token)
        	}
        }
        
        function handleSuccess(response, textStatus, jqXHR) {
            if(response) {
                if (response.returnCode >= 0) {
                    return response;
                }
                else {
                    logger.error('Error code: ' + response.reason);
                    return exception.catcher(response.returnCode);
                }
            }
            return exception.catcher(response);
        }

        function handleError(jqXHR, textStatus, errorThrown) {
        	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                return exception.catcher("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
        	} else {
                return exception.catcher(textStatus + " : " + errorThrown.toLocaleString());
        	}
        }
    }
})();

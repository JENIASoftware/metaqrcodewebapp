
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
            updateRepository:updateRepository
        };

        return service;
        
        function getCatalogs(pageNumber,rowPerPage,query) {
            var searchUrl=app.SERVER+"/api/rest/json/catalog/search";
            return $http.post(searchUrl,{nameLike:query,pageNumber:pageNumber,rowPerPage:rowPerPage})
                .then(success)
                .catch(fail);
        }
        function getCatalog(id) {
            var searchUrl=app.SERVER+"/api/rest/json/catalog/search";
            return $http.post(searchUrl,{id:id})
                .then(success)
                .catch(fail);
        }
        function getRepositories(pageNumber,rowPerPage,query) {
            var request={
                correlationIdLike:query,
                pageNumber:pageNumber,
                rowPerPage:rowPerPage
            };
            var searchUrl=app.SERVER+"/api/rest/json/repository/search";
            return $http.post(searchUrl,request)
                .then(success)
                .catch(fail);
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
                processData: false,
                async: false,
                beforeSend:function(xhr){
                    xhr.setRequestHeader('Authorization', 'Bearer ' + AccessToken.get().access_token)
                }
            }).then(successAjax,fail);
        }
        function downloadRepository(id,format) {

            var url=app.SERVER+"/api/rest/json/repository/download";
            if(format && format=='json'){
                url=app.SERVER+"/api/rest/json/repository/downloadAsJson";
            }
            var request={
                id:id
            };
            return $http.post(url,request)
                .then(function(response){
                    return response.data;
                })
                .catch(fail);
        }
        function downloadCatalog(id) {
            var url=app.SERVER+"/api/rest/json/catalog/download";
            var request={
                id:id
            };
            return $http.post(url,request)
                .then(function(response){
                    return response.data;
                })
                .catch(fail);
        }
        function uploadCatalog(request,file,xml) {
            var uploadUrl=app.SERVER+"/api/rest/json/catalog/upload";
            var data = new FormData();
            data.append('request', new Blob([JSON.stringify(request)], {
                type: "application/json"
            }));
            if(file) {
                data.append('xsd', file);
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
                beforeSend:function(xhr){
                    xhr.setRequestHeader('Authorization', 'Bearer ' + AccessToken.get().access_token)
                }
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
                beforeSend:function(xhr){
                    xhr.setRequestHeader('Authorization', 'Bearer ' + AccessToken.get().access_token)
                }
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
                beforeSend:function(xhr){
                    xhr.setRequestHeader('Authorization', 'Bearer ' + AccessToken.get().access_token)
                }
            });
        }
        function success(response) {
            if(response.data) {
                if (response.data.returnCode >= 0) {
                    return response.data;
                }
                else {

                    logger.error('Error code: ' + response.data.reason);
                    return fail(response.data.returnCode);
                }
            }
            return fail(response);
        }
        function successAjax(response) {
            if(response) {
                if (response.returnCode >= 0) {
                    return response;
                }
                else {

                    logger.error('Error code: ' + response.reason);
                    return fail(response.returnCode);
                }
            }
            return fail(response);
        }

        function fail(e) {
            return exception.catcher('XHR Failed')(e);
        }
    }
})();

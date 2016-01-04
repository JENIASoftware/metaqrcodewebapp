
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
            var searchUrl=app.SERVER+":"+app.PORT+"/api/rest/json/catalog/search";
            return $http.post(searchUrl,{nameLike:query,pageNumber:pageNumber,rowPerPage:rowPerPage})
                .then(success)
                .catch(fail);
        }
        function getCatalog(id) {
            var searchUrl=app.SERVER+":"+app.PORT+"/api/rest/json/catalog/search";
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
            var searchUrl=app.SERVER+":"+app.PORT+"/api/rest/json/repository/search";
            return $http.post(searchUrl,request)
                .then(success)
                .catch(fail);
        }
        function getRepository(id) {
            var token=$rootScope.globals.currentUser.sessionToken;
            var request={
                id:id,
                sessionToken:token
            };
            var searchUrl=app.SERVER+":"+app.PORT+"/api/rest/json/repository/search";
            return $http.post(searchUrl,request)
                .then(success)
                .catch(fail);
        }
        function downloadRepository(id,format) {

            var url=app.SERVER+":"+app.PORT+"/api/rest/json/repository/download";
            if(format && format=='json'){
                url=app.SERVER+":"+app.PORT+"/api/rest/json/repository/downloadAsJson";
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
            var url=app.SERVER+":"+app.PORT+"/api/rest/json/catalog/download";
            var request={
                id:id
            };
            return $http.post(url,request)
                .then(function(response){
                    return response.data;
                })
                .catch(fail);
        }
        function uploadCatalog(request,file) {
            var uploadUrl=app.SERVER+":"+app.PORT+"/api/rest/json/catalog/upload";
            var data = new FormData();
            data.append('request', new Blob([JSON.stringify(request)], {
                type: "application/json"
            }));
            data.append('xsd',file);
            return $.ajax({
                type: "POST",
                url: uploadUrl,
                data: data,
                cache: false,
                contentType: false,
                processData: false
            });
        }
        function uploadRepository(request,file) {
            var uploadUrl = app.SERVER + ":" + app.PORT + "/api/rest/json/repository/upload";
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
        function updateRepository(request,file) {
            var uploadUrl = app.SERVER + ":" + app.PORT + "/api/rest/json/repository/update";
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
            if (response.data.returnCode >= 0) {
                return response.data;
            }
            else {

                logger.error('Error code: ' + response.data.reason);
                return fail(response.data.returnCode);
            }
        }

        function fail(e) {
            return exception.catcher('XHR Failed')(e);
        }
    }
})();

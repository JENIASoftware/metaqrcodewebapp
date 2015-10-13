
(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http','logger','app','exception','$rootScope'];
    /* @ngInject */
    function dataservice($http, logger,app,exception,$rootScope) {
        var service = {
            getCatalog: getCatalog,
            downloadCatalog: downloadCatalog,
            downloadRepository: downloadRepository,
            uploadCatalog: uploadCatalog,
            uploadRepository:uploadRepository,
            getRepositories:getRepositories
        };

        return service;
        
        function getCatalog(pageNumber,rowPerPage,query) {
            var searchUrl=app.SERVER+":"+app.PORT+"/api/rest/json/catalog/search";
            return $http.post(searchUrl,{nameLike:query,pageNumber:pageNumber,rowPerPage:rowPerPage,onlyMine:true})
                .then(success)
                .catch(fail);

            function success(response) {
                if (response.data.returnCode >= 0) {
                    return response.data;
                }
               else { logger.error('Failed load catalog with code: ' + response.data.returnCode);}
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getCatalog')(e);
            }
        }
        function getRepositories(pageNumber,rowPerPage,query) {
            var token=$rootScope.globals.currentUser.sessionToken;
            var request={
                correlationIdLike:query,
                sessionToken:token,
                pageNumber:pageNumber,
                rowPerPage:rowPerPage
            };
            var searchUrl=app.SERVER+":"+app.PORT+"/api/rest/json/repository/search";
            return $http.post(searchUrl,request)
                .then(success)
                .catch(fail);

            function success(response) {
                if (response.data.returnCode >= 0) {
                    return response.data;
                }
                else { logger.error('Failed load repository with code: ' + response.data.returnCode);}
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getRepositories')(e);
            }
        }
        function downloadRepository(id) {
            var url=app.SERVER+":"+app.PORT+"/api/rest/json/repository/download";
            var request={
                id:id
            };
            return $http.post(url,request)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
               // else { logger.error('Failed load catalog with code: ' + response.data.returnCode);}
            }

            function fail(e) {
                return exception.catcher('XHR Failed for downloadRepository')(e);
            }
        }
        function downloadCatalog(id) {
            var url=app.SERVER+":"+app.PORT+"/api/rest/json/catalog/download";
            var request={
                id:id
            };
            return $http.post(url,request)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
                // else { logger.error('Failed load catalog with code: ' + response.data.returnCode);}
            }

            function fail(e) {
                return exception.catcher('XHR Failed for downloadCatalog')(e);
            }
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
                processData: false
            });
        }
    }
})();

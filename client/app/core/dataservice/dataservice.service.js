
(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q','logger','app','exception'];
    /* @ngInject */
    function dataservice($http, $q,logger,app,exception) {
        var service = {
            getCatalog: getCatalog,
            download: download,
            uploadCatalog: uploadCatalog,
            uploadRepository:uploadRepository,
            getRepositories:getRepositories
        };

        return service;
        
        function getCatalog() {
            var searchUrl=app.SERVER+":"+app.PORT+"/api/rest/json/catalog/search";
            return $http.post(searchUrl,{nameLike:'e',descriptionLike:''})
                .then(success)
                .catch(fail);

            function success(response) {
                if (response.data.returnCode >= 0) {
                    return response.data.result;
                }
               else { logger.error('Failed load catalog with code: ' + response.data.returnCode);}
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getCatalog')(e);
            }
        }
        function getRepositories(correlationIdLike) {
            var searchUrl=app.SERVER+":"+app.PORT+"/api/rest/json/repository/search";
            return $http.post(searchUrl,{correlationIdLike:'e'})
                .then(success)
                .catch(fail);

            function success(response) {
                if (response.data.returnCode >= 0) {
                    return response.data.result;
                }
                else { logger.error('Failed load catalog with code: ' + response.data.returnCode);}
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getCatalog')(e);
            }
        }
        function download(id) {
            return $http.get('/file/download')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
               // else { logger.error('Failed load catalog with code: ' + response.data.returnCode);}
            }

            function fail(e) {
                //return exception.catcher('XHR Failed for getCatalog')(e);
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
            data.append('xsd', file);
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

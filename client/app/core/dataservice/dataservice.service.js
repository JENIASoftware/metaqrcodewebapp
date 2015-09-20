
(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q','logger'];
    /* @ngInject */
    function dataservice($http, $q,logger) {
        var service = {
            getCatalog: getCatalog,
            download: download,
            uploadCatalog: uploadCatalog
        };

        return service;
        
        function getCatalog() {
            return $http.get('/api/rest/json/catalog')
                .then(success)
                .catch(fail);

            function success(response) {
                if (response.data.returnCode >= 0) {
                    return response.data.result;
                }
               else { logger.error('Failed load catalog with code: ' + response.data.returnCode);}
            }

            function fail(e) {
                //return exception.catcher('XHR Failed for getCatalog')(e);
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
        
        function uploadCatalog(uploader,catalog) {
            uploader.url='api/rest/json/catalog/upload';
            uploader.formData.push({'request':catalog});
            uploader.uploadAll();
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                logger.info('onSuccessItem', fileItem, response, status, headers);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                logger.info('onErrorItem', fileItem, response, status, headers);
            };

        }
    }
})();

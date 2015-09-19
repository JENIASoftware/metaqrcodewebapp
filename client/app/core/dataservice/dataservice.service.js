
(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q'];
    /* @ngInject */
    function dataservice($http, $q) {
        var service = {
            getCatalog: getCatalog,
            download: download,
            upload: upload
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
               // else { logger.error('Failed load catalog with code: ' + response.data.returnCode);}
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
        
        function upload(catalog) {
             return $http.post('/api/catalogs',catalog)
                .then(success)
                .catch(fail);

            function success(response) {
                if (response.data.returnCode >= 0) {
                    return response.data.results;
                }
               // else { logger.error('Failed load catalog with code: ' + response.data.returnCode);}
            }

            function fail(e) {
                //return exception.catcher('XHR Failed for getCatalog')(e);
            }
        }
    }
})();

(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .factory('localize',localize);

    localize.$inject=['$http', '$rootScope', '$window', '$filter'];
    function localize($http, $rootScope, $window, $filter){

        var service={
            // use the $window service to get the language of the user's browser
            language:'',
            // array to hold the localized resource string entries
            dictionary:[],
            // location of the resource file
            url: undefined,
            // flag to indicate if the service hs loaded the resource file
            resourceFileLoaded:false,

            // success handler for all server communication
            successCallback:function (data) {
                // store the returned array in the dictionary
                service.dictionary = data.data;
                // set the flag that the resource are loaded
                service.resourceFileLoaded = true;
                // broadcast that the file has been loaded
                $rootScope.$broadcast('localizeResourcesUpdated');
            },

            // allows setting of language on the fly
            setLanguage: function(value) {
                service.language = value;
                service.initLocalizedResources();
            },

            // allows setting of resource url on the fly
            setUrl: function(value) {
                service.url = value;
                service.initLocalizedResources();
            },

            // builds the url for locating the resource file
            buildUrl: function() {
                if(!service.language){
                    var lang="en";
                    service.language = lang;
                }
                return '/i18n/resources-locale_' + service.language + '.js';
            },

            // loads the language resource file from the server
            initLocalizedResources:function () {
                // build the url to retrieve the localized resource file
                var url = service.url || service.buildUrl();
                // request the resource file
                $http({ method:"GET", url:url, cache:false }).
                    then(service.successCallback,function () {
                    // the request failed set the url to the default resource file
                    var url = '/i18n/resources-en.js';
                    // request the default resource file
                    $http({ method:"GET", url:url, cache:false }).then(service.successCallback);
                });
            },

            // checks the dictionary for a localized resource string
            getLocalizedString: function(value) {
                // default the result to an empty string
                var result = '';

                // make sure the dictionary has valid data
                if ((service.dictionary !== []) && (service.dictionary.length > 0)) {
                    // use the filter service to only return those entries which match the value
                    // and only take the first result
                    var entry = $filter('filter')(service.dictionary, function(element) {
                            return element.key === value;
                        }
                    )[0];

                    // set the result
                    result =entry? entry.value:'';
                }
                // return the value to the call
                return result;
            }
        };
service.initLocalizedResources();
        return service;
    }
})();

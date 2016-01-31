(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .filter('i18n', i18n);

    i18n.$inject=['localize'];
    function i18n(localize){
        return function (input) {
            return localize.getLocalizedString(input);
        };
    }
})();

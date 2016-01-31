(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .directive('fileInput',fileInput);
fileInput.$inject=['$parse'];
    function fileInput($parse) {
        return {
            templateUrl: 'components/fileInput/fileInput.html',
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.file);
                var modelSetter = model.assign;
                element.find("input[type=file]").attr('accept',attrs.filter);
                element.on('change',function(){
                    var fileInput=element.find("input[type=file]");
                    element.find('input[type=text]').val(fileInput.val());
                    scope.$apply(function(){
                        if (attrs.multiple) {
                            modelSetter(scope, fileInput[0].files);
                        }
                        else {
                            modelSetter(scope, fileInput[0].files[0]);
                        }
                    });
                });
            }
        };
    };
})();

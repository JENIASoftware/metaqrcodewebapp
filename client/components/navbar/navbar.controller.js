'use strict';

angular.module('metaqrcodeApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'icon':'home'
    },
    {
      'title': 'Catalogs',
      'link': '/catalogs',
      'icon':'file-code-o'
    },
    {
      'title': 'Upload',
      'link': '/upload',
      'icon':'upload'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
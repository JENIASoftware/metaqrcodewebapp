'use strict';

describe('Controller: ComingCtrl', function () {

  // load the controller's module
  beforeEach(module('metaqrcodeApp'));

  var ComingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComingCtrl = $controller('ComingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});

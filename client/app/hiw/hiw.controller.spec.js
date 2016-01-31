'use strict';

describe('Controller: HiwCtrl', function () {

  // load the controller's module
  beforeEach(module('metaqrcodeApp'));

  var HiwCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HiwCtrl = $controller('HiwCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

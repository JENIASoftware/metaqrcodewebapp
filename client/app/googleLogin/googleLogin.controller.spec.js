'use strict';

describe('Controller: GoogleLoginCtrl', function () {

  // load the controller's module
  beforeEach(module('metaqrcodeApp'));

  var GoogleLoginCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GoogleLoginCtrl = $controller('GoogleLoginCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

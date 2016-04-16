'use strict';

describe('Controller: TermsConditionsCtrl', function () {

  // load the controller's module
  beforeEach(module('metaqrcodeApp'));

  var TermsConditionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TermsConditionsCtrl = $controller('TermsConditionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

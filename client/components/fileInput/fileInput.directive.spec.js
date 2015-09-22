'use strict';

describe('Directive: fileInput', function () {

  // load the directive's module and view
  beforeEach(module('metaqrcodeApp'));
  beforeEach(module('components/fileInput/fileInput.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<file-input></file-input>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the fileInput directive');
  }));
});
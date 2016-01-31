'use strict';

describe('Directive: i18nAttr', function () {

  // load the directive's module
  beforeEach(module('metaqrcodeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<i18n-attr></i18n-attr>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the i18nAttr directive');
  }));
});
'use strict';

describe('Directive: searchCatalog', function () {

  // load the directive's module and view
  beforeEach(module('metaqrcodeApp'));
  beforeEach(module('app/searchCatalog/searchCatalog.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<search-catalog></search-catalog>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the searchCatalog directive');
  }));
});
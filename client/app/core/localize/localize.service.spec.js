'use strict';

describe('Service: localize', function () {

  // load the service's module
  beforeEach(module('metaqrcodeApp'));

  // instantiate service
  var localize;
  beforeEach(inject(function (_localize_) {
    localize = _localize_;
  }));

  it('should do something', function () {
    expect(!!localize).toBe(true);
  });

});

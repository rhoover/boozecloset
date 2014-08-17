'use strict';

describe('Service: resolvefactory', function () {

  // load the service's module
  beforeEach(module('boozeApp'));

  // instantiate service
  var resolvefactory;
  beforeEach(inject(function (_resolvefactory_) {
    resolvefactory = _resolvefactory_;
  }));

  it('should do something', function () {
    expect(!!resolvefactory).toBe(true);
  });

});

'use strict';

describe('Service: storagefactory', function () {

  // load the service's module
  beforeEach(module('boozeApp'));

  // instantiate service
  var storagefactory;
  beforeEach(inject(function (_storagefactory_) {
    storagefactory = _storagefactory_;
  }));

  it('should do something', function () {
    expect(!!storagefactory).toBe(true);
  });

});

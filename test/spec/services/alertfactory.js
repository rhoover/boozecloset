'use strict';

describe('Service: alertfactory', function () {

  // load the service's module
  beforeEach(module('boozeApp'));

  // instantiate service
  var alertfactory;
  beforeEach(inject(function (_alertfactory_) {
    alertfactory = _alertfactory_;
  }));

  it('should do something', function () {
    expect(!!alertfactory).toBe(true);
  });

});

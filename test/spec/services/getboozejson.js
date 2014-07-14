'use strict';

describe('Service: getboozejson', function () {

  // load the service's module
  beforeEach(module('boozeApp'));

  // instantiate service
  var getboozejson;
  beforeEach(inject(function (_getboozejson_) {
    getboozejson = _getboozejson_;
  }));

  it('should do something', function () {
    expect(!!getboozejson).toBe(true);
  });

});

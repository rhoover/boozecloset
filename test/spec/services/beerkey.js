'use strict';

describe('Service: beerkey', function () {

  // load the service's module
  beforeEach(module('boozeApp'));

  // instantiate service
  var beerkey;
  beforeEach(inject(function (_beerkey_) {
    beerkey = _beerkey_;
  }));

  it('should do something', function () {
    expect(!!beerkey).toBe(true);
  });

});

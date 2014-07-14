'use strict';

describe('Service: whiskeykey', function () {

  // load the service's module
  beforeEach(module('boozeApp'));

  // instantiate service
  var whiskeykey;
  beforeEach(inject(function (_whiskeykey_) {
    whiskeykey = _whiskeykey_;
  }));

  it('should do something', function () {
    expect(!!whiskeykey).toBe(true);
  });

});

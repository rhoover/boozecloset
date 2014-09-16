'use strict';

describe('Service: storagekey', function () {

  // load the service's module
  beforeEach(module('boozeApp'));

  // instantiate service
  var storagekey;
  beforeEach(inject(function (_storagekey_) {
    storagekey = _storagekey_;
  }));

  it('should do something', function () {
    expect(!!storagekey).toBe(true);
  });

});

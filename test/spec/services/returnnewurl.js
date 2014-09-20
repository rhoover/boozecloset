'use strict';

describe('Service: returnnewurl', function () {

  // load the service's module
  beforeEach(module('boozeApp'));

  // instantiate service
  var returnnewurl;
  beforeEach(inject(function (_returnnewurl_) {
    returnnewurl = _returnnewurl_;
  }));

  it('should do something', function () {
    expect(!!returnnewurl).toBe(true);
  });

});

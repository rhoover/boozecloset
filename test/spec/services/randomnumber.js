'use strict';

describe('Service: randomnumber', function () {

  // load the service's module
  beforeEach(module('boozeApp'));

  // instantiate service
  var randomnumber;
  beforeEach(inject(function (_randomnumber_) {
    randomnumber = _randomnumber_;
  }));

  it('should do something', function () {
    expect(!!randomnumber).toBe(true);
  });

});

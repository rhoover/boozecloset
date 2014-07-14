'use strict';

describe('Filter: listfilter', function () {

  // load the filter's module
  beforeEach(module('boozeApp'));

  // initialize a new instance of the filter before each test
  var listfilter;
  beforeEach(inject(function ($filter) {
    listfilter = $filter('listfilter');
  }));

  it('should return the input prefixed with "listfilter filter:"', function () {
    var text = 'angularjs';
    expect(listfilter(text)).toBe('listfilter filter: ' + text);
  });

});

'use strict';

describe('Directive: navButton', function () {

  // load the directive's module
  beforeEach(module('boozeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<nav-button></nav-button>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the navButton directive');
  }));
});

'use strict';

describe('Directive: beerinput', function () {

  // load the directive's module
  beforeEach(module('boozeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<beerinput></beerinput>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the beerinput directive');
  }));
});

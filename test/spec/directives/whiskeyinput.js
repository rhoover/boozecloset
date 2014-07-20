'use strict';

describe('Directive: whiskeyinput', function () {

  // load the directive's module
  beforeEach(module('boozeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<whiskeyinput></whiskeyinput>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the whiskeyinput directive');
  }));
});

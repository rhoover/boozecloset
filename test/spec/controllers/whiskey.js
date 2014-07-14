'use strict';

describe('Controller: WhiskeyCtrl', function () {

  // load the controller's module
  beforeEach(module('boozeApp'));

  var WhiskeyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WhiskeyCtrl = $controller('WhiskeyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

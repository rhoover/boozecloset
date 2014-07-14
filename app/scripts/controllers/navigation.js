'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the boozeApp
 */
angular.module('boozeApp')
    .controller('NavCtrl', function ($scope, $location) {
        $scope.isActive = function (route) {
            return route === $location.path();
        };
  });

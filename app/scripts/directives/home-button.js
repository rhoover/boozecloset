'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:homeButton
 * @description
 * # homeButton
 */

angular
    .module('boozeApp')
    .directive('homeButton', function ($location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    scope.$apply(function () {
                        $location.path(attrs.homeButton);
                    });
                });
            }
        };
    });

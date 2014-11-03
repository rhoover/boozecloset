'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:navButton
 * @description
 * # navButton
 */

angular
    .module('boozeApp')
    .directive('navButton', function ($location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    scope.$apply(function () {
                        $location.path(attrs.navButton);
                    });
                });
            }
        };
    });

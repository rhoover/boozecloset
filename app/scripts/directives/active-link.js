'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:activeLink
 * @description
 * # activeLink
 * Courtesy: http://www.jacopretorius.net/2014/09/using-custom-directives-in-angularjs.html
 * See Also for cases where there might be variables in link: http://stackoverflow.com/questions/12295983/set-active-tab-style-with-angularjs
 */

angular
    .module('boozeApp')
    .directive('activeLink', function ($location) {
        return {
            restrict: 'A',
            scope: {path: "@activeLink"},
            link: function (scope, element, attrs) {
                scope.$on('$locationChangeSuccess', function () {
                    if ($location.path() === scope.path) {
                        element.addClass('navActive');
                    } else {
                        element.removeClass('navActive');
                    }
                });
            }
        };
    });

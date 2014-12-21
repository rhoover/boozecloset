'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:activeTab
 * @description
 * # activeTab
 */

angular
    .module('boozeApp')
    .directive('activeTab', function ($location) {
        return {
            restrict: 'A',
            scope: {path: '@navButton'},
            link: function (scope, element) {
                scope.$on('$locationChangeSuccess', function () {
                    if ($location.path() === scope.path) {
                        element.addClass('tab-active');
                    } else {
                        element.removeClass('tab-active');
                    }
                });
            }
        };
    });

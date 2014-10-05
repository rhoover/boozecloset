'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:backButton
 * @description
 * # backButton
 */

angular
    .module('boozeApp')
    .directive('backButton', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                function goBack() {
                    history.back();
                    scope.$apply();
                }
                element.bind('click', goBack);
            }
        };
    });

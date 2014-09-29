'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:beerinput
 * @description
 * # beerinput
 */

angular
    .module('boozeApp')
    .directive('beerInput', function () {
        return {
            templateUrl: 'views/beerinputform.html',
            restrict: 'A',
            replace: true //WARNING: Angular is threatening to deprecate this prop. in next major release
            // link: function (scope, element, attrs) {
            //     element.text('this is the beerinput directive');
            // }
        };
    });

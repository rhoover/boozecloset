'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:whiskeyinput
 * @description
 * # whiskeyinput
 */

angular.module('boozeApp')
    .directive('whiskeyInput', function () {
        return {
            templateUrl: 'views/whiskeyinputform.html',
            restrict: 'A',
            replace: true //WARNING: Angular is threatening to deprecate this prop. in next major release
            // link: function postLink(scope, element, attrs) {
            //     element.text('this is the whiskeyinput directive');
            // }
        };
    });

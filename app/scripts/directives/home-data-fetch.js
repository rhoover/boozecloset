'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:homeDataFetch
 * @description
 * # homeDataFetch
 */

angular
    .module('boozeApp')
    .directive('homeDataFetch', function ($timeout, resolveFactory) {
        return {

            restrict: 'A',

            link: function () {
                $timeout(function(){
                    resolveFactory.boozeResolve();
                }, 3000);
            }
        };
    });

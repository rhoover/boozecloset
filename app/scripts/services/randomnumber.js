'use strict';

/**
 * @ngdoc service
 * @name boozeApp.randomnumber
 * @description
 * # randomnumber
 * Factory in the boozeApp.
 */

angular.module('boozeApp')
    .factory('randomnumber', function () {

        return {
            randomid: function () {
                //Courtesy: http://stackoverflow.com/a/1527834
                var min = 100000;
                var max = 200000;
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        };
    });

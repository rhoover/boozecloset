'use strict';

/**
 * @ngdoc service
 * @name boozeApp.randomnumber
 * @description
 * # randomnumber
 * Factory in the boozeApp.
 */

angular
    .module('boozeApp')
    .factory('randomnumber', function () {

        return {
            randomid: function () {
                //Courtesy: http://stackoverflow.com/a/1527834
                // var min = 100000;
                // var max = 200000;
                var stringMe = Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000;
                return stringMe.toString();
            }
        };
    });

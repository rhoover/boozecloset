'use strict';

/**
 * @ngdoc service
 * @name boozeApp.getboozejson
 * @description
 * # getboozejson
 * Factory in the boozeApp.
 */

angular.module('boozeApp')
    .factory('getBoozeFactory', function ($http) {

        return {
            getBoozeData: function () {

                return $http.get('data/booze.json', {cache:false})
                    .then(function (result) {
                        return result.data;
                    });
            }
        };
    });

'use strict';

/**
 * @ngdoc service
 * @name boozeApp.getboozejson
 * @description
 * # getboozejson
 * Factory in the boozeApp.
 */

angular.module('boozeApp')
    .factory('getBoozeFactory', function ($http, $q) {

        return {
            getBoozeData: function () {

                var serviceUrl = 'data/booze.json';

                return $http.get(serviceUrl)
                    .then(function (result) {
                        return result.data;
                    });
            }
        };
    });

'use strict';

/**
 * @ngdoc service
 * @name boozeApp.getboozejson
 * @description
 * # getboozejson
 * Factory in the boozeApp.
 */

angular.module('boozeApp')
    .factory('getboozejson', function ($http) {

        return {
            getBoozeData: function () {

                var serviceUrl = 'data/booze.json';

                return $http.get(serviceUrl)

                .success(function (data) {
                    return data;
                });

            }
        };
    });

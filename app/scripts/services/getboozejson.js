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
                var boozeData = [];

                return $http.get(serviceUrl)
                    .success(function (data) {
                        boozeData = data;
                        return boozeData;
                    })
                    .error(function () {
                        alert('That\'s right Dude, they pee\'d on your fucking rug');
                    });
            }
        };
    });

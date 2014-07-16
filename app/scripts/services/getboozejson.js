'use strict';

/**
 * @ngdoc service
 * @name boozeApp.getboozejson
 * @description
 * # getboozejson
 * Factory in the boozeApp.
 */

angular.module('boozeApp')
    .factory('getboozejson', function getboozejson ($http) {

        return {
            getBoozeData: function () {

                var serviceUrl = 'data/booze.json';

                return $http.get(serviceUrl)

                //resolve everything here in the factory thanks to: http://toddmotto.com/rethinking-angular-js-controllers
                .success(function (data) {

                    var boozeData = data;
                    return boozeData;
                })
                .error(function () {
                    alert('That\'s right Dude, they pee\'d on your fucking rug');
                });

            }
        };
    });

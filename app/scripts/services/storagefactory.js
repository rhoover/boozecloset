'use strict';

/**
 * @ngdoc service
 * @name boozeApp.storagefactory
 * @description
 * # storagefactory
 * Factory in the boozeApp.
 */

angular.module('boozeApp')
    .factory('storageFactory', function ($http) {

        // Public API here
        return {
            getBooze: function (key) {
                var jsonFile = sessionStorage.getItem(key);
                var parsedJsonFile = angular.fromJson(jsonFile);
                return parsedJsonFile;
            },
            storeGetBooze: function (key, retrievedData) {
                var storeMe = angular.toJson(retrievedData);
                sessionStorage.setItem(key, storeMe);
            },
            storeBoozeLocal: function (key, oldData, newData) {
                var joinedData = oldData.concat(newData); //concat-ing two arrays of object literals: json on record and boozeForm[]
                var parsedJoinedData = angular.toJson(joinedData);
                sessionStorage.setItem(key, parsedJoinedData);
            },
            saveBoozeRemote: function (key, oldData, newData) {
                var joinedData = oldData.concat(newData); //concat-ing two arrays of object literals: json on record and boozeForm[]
                var parsedJoinedData = angular.toJson(joinedData);

            }
            //Leaving these here just in case.......
            // removeBooze: function (key) {
            //     sessionStorage.removeItem(key);
            // },
            // clearAll: function () {
            //     sessionStorage.clear();
            // }
        };
    });

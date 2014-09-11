'use strict';

/**
 * @ngdoc service
 * @name boozeApp.storagefactory
 * @description
 * # storagefactory
 * Factory in the boozeApp.
 */

angular.module('boozeApp')
    .factory('storageFactory', function () {

        // Public API here
        return {
            getBoozeData: function (key) {
                return angular.fromJson(sessionStorage.getItem(key));
            },
            storeGetBoozeData: function (key, retrievedData) {
                sessionStorage.setItem(key, angular.toJson(retrievedData));
            },
            storeBoozeLocal: function (key, oldData, newData) {
                sessionStorage.setItem(key, angular.toJson(oldData.concat(newData)));
            },
            storeBoozeRemote: function (key, oldData, newData) {
                // var joinedData = oldData.concat(newData); //concat-ing two arrays of object literals: json on record and boozeForm[]
                // var parsedJoinedData = angular.toJson(joinedData);

            },
            updateBoozeLocal: function (key, originalCloset, newObject) {
                for (var i = 0; i < originalCloset.length; i++) {
                    if (newObject.id === originalCloset[i].id) {
                        originalCloset[i] = newObject;
                        sessionStorage.setItem(key, angular.toJson(originalCloset));
                    }
                };
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

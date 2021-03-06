'use strict';

/**
 * @ngdoc service
 * @name boozeApp.storagefactory
 * @description
 * # storagefactory
 * Factory in the boozeApp.
 */

angular
    .module('boozeApp')
    .factory('storageFactory', function ($http) {

        return {
            getBoozeData: function (key) {
                return angular.fromJson(sessionStorage.getItem(key));
            },
            storeGetBoozeData: function (key, retrievedData) {
                sessionStorage.setItem(key, angular.toJson(retrievedData));
            },
            addToBoozeLocal: function (key, oldData, newData) {
                oldData.push(newData); // necessary because push() returns the new array length, but we want instead the new array
                sessionStorage.setItem(key, angular.toJson(oldData));
            },
            storeBoozeRemote: function (key, data) {
                $http.post('jsonsave.php', sessionStorage.getItem(key))
                    .success(function (data, status, headers, config) {
                        console.log(status, data);
                    })
                    .error(function (data, status, headers, config) {
                        console.log(status, data);
                    });

            },
            updateBoozeLocal: function (key, originalCloset, newObject) {
                for (var i = 0; i < originalCloset.length; i++) {
                    if (newObject.id === originalCloset[i].id) {
                        originalCloset[i] = newObject;
                        sessionStorage.setItem(key, angular.toJson(originalCloset));
                    }
                }
            },
            removeBoozeItem: function (key, originalCloset, boozeObject) {
                for (var i = 0; i < originalCloset.length; i++) {
                    if (boozeObject.id === originalCloset[i].id) {
                        originalCloset.splice(i, 1);
                        sessionStorage.setItem(key, angular.toJson(originalCloset));
                    }
                }
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

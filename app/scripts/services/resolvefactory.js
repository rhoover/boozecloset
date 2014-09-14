'use strict';

/**
 * @ngdoc service
 * @name boozeApp.resolveFactory
 * @description
 * # resolveFactory
 * Factory in the boozeApp.
 */

angular
    .module('boozeApp')
    .factory('resolveFactory', function ($window, storageFactory, getBoozeFactory) {

        return {

            boozeResolve: function () {
                if (storageFactory.getBoozeData('booze-data-cache') !== null) {
                    return;
                } else {
                    var elseReturn = getBoozeFactory.getBoozeData()
                        .then(function (data) {
                            storageFactory.storeGetBoozeData('booze-data-cache', data);
                        },
                        function () {
                            $window.alert('They Peed on Your Fucking Rug Dude');
                        });
                    return elseReturn;
                }
            }
        };
    });

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
    .factory('resolveFactory', function ($window, storageFactory, getBoozeFactory, storagekey) {

        return {

            boozeResolve: function () {
                if (storageFactory.getBoozeData(storagekey) !== null) {
                    return;
                } else {
                    var elseReturn = getBoozeFactory.getBoozeData()
                        .then(function (data) {
                            storageFactory.storeGetBoozeData(storagekey, data);
                        },
                        function () {
                            $window.alert('They Peed on Your Fucking Rug Dude');
                        });
                    return elseReturn;
                }
            }
        };
    });

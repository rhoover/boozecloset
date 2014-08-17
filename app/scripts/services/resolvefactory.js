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
    .factory('resolveFactory', function (storageFactory, getBoozeFactory) {

        return {

            boozeResolve: function () {
                var checking = storageFactory.getBoozeData('booze-data-cache');
                if (checking !== null) {
                    return;
                } else {
                    var elseReturn = getBoozeFactory.getBoozeData()
                        .then(function (data) {
                            storageFactory.storeGetBoozeData('booze-data-cache', data);
                        });
                        return elseReturn;
                };
            }
        };
    });

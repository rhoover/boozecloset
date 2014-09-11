'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the boozeApp
 */

angular
    .module('boozeApp')
    .controller('DetailCtrl', function ($scope, $routeParams, storageFactory, listdataFilter) {

        $scope.boozeItem = listdataFilter.singleBooze(storageFactory.getBoozeData('booze-data-cache'), $routeParams.id);

        $scope.boozeItem.upDate = function () {

            var all = storageFactory.getBoozeData('booze-data-cache');
            var boozeObjectNew = {
                    id: $scope.boozeItem.id,
                    type: $scope.boozeItem.type,
                    purchasedfrom: $scope.boozeItem.purchasedfrom,
                    purchasedon: $scope.boozeItem.purchasedon,
                    price: $scope.boozeItem.price,
                    name: $scope.boozeItem.name,
                    company: $scope.boozeItem.company,
                    status: $scope.boozeItem.status
            };

            storageFactory.updateBoozeLocal('booze-data-cache', all, boozeObjectNew);
            alert('Your New Booze:  ' + $scope.boozeItem.name + '\n\nFrom:  ' + $scope.boozeItem.company + '\n\nHas Been Updated!!\n\n Locally For Now');
        };

    });

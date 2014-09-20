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
    .controller('DetailCtrl', function ($scope, $routeParams, $location, $window, storageFactory, listdataFilter, newUrlFactory, alertFactory, storagekey) {

        $scope.boozeItem = listdataFilter.singleBooze(storageFactory.getBoozeData(storagekey), $routeParams.id); //aka: (input, arg)
        var boozeItem = $scope.boozeItem;

        $scope.boozeItem.upDate = function () {

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

            storageFactory.updateBoozeLocal(storagekey, storageFactory.getBoozeData(storagekey), boozeObjectNew); //aka: (key, originalCloset, newObject)
            storageFactory.storeBoozeRemote(storagekey, storageFactory.getBoozeData(storagekey)); //aka (key, data)

            alertFactory.updateAlert($scope.boozeItem.name, $scope.boozeItem.company);

            newUrlFactory.newUrl(boozeItem.type);

        }; // end upDate

        $scope.removeItem = function () {
            storageFactory.removeBoozeItem(storagekey, storageFactory.getBoozeData(storagekey), boozeItem);//aka: (key, originalCloset, newObject)
            storageFactory.storeBoozeRemote(storagekey, storageFactory.getBoozeData(storagekey)); //aka (key, data)

            alertFactory.removeAlert($scope.boozeItem.name, $scope.boozeItem.company);

            newUrlFactory.newUrl(boozeItem.type);

        }; //end removeItem

    });

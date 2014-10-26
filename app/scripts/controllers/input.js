'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:InputCtrl
 * @description
 * # InputCtrl
 * Controller of the boozeApp
 */

angular
    .module('boozeApp')
    .controller('InputCtrl', function ($scope, $location, $window, storagekey, randomnumber, storageFactory, alertFactory, newUrlFactory) {

        $scope.boozeForm = [];

        $scope.boozeType = function (key) {
            $scope.boozeForm.type = key;
        };

        $scope.boozeForm.saveBooze = function () {

            var boozeDataNew = {
                    id: randomnumber.randomid(),
                    type: $scope.boozeForm.type,
                    purchasedfrom: $scope.boozeForm.purchasedfrom,
                    purchasedon: $scope.boozeForm.purchasedon,
                    price: $scope.boozeForm.price,
                    name: $scope.boozeForm.name,
                    company: $scope.boozeForm.company,
                    status: $scope.boozeForm.status
                };

            storageFactory.addToBoozeLocal(storagekey, storageFactory.getBoozeData(storagekey), boozeDataNew); //aka: (key, oldData, NewData)
            storageFactory.storeBoozeRemote(storagekey, storageFactory.getBoozeData(storagekey)); //aka (key, data)

            alertFactory.addAlert($scope.boozeForm.name, $scope.boozeForm.company);

            newUrlFactory.newUrl($scope.boozeForm.type);

        }; //end saveBooze
  });

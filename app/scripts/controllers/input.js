'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:InputCtrl
 * @description
 * # InputCtrl
 * Controller of the boozeApp
 */

angular.module('boozeApp')
  .controller('InputCtrl', function ($scope, beerkey, whiskeykey, randomnumber, storageFactory) {

        $scope.boozeForm = [];

        $scope.beerVisible = false;
        $scope.whiskeyVisible = false;

        $scope.beerToggle = function () {
            $scope.beerVisible = true;
            $scope.whiskeyVisible = false;
            $scope.boozeForm.type = beerkey;
        };

        $scope.whiskeyToggle = function () {
            $scope.beerVisible = false;
            $scope.whiskeyVisible = true;
            $scope.boozeForm.type = whiskeykey;
        };

        $scope.boozeForm.saveBooze = function () {

            var randomId = randomnumber.randomid();

            var boozeDataNew = [
                {
                    id: randomId,
                    type: $scope.boozeForm.type,
                    purchasedfrom: $scope.boozeForm.purchasedfrom,
                    purchasedon: $scope.boozeForm.purchasedon,
                    price: $scope.boozeForm.price,
                    name: $scope.boozeForm.name,
                    company: $scope.boozeForm.company,
                    status: $scope.boozeForm.status
                }
            ];

            var boozeDataOld = storageFactory.getBoozeData('booze-data-cache');

            storageFactory.storeBoozeLocal('booze-data-cache', boozeDataOld, boozeDataNew);
            storageFactory.saveBoozeRemote('booze-data-cache', boozeDataOld, boozeDataNew);
            alert('Your New Booze:  ' + $scope.boozeForm.name + '\n\nFrom:  ' + $scope.boozeForm.company + '\n\nHas Been Added!!\n\n Locally For Now');
        };
  });

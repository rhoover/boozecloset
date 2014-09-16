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
    .controller('InputCtrl', function ($scope, $location, $window, beerkey, whiskeykey, storagekey, randomnumber, storageFactory) {

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

            // var randomId = randomnumber.randomid();

            var boozeDataNew = [
                {
                    // id: randomId,
                    id: randomnumber.randomid(),
                    type: $scope.boozeForm.type,
                    purchasedfrom: $scope.boozeForm.purchasedfrom,
                    purchasedon: $scope.boozeForm.purchasedon,
                    price: $scope.boozeForm.price,
                    name: $scope.boozeForm.name,
                    company: $scope.boozeForm.company,
                    status: $scope.boozeForm.status
                }
            ];

            storageFactory.storeBoozeLocal(storagekey, storageFactory.getBoozeData(storagekey), boozeDataNew); //aka: (key, oldData, NewData)
            storageFactory.storeBoozeRemote(storagekey, storageFactory.getBoozeData(storagekey)); //aka (key, data)

            $window.alert('Your New Booze:  ' + $scope.boozeForm.name + '\n\nFrom:  ' + $scope.boozeForm.company + '\n\nHas Been Added!!\n\n Locally For Now');

            var newUrl;
            if (boozeDataNew.type !== 'beer') {
                newUrl = '/' + boozeDataNew[0].type;
            } else {
                newUrl = '/';
            }
            $location.path(newUrl);

        }; //end saveBooze
  });

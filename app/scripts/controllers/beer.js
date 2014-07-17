'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:BeerCtrl
 * @description
 * # BeerCtrl
 * Controller of the boozeApp
 */

angular.module('boozeApp')
    .controller('BeerCtrl', function ($scope, getboozejson, storageFactory, listdataFilter, beerkey) {

        var boozeDataStorage = storageFactory.getBooze('booze-data-cache');

        if(boozeDataStorage !== null) {

            $scope.beerList = listdataFilter.beer(boozeDataStorage, beerkey);

        } else {

            getboozejson.getBoozeData()
                .success(function (boozeData) {

                    $scope.beerList = listdataFilter.beer(boozeData, beerkey);
                    storageFactory.storeGetBooze('booze-data-cache', boozeData);

                });

        } //end if-else
  });

'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:WhiskeyCtrl
 * @description
 * # WhiskeyCtrl
 * Controller of the boozeApp
 */

angular.module('boozeApp')
  .controller('WhiskeyCtrl', function ($scope, getboozejson, storageFactory, listdataFilter, whiskeykey) {

        var boozeDataStorage = storageFactory.getBooze('booze-data-cache');

        if(boozeDataStorage !== null) {

            $scope.whiskeyList = listdataFilter.whiskey(boozeDataStorage, whiskeykey);

        } else {

            getboozejson.getBoozeData()
                .success(function (boozeData) {

                    $scope.whiskeyList = listdataFilter.whiskey(boozeData, whiskeykey);
                    storageFactory.storeGetBooze('booze-data-cache', boozeData);

                });

        } //end if-else
  });

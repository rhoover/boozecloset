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

        var boozeDataCache = storageFactory.getBooze('booze-data-cache');

        if(boozeDataCache !== null) {

            $scope.whiskeyList = listdataFilter.whiskey(boozeDataCache, whiskeykey);

        } else {

            getboozejson.getBoozeData()

            .success(function (data) {
                $scope.whiskeyList = listdataFilter.whiskey(data, whiskeykey);
                storageFactory.storeGetBooze('booze-data-cache', data);
            })

            .error(function () {
                alert('That\'s right Dude, they pee\'d on your fucking rug');
            });

        } //end if-else
  });

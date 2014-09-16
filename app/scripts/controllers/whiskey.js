'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:WhiskeyCtrl
 * @description
 * # WhiskeyCtrl
 * Controller of the boozeApp
 */

angular
    .module('boozeApp')
    .controller('WhiskeyCtrl', function ($scope, listdataFilter, storageFactory, whiskeykey, storagekey) {

        $scope.whiskeyList = listdataFilter.beer(storageFactory.getBoozeData(storagekey), whiskeykey);

  });

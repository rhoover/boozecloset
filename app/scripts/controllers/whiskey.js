'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:WhiskeyCtrl
 * @description
 * # WhiskeyCtrl
 * Controller of the boozeApp
 */

angular.module('boozeApp')
  .controller('WhiskeyCtrl', function ($scope, listdataFilter, storageFactory, whiskeykey) {

        var isDataStored = storageFactory.getBoozeData('booze-data-cache');

        $scope.whiskeyList = listdataFilter.beer(isDataStored, whiskeykey);

  });

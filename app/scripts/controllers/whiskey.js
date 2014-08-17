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
    .controller('WhiskeyCtrl', function ($scope, listdataFilter, storageFactory, whiskeykey) {

        $scope.whiskeyList = listdataFilter.beer(storageFactory.getBoozeData('booze-data-cache'), whiskeykey);

  });

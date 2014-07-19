'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:BeerCtrl
 * @description
 * # BeerCtrl
 * Controller of the boozeApp
 */

angular.module('boozeApp')
    .controller('BeerCtrl', function ($scope, listdataFilter, storageFactory, beerkey) {

        var isDataStored = storageFactory.getBoozeData('booze-data-cache');

        $scope.beerList = listdataFilter.beer(isDataStored, beerkey);

  });

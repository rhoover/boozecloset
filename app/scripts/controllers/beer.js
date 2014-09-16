'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:BeerCtrl
 * @description
 * # BeerCtrl
 * Controller of the boozeApp
 */

angular
    .module('boozeApp')
    .controller('BeerCtrl', function ($scope,  storageFactory, listdataFilter, beerkey, storagekey) {

        $scope.beerList = listdataFilter.beer(storageFactory.getBoozeData(storagekey), beerkey);

  });

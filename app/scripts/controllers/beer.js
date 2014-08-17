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
    .controller('BeerCtrl', function ($scope,  storageFactory, listdataFilter, beerkey) {

        $scope.beerList = listdataFilter.beer(storageFactory.getBoozeData('booze-data-cache'), beerkey);

  });

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
    .controller('BeerCtrl', function (storageFactory, listdataFilter, beerkey, storagekey) {

        this.beerList = listdataFilter.beer(storageFactory.getBoozeData(storagekey), beerkey);

  });

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
    .controller('WhiskeyCtrl', function (listdataFilter, storageFactory, whiskeykey, storagekey) {

        this.whiskeyList = listdataFilter.beer(storageFactory.getBoozeData(storagekey), whiskeykey);

  });

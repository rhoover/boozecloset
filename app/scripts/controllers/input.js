'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:InputCtrl
 * @description
 * # InputCtrl
 * Controller of the boozeApp
 */

angular
    .module('boozeApp')
    .controller('InputCtrl', function ($location, $window, $filter, storagekey, randomnumber, storageFactory, alertFactory, newUrlFactory) {

        var iC = this;

        iC.boozeForm = [];

        iC.boozeForm.purchasedon = new Date();

        iC.boozeType = function (key) {
            iC.boozeForm.type = key;
        };

        iC.boozeForm.saveBooze = function () {

            var boozeDataNew = {
                    id: randomnumber.randomid(),
                    type: iC.boozeForm.type,
                    purchasedfrom: iC.boozeForm.purchasedfrom,
                    purchasedon: iC.boozeForm.purchasedon,
                    price: iC.boozeForm.price,
                    name: iC.boozeForm.name,
                    company: iC.boozeForm.company,
                    status: iC.boozeForm.status
                };

            storageFactory.addToBoozeLocal(storagekey, storageFactory.getBoozeData(storagekey), boozeDataNew); //aka: (key, oldData, NewData)
            storageFactory.storeBoozeRemote(storagekey, storageFactory.getBoozeData(storagekey)); //aka (key, data)

            alertFactory.addAlert(iC.boozeForm.type, iC.boozeForm.name, iC.boozeForm.company);

            newUrlFactory.newUrl(iC.boozeForm.type);

        }; //end saveBooze
  });

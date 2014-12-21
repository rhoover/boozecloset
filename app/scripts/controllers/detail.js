'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the boozeApp
 */

angular
    .module('boozeApp')
    .controller('DetailCtrl', function ($routeParams, $location, $window, storageFactory, listdataFilter, newUrlFactory, alertFactory, storagekey) {

        var dC = this;

        dC.boozeItem = listdataFilter.singleBooze(storageFactory.getBoozeData(storagekey), $routeParams.id); //aka: (input, arg)

        dC.editValue = false;

        // We'll leave this here for reference purposes, but it is replaced by the ternary statment below!
        // if (dC.boozeItem.purchasedon === ' ') {
        //     dC.boozeItem.purchasedon = new Date();
        // } else {
        //     dC.boozeItem.purchasedon = new Date(dC.boozeItem.purchasedon);
        // }

        dC.boozeItem.purchasedon === ' ' ?  dC.boozeItem.purchasedon = new Date() : dC.boozeItem.purchasedon = new Date(dC.boozeItem.purchasedon);

        dC.boozeItem.upDate = function () {

            var boozeObjectNew = {
                id: dC.boozeItem.id,
                type: dC.boozeItem.type,
                purchasedfrom: dC.boozeItem.purchasedfrom,
                purchasedon: dC.boozeItem.purchasedon,
                price: dC.boozeItem.price,
                name: dC.boozeItem.name,
                company: dC.boozeItem.company,
                status: dC.boozeItem.status
            };

            storageFactory.updateBoozeLocal(storagekey, storageFactory.getBoozeData(storagekey), boozeObjectNew); //aka: (key, originalCloset, newObject)
            // storageFactory.storeBoozeRemote(storagekey, storageFactory.getBoozeData(storagekey)); //aka (key, data)

            alertFactory.updateAlert(dC.boozeItem.type, dC.boozeItem.name, dC.boozeItem.company);

            newUrlFactory.newUrl(dC.boozeItem.type);

        }; // end upDate

        dC.removeItem = function () {

            storageFactory.removeBoozeItem(storagekey, storageFactory.getBoozeData(storagekey), dC.boozeItem);//aka: (key, originalCloset, newObject)
            storageFactory.storeBoozeRemote(storagekey, storageFactory.getBoozeData(storagekey)); //aka (key, data)

            alertFactory.removeAlert(dC.boozeItem.type, dC.boozeItem.name, dC.boozeItem.company);

            newUrlFactory.newUrl(dC.boozeItem.type);

        }; //end removeItem

    });

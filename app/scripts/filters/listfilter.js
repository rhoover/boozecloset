'use strict';

/**
 * @ngdoc filter
 * @name boozeApp.filter:listfilter
 * @function
 * @description
 * # listfilter
 * Filter in the boozeApp.
 */
angular.module('boozeApp')
    .filter('listdata', function () {

        return {
            beer: function (input, arg) { //input is the json file, arg is the booze type

                var outBeerList = [];
                //leaving this here for reference purposes
                // var beerLen = input.length;
                // for (var i = 0; i < beerLen; i++) {
                //     if (input[i].type === arg) {
                //         outBeerList.push(input[i]);
                //     }
                // }
                angular.forEach(input, function (boozeItem) {
                    if (boozeItem.type === arg) {
                        this.push(boozeItem);
                    }
                }, outBeerList);
                return outBeerList;
            },
            whiskey: function (input, arg) { //input is the json file, arg is the booze type

                var outWhiskeyList = [];
                //leaving this here for reference purposes
                // var whiskeyLen = input.length;
                // for (var i = 0; i < whiskeyLen; i++) {
                //     if (input[i].type === arg) {
                //         outWhiskeyList.push(input[i]);
                //     }
                // }
                angular.forEach(input, function (boozeItem) {
                    if (boozeItem.type === arg) {
                        this.push(boozeItem);
                    }
                }, outWhiskeyList);
                return outWhiskeyList;
            }
        }; //end return
  });

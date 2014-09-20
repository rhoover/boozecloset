'use strict';

/**
 * @ngdoc service
 * @name boozeApp.alertfactory
 * @description
 * # alertfactory
 * Factory in the boozeApp.
 */

angular
    .module('boozeApp')
    .factory('alertFactory', function ($window) {

        return {

            updateAlert: function (name, company) {

                $window.alert('Your Precious Booze:  ' + name + '\n\nFrom:  ' + company + '\n\nHas Been Updated!!\n\nBoth Locally and on the Server!');

            },
            removeAlert: function (name, company) {

                $window.alert('Your No-Longer Precious Booze:  ' + name + '\n\nFrom:  ' + company + '\n\nHas Been Removed!!\n\nBoth Locally and on the Server!');

            },
            addAlert: function (name, company) {

                $window.alert('Another Precious Booze:  ' + name + '\n\nFrom:  ' + company + '\n\nHas Been Added!!\n\nBoth Locally and on the Server!');

            }

        };
    });

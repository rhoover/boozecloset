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

            updateAlert: function (type, name, company) {

                $window.alert('Your precious ' + type + ':  ' + name + '\n\nFrom:  ' + company + '\n\nHas Been Updated!!\n\nBoth Locally and on the Server!');

            },
            removeAlert: function (type, name, company) {

                $window.alert('Your no longer precious ' + type + ':  ' + name + '\n\nFrom:  ' + company + '\n\nHas Been Removed!!\n\nBoth Locally and on the Server!');

            },
            addAlert: function (type, name, company) {

                $window.alert('Your precious ' + type + ':  ' + name + '\n\nFrom:  ' + company + '\n\nHas Been Added!!\n\nBoth Locally and on the Server!');

            }

        };
    });

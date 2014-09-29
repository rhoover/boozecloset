'use strict';

/**
 * @ngdoc service
 * @name boozeApp.returnnewurl
 * @description
 * # returnnewurl
 * Factory in the boozeApp.
 */

angular
    .module('boozeApp')
    .factory('newUrlFactory', function ($location) {


        return {
            newUrl: function (boozeType) {

                var newUrl;
                if (boozeType !== 'beer') {
                    newUrl = '/' + boozeType;
                } else{
                    newUrl = '/';
                }

                $location.path(newUrl);

            }
        };
    });

'use strict';

/**
 * @ngdoc overview
 * @name boozeApp
 * @description
 * # boozeApp
 *
 * Main module of the application.
 */

angular.module('boozeApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch'])

    // This is the key to view transition happiness! i.e scroll to top when view changes
    //Courtesy of: http://codepen.io/mike360/pen/kGsvK
    .run(function ($rootScope, $timeout, $window) {
        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                $window.scrollTo(0,0);
            }, 500);
        });

    })

    .config(function ($routeProvider, $httpProvider) {

        //courtesy: https://gist.github.com/s9tpepper/3328010
        // The PHP $_POST expects data w/ a form content type, not a JSON payload that Angular delivers
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        var booze = function(resolveFactory) {
            return resolveFactory.boozeResolve();
        };

        //normal stuff
        $routeProvider
            .when('/', {
                templateUrl: 'views/beer.html',
                controller: 'BeerCtrl',
                resolve: {
                    boozejson: booze
                }
            })
            .when('/whiskey', {
                templateUrl: 'views/whiskey.html',
                controller: 'WhiskeyCtrl',
                resolve: {
                    boozejson: booze
                }
            })
            .when('/input', {
                templateUrl: 'views/input.html',
                controller: 'InputCtrl'
            })
            .when('/beer/:id', {
                templateUrl: 'views/details.html',
                controller: 'DetailCtrl'
            })
            .when('/whiskey/:id', {
                templateUrl: 'views/details.html',
                controller: 'DetailCtrl'
            })
            .otherwise({
                redirectTo: '/'
        });
    });

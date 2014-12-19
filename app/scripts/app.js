'use strict';

/**
 * @ngdoc overview
 * @name boozeApp
 * @description
 * # boozeApp
 *
 * Main module of the application.
 */

angular.module('boozeApp', ['ngAnimate',  'ngRoute', 'ngTouch'])

    // This is the key to view transition happiness! i.e scroll to top when view changes
    //Courtesy of: http://codepen.io/mike360/pen/kGsvK
    .run(function ($rootScope, $timeout, $window) {
        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                $window.scrollTo(0,0);
            }, 500);
        });

    })

    .config(function ($routeProvider) {

        var booze = function(resolveFactory) {
            return resolveFactory.boozeResolve();
        };

        //normal stuff
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html'
                // resolve: {
                //     boozejson: booze
                // }
            })
            .when('/beer', {
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
                controller: 'InputCtrl',
                resolve: {
                    boozejson: booze
                }
            })
            .when('/beer/:id', {
                templateUrl: 'views/details.html',
                controller: 'DetailCtrl',
                resolve: {
                    boozejson: booze
                }
            })
            .when('/whiskey/:id', {
                templateUrl: 'views/details.html',
                controller: 'DetailCtrl',
                resolve: {
                    boozejson: booze
                }
            })
            .otherwise({
                redirectTo: '/'
        });
    })


    .config(function ($compileProvider) {
        // Courtesy: http://ambikasukla.wordpress.com/2014/10/24/simple-trick-to-speed-up-your-angularjs-app-load-time/
        // Change to false for production
        $compileProvider.debugInfoEnabled(false);
    })

    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        /**
        * The workhorse; converts an object to x-www-form-urlencoded serialization.
        * @param {Object} obj
        * @return {String}
        * http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
        */
        var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null) {
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
        }
        return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];


    });

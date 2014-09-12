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
//'ngCookies', 'ngResource', 'ngSanitize',
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

        //courtesy: https://gist.github.com/s9tpepper/3328010
        // The PHP $_POST expects data w/ a form content type, not a JSON payload that Angular delivers
        // $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

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
    })

    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
        * The workhorse; converts an object to x-www-form-urlencoded serialization.
        * @param {Object} obj
        * @return {String}
        * http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
        */
        var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
          value = obj[name];

          if(value instanceof Array) {
            for(i=0; i<value.length; ++i) {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value instanceof Object) {
            for(subName in value) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    });

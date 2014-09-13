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

'use strict';

/**
 * @ngdoc service
 * @name boozeApp.resolveFactory
 * @description
 * # resolveFactory
 * Factory in the boozeApp.
 */

angular
    .module('boozeApp')
    .factory('resolveFactory', function (storageFactory, getBoozeFactory) {

        return {

            boozeResolve: function () {
                if (storageFactory.getBoozeData('booze-data-cache') !== null) {
                    return;
                } else {
                    var elseReturn = getBoozeFactory.getBoozeData()
                        .then(function (data) {
                            storageFactory.storeGetBoozeData('booze-data-cache', data);
                        },
                        function () {
                            alert('They Peed on Your Fucking Rug Dude');
                        });
                    return elseReturn;
                }
            }
        };
    });

'use strict';

/**
 * @ngdoc service
 * @name boozeApp.beerkey
 * @description
 * # beerkey
 * Constant in the boozeApp.
 */

angular.module('boozeApp')
  .constant('beerkey', 'beer');

'use strict';

/**
 * @ngdoc service
 * @name boozeApp.whiskeykey
 * @description
 * # whiskeykey
 * Constant in the boozeApp.
 */

angular.module('boozeApp')
  .constant('whiskeykey', 'whiskey');

'use strict';

/**
 * @ngdoc service
 * @name boozeApp.getboozejson
 * @description
 * # getboozejson
 * Factory in the boozeApp.
 */

angular.module('boozeApp')
    .factory('getBoozeFactory', function ($http) {

        return {
            getBoozeData: function () {

                return $http.get('data/booze.json')
                    .then(function (result) {
                        return result.data;
                    });
            }
        };
    });

'use strict';

/**
 * @ngdoc service
 * @name boozeApp.storagefactory
 * @description
 * # storagefactory
 * Factory in the boozeApp.
 */

angular.module('boozeApp')
    .factory('storageFactory', function ($http) {

        // Public API here
        return {
            getBoozeData: function (key) {
                return angular.fromJson(sessionStorage.getItem(key));
            },
            storeGetBoozeData: function (key, retrievedData) {
                sessionStorage.setItem(key, angular.toJson(retrievedData));
            },
            storeBoozeLocal: function (key, oldData, newData) {
                sessionStorage.setItem(key, angular.toJson(oldData.concat(newData)));
            },
            storeBoozeRemote: function (key, data) {
                // return $http.post('data/booze.json', sessionStorage.getItem(key))
                $http.post('jsonsave.php', sessionStorage.getItem(key))
                    // .then(function (response) {
                    //     return response;
                    // });
                    .success(function (data, status, headers, config) {
                        console.log(status, data);
                    })
                    .error(function (data, status, headers, config) {
                        console.log(status, data);
                    });
                // var joinedData = oldData.concat(newData); //concat-ing two arrays of object literals: json on record and boozeForm[]
                // var parsedJoinedData = angular.toJson(joinedData);

            },
            updateBoozeLocal: function (key, originalCloset, newObject) {
                for (var i = 0; i < originalCloset.length; i++) {
                    if (newObject.id === originalCloset[i].id) {
                        originalCloset[i] = newObject;
                        sessionStorage.setItem(key, angular.toJson(originalCloset));
                    }
                }
            }
            //Leaving these here just in case.......
            // removeBooze: function (key) {
            //     sessionStorage.removeItem(key);
            // },
            // clearAll: function () {
            //     sessionStorage.clear();
            // }
        };
    });

'use strict';

/**
 * @ngdoc service
 * @name boozeApp.randomnumber
 * @description
 * # randomnumber
 * Factory in the boozeApp.
 */

angular.module('boozeApp')
    .factory('randomnumber', function () {

        return {
            randomid: function () {
                //Courtesy: http://stackoverflow.com/a/1527834
                var min = 100000;
                var max = 200000;
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        };
    });

'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:BeerCtrl
 * @description
 * # BeerCtrl
 * Controller of the boozeApp
 */

angular
    .module('boozeApp')
    .controller('BeerCtrl', function ($scope,  storageFactory, listdataFilter, beerkey) {

        $scope.beerList = listdataFilter.beer(storageFactory.getBoozeData('booze-data-cache'), beerkey);

  });

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
    .controller('InputCtrl', function ($scope, beerkey, whiskeykey, randomnumber, storageFactory) {

        $scope.boozeForm = [];

        $scope.beerVisible = false;
        $scope.whiskeyVisible = false;

        $scope.beerToggle = function () {
            $scope.beerVisible = true;
            $scope.whiskeyVisible = false;
            $scope.boozeForm.type = beerkey;
        };

        $scope.whiskeyToggle = function () {
            $scope.beerVisible = false;
            $scope.whiskeyVisible = true;
            $scope.boozeForm.type = whiskeykey;
        };

        $scope.boozeForm.saveBooze = function () {

            var randomId = randomnumber.randomid();

            var boozeDataNew = [
                {
                    id: randomId,
                    type: $scope.boozeForm.type,
                    purchasedfrom: $scope.boozeForm.purchasedfrom,
                    purchasedon: $scope.boozeForm.purchasedon,
                    price: $scope.boozeForm.price,
                    name: $scope.boozeForm.name,
                    company: $scope.boozeForm.company,
                    status: $scope.boozeForm.status
                }
            ];

            var boozeDataOld = storageFactory.getBoozeData('booze-data-cache');

            storageFactory.storeBoozeLocal('booze-data-cache', boozeDataOld, boozeDataNew);
            // storageFactory.saveBoozeRemote('booze-data-cache', boozeDataOld, boozeDataNew);
            alert('Your New Booze:  ' + $scope.boozeForm.name + '\n\nFrom:  ' + $scope.boozeForm.company + '\n\nHas Been Added!!\n\n Locally For Now');
        };
  });

'use strict';

/**
 * @ngdoc function
 * @name boozeApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the boozeApp
 */
angular
    .module('boozeApp')
    .controller('NavCtrl', function ($scope, $location) {
        $scope.isActive = function (route) {
            return route === $location.path();
        };
  });

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
    .controller('WhiskeyCtrl', function ($scope, listdataFilter, storageFactory, whiskeykey) {

        $scope.whiskeyList = listdataFilter.beer(storageFactory.getBoozeData('booze-data-cache'), whiskeykey);

  });

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
            },
            singleBooze: function (input, arg) {
                var outBoozeItem = [];
                angular.forEach(input, function (boozeItem) {
                    if (boozeItem.id === arg) {
                        this.push(boozeItem);
                    }
                }, outBoozeItem);
                return outBoozeItem.shift();
            }
        }; //end return
  });

'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:beerinput
 * @description
 * # beerinput
 */

angular.module('boozeApp')
    .directive('beerInput', function () {
        return {
            templateUrl: 'views/beerinputform.html',
            restrict: 'A',
            replace: true //WARNING: Angular is threatening to deprecate this prop. in next major release
            // link: function (scope, element, attrs) {
            //     element.text('this is the beerinput directive');
            // }
        };
    });

'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:whiskeyinput
 * @description
 * # whiskeyinput
 */

angular.module('boozeApp')
    .directive('whiskeyInput', function () {
        return {
            templateUrl: 'views/whiskeyinputform.html',
            restrict: 'A',
            replace: true //WARNING: Angular is threatening to deprecate this prop. in next major release
            // link: function postLink(scope, element, attrs) {
            //     element.text('this is the whiskeyinput directive');
            // }
        };
    });

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
    .controller('DetailCtrl', function ($scope, $routeParams, storageFactory, listdataFilter) {

        $scope.boozeItem = listdataFilter.singleBooze(storageFactory.getBoozeData('booze-data-cache'), $routeParams.id);

        $scope.boozeItem.upDate = function () {

            var all = storageFactory.getBoozeData('booze-data-cache');
            var boozeObjectNew = {
                    id: $scope.boozeItem.id,
                    type: $scope.boozeItem.type,
                    purchasedfrom: $scope.boozeItem.purchasedfrom,
                    purchasedon: $scope.boozeItem.purchasedon,
                    price: $scope.boozeItem.price,
                    name: $scope.boozeItem.name,
                    company: $scope.boozeItem.company,
                    status: $scope.boozeItem.status
            };

            storageFactory.updateBoozeLocal('booze-data-cache', all, boozeObjectNew);
            storageFactory.storeBoozeRemote('booze-data-cache', all);
            alert('Your New Booze:  ' + $scope.boozeItem.name + '\n\nFrom:  ' + $scope.boozeItem.company + '\n\nHas Been Updated!!\n\n Locally For Now');
        };

    });

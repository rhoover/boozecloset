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
    .factory('resolveFactory', function ($window, storageFactory, getBoozeFactory, storagekey) {

        return {

            boozeResolve: function () {
                if (storageFactory.getBoozeData(storagekey) !== null) {
                    return;
                } else {
                    var elseReturn = getBoozeFactory.getBoozeData()
                        .then(function (data) {
                            storageFactory.storeGetBoozeData(storagekey, data);
                        },
                        function () {
                            $window.alert('They Peed on Your Fucking Rug Dude');
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

angular
    .module('boozeApp')
    .constant('beerkey', 'beer');

'use strict';

/**
 * @ngdoc service
 * @name boozeApp.whiskeykey
 * @description
 * # whiskeykey
 * Constant in the boozeApp.
 */

angular
    .module('boozeApp')
    .constant('whiskeykey', 'whiskey');

'use strict';

/**
 * @ngdoc service
 * @name boozeApp.storagekey
 * @description
 * # storagekey
 * Constant in the boozeApp.
 */

angular
    .module('boozeApp')
    .constant('storagekey', 'booze-data-cache');

'use strict';

/**
 * @ngdoc service
 * @name boozeApp.getboozejson
 * @description
 * # getboozejson
 * Factory in the boozeApp.
 */

angular
    .module('boozeApp')
    .factory('getBoozeFactory', function ($http) {

        return {
            getBoozeData: function () {

                return $http.get('data/booze.json', {cache:false})
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

angular
    .module('boozeApp')
    .factory('storageFactory', function ($http) {

        return {
            getBoozeData: function (key) {
                return angular.fromJson(sessionStorage.getItem(key));
            },
            storeGetBoozeData: function (key, retrievedData) {
                sessionStorage.setItem(key, angular.toJson(retrievedData));
            },
            addToBoozeLocal: function (key, oldData, newData) {
                oldData.push(newData); // necessary because push() returns the new array length, but we want instead the new array
                sessionStorage.setItem(key, angular.toJson(oldData));
            },
            storeBoozeRemote: function (key, data) {
                $http.post('jsonsave.php', sessionStorage.getItem(key))
                    .success(function (data, status, headers, config) {
                        console.log(status, data);
                    })
                    .error(function (data, status, headers, config) {
                        console.log(status, data);
                    });

            },
            updateBoozeLocal: function (key, originalCloset, newObject) {
                for (var i = 0; i < originalCloset.length; i++) {
                    if (newObject.id === originalCloset[i].id) {
                        originalCloset[i] = newObject;
                        sessionStorage.setItem(key, angular.toJson(originalCloset));
                    }
                }
            },
            removeBoozeItem: function (key, originalCloset, boozeObject) {
                for (var i = 0; i < originalCloset.length; i++) {
                    if (boozeObject.id === originalCloset[i].id) {
                        originalCloset.splice(i, 1);
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

angular
    .module('boozeApp')
    .factory('randomnumber', function () {

        return {
            randomid: function () {
                //Courtesy: http://stackoverflow.com/a/1527834
                // var min = 100000;
                // var max = 200000;
                var stringMe = Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000;
                return stringMe.toString();
            }
        };
    });

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
                    newUrl = '/beer';
                }

                $location.path(newUrl);

            }
        };
    });

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
    .controller('BeerCtrl', function ($scope,  storageFactory, listdataFilter, beerkey, storagekey) {

        $scope.beerList = listdataFilter.beer(storageFactory.getBoozeData(storagekey), beerkey);

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
    .controller('InputCtrl', function ($scope, $location, $window, storagekey, randomnumber, storageFactory, alertFactory, newUrlFactory) {

        $scope.boozeForm = [];

        $scope.boozeType = function (key) {
            $scope.boozeForm.type = key;
        };

        $scope.boozeForm.saveBooze = function () {

            var boozeDataNew = {
                    id: randomnumber.randomid(),
                    type: $scope.boozeForm.type,
                    purchasedfrom: $scope.boozeForm.purchasedfrom,
                    purchasedon: $scope.boozeForm.purchasedon,
                    price: $scope.boozeForm.price,
                    name: $scope.boozeForm.name,
                    company: $scope.boozeForm.company,
                    status: $scope.boozeForm.status
                };

            storageFactory.addToBoozeLocal(storagekey, storageFactory.getBoozeData(storagekey), boozeDataNew); //aka: (key, oldData, NewData)
            storageFactory.storeBoozeRemote(storagekey, storageFactory.getBoozeData(storagekey)); //aka (key, data)

            alertFactory.addAlert($scope.boozeForm.type, $scope.boozeForm.name, $scope.boozeForm.company);

            newUrlFactory.newUrl($scope.boozeForm.type);

        }; //end saveBooze
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
    .controller('WhiskeyCtrl', function ($scope, listdataFilter, storageFactory, whiskeykey, storagekey) {

        $scope.whiskeyList = listdataFilter.beer(storageFactory.getBoozeData(storagekey), whiskeykey);

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
    .controller('DetailCtrl', function ($scope, $routeParams, $location, $window, storageFactory, listdataFilter, newUrlFactory, alertFactory, storagekey) {

        $scope.boozeItem = listdataFilter.singleBooze(storageFactory.getBoozeData(storagekey), $routeParams.id); //aka: (input, arg)

        $scope.editValue = false;

        $scope.boozeItem.upDate = function () {

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

            storageFactory.updateBoozeLocal(storagekey, storageFactory.getBoozeData(storagekey), boozeObjectNew); //aka: (key, originalCloset, newObject)
            storageFactory.storeBoozeRemote(storagekey, storageFactory.getBoozeData(storagekey)); //aka (key, data)

            alertFactory.updateAlert($scope.boozeItem.type, $scope.boozeItem.name, $scope.boozeItem.company);

            newUrlFactory.newUrl($scope.boozeItem.type);

        }; // end upDate

        $scope.removeItem = function () {

            storageFactory.removeBoozeItem(storagekey, storageFactory.getBoozeData(storagekey), $scope.boozeItem);//aka: (key, originalCloset, newObject)
            storageFactory.storeBoozeRemote(storagekey, storageFactory.getBoozeData(storagekey)); //aka (key, data)

            alertFactory.removeAlert($scope.boozeItem.type, $scope.boozeItem.name, $scope.boozeItem.company);

            newUrlFactory.newUrl($scope.boozeItem.type);

        }; //end removeItem

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
angular
    .module('boozeApp')
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

angular
    .module('boozeApp')
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

angular
    .module('boozeApp')
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
 * @ngdoc directive
 * @name boozeApp.directive:backButton
 * @description
 * # backButton
 */

angular
    .module('boozeApp')
    .directive('backButton', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                function goBack() {
                    history.back();
                    scope.$apply();
                }
                element.bind('click', goBack);
            }
        };
    });

'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:navButton
 * @description
 * # navButton
 */

angular
    .module('boozeApp')
    .directive('navButton', function ($location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    scope.$apply(function () {
                        $location.path(attrs.navButton);
                    });
                });
            }
        };
    });

'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:activeTab
 * @description
 * # activeTab
 */

angular
    .module('boozeApp')
    .directive('activeTab', function ($location) {
        return {
            restrict: 'A',
            scope: {path: "@navButton"},
            link: function (scope, element, attrs) {
                scope.$on('$locationChangeSuccess', function () {
                    if ($location.path() === scope.path) {
                        element.addClass('tab-active');
                    } else {
                        element.removeClass('tab-active');
                    }
                });
            }
        };
    });

'use strict';

/**
 * @ngdoc directive
 * @name boozeApp.directive:homeDataFetch
 * @description
 * # homeDataFetch
 */

angular
    .module('boozeApp')
    .directive('homeDataFetch', function ($timeout, resolveFactory) {
        return {

            restrict: 'A',

            link: function () {
                $timeout(function(){
                    resolveFactory.boozeResolve();
                }, 3000);
            }
        };
    });

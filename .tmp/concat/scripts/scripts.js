'use strict';
/**
 * @ngdoc overview
 * @name boozeApp
 * @description
 * # boozeApp
 *
 * Main module of the application.
 */
angular.module('boozeApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
]).config([
  '$routeProvider',
  '$httpProvider',
  function ($routeProvider, $httpProvider) {
    //courtesy: https://gist.github.com/s9tpepper/3328010
    // The PHP $_POST expects data w/ a form content type, not a JSON payload that Angular delivers
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    //normal stuff
    $routeProvider.when('/', {
      templateUrl: 'views/beer.html',
      controller: 'BeerCtrl'
    }).when('/whiskey', {
      templateUrl: 'views/whiskey.html',
      controller: 'WhiskeyCtrl'
    }).when('/input', {
      templateUrl: 'views/input.html',
      controller: 'InputCtrl'
    }).when('/beer/:id', { templateUrl: 'views/beerdetails.html' }).when('/whiskey/:id', { templateUrl: 'views/whiskeydetails.html' }).otherwise({ redirectTo: '/' });
  }
]).run([
  '$rootScope',
  '$timeout',
  '$window',
  function ($rootScope, $timeout, $window) {
    $rootScope.$on('$routeChangeSuccess', function () {
      $timeout(function () {
        $window.scrollTo(0, 0);
      }, 500);
    });
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name boozeApp.controller:BeerCtrl
 * @description
 * # BeerCtrl
 * Controller of the boozeApp
 */
angular.module('boozeApp').controller('BeerCtrl', [
  '$scope',
  'getboozejson',
  'storageFactory',
  'listdataFilter',
  'beerkey',
  function ($scope, getboozejson, storageFactory, listdataFilter, beerkey) {
    var boozeDataCache = storageFactory.getBooze('booze-data-cache');
    if (boozeDataCache !== null) {
      $scope.beerList = listdataFilter.beer(boozeDataCache, beerkey);
    } else {
      getboozejson.getBoozeData().success(function (data) {
        $scope.beerList = listdataFilter.beer(data, beerkey);
        storageFactory.storeGetBooze('booze-data-cache', data);
      }).error(function () {
        alert('That\'s right Dude, they pee\'d on your fucking rug');
      });
    }  //end if-else
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name boozeApp.controller:InputCtrl
 * @description
 * # InputCtrl
 * Controller of the boozeApp
 */
angular.module('boozeApp').controller('InputCtrl', [
  '$scope',
  'beerkey',
  'whiskeykey',
  'storageFactory',
  function ($scope, beerkey, whiskeykey, storageFactory) {
    $scope.boozeForm = [];
    $scope.allVisible = false;
    $scope.beerVisible = false;
    $scope.whiskeyVisible = false;
    $scope.beerToggle = function () {
      $scope.allVisible = true;
      $scope.beerVisible = true;
      $scope.whiskeyVisible = false;
      $scope.boozeForm.type = beerkey;
    };
    $scope.whiskeyToggle = function () {
      $scope.allVisible = true;
      $scope.beerVisible = false;
      $scope.whiskeyVisible = true;
      $scope.boozeForm.type = whiskeykey;
    };
    $scope.boozeForm.saveBooze = function () {
      //Courtesy: http://stackoverflow.com/a/1527834
      var min = 100000;
      var max = 200000;
      var randomId = Math.floor(Math.random() * (max - min + 1)) + min;
      var boozeDataNew = [{
            id: randomId,
            type: $scope.boozeForm.type,
            purchasedfrom: $scope.boozeForm.purchasedfrom,
            purchasedon: $scope.boozeForm.purchasedon,
            price: $scope.boozeForm.price,
            name: $scope.boozeForm.name,
            company: $scope.boozeForm.company,
            status: $scope.boozeForm.status
          }];
      var boozeDataOld = storageFactory.getBooze('booze-data-cache');
      storageFactory.storeBoozeLocal('booze-data-cache', boozeDataOld, boozeDataNew);
      storageFactory.saveBoozeRemote('booze-data-cache', boozeDataOld, boozeDataNew);
      alert('Your New Booze:  ' + $scope.boozeForm.name + '\n\nFrom:  ' + $scope.boozeForm.company + '\n\nHas Been Added!!\n\nBoth Locally and To Your Server');
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name boozeApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the boozeApp
 */
angular.module('boozeApp').controller('NavCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    $scope.isActive = function (route) {
      return route === $location.path();
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name boozeApp.controller:WhiskeyCtrl
 * @description
 * # WhiskeyCtrl
 * Controller of the boozeApp
 */
angular.module('boozeApp').controller('WhiskeyCtrl', [
  '$scope',
  'getboozejson',
  'storageFactory',
  'listdataFilter',
  'whiskeykey',
  function ($scope, getboozejson, storageFactory, listdataFilter, whiskeykey) {
    var boozeDataCache = storageFactory.getBooze('booze-data-cache');
    if (boozeDataCache !== null) {
      $scope.whiskeyList = listdataFilter.whiskey(boozeDataCache, whiskeykey);
    } else {
      getboozejson.getBoozeData().success(function (data) {
        $scope.whiskeyList = listdataFilter.whiskey(data, whiskeykey);
        storageFactory.storeGetBooze('booze-data-cache', data);
      }).error(function () {
        alert('That\'s right Dude, they pee\'d on your fucking rug');
      });
    }  //end if-else
  }
]);
'use strict';
/**
 * @ngdoc filter
 * @name boozeApp.filter:listfilter
 * @function
 * @description
 * # listfilter
 * Filter in the boozeApp.
 */
angular.module('boozeApp').filter('listdata', function () {
  return {
    beer: function (input, arg) {
      //input is the json file, arg is the booze type
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
    whiskey: function (input, arg) {
      //input is the json file, arg is the booze type
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
  };  //end return
});
'use strict';
/**
 * @ngdoc service
 * @name boozeApp.beerkey
 * @description
 * # beerkey
 * Constant in the boozeApp.
 */
angular.module('boozeApp').constant('beerkey', 'beer');
'use strict';
/**
 * @ngdoc service
 * @name boozeApp.whiskeykey
 * @description
 * # whiskeykey
 * Constant in the boozeApp.
 */
angular.module('boozeApp').constant('whiskeykey', 'whiskey');
'use strict';
/**
 * @ngdoc service
 * @name boozeApp.getboozejson
 * @description
 * # getboozejson
 * Factory in the boozeApp.
 */
angular.module('boozeApp').factory('getboozejson', [
  '$http',
  function ($http) {
    return {
      getBoozeData: function () {
        var serviceUrl = 'data/booze.json';
        return $http.get(serviceUrl).success(function (data) {
          return data;
        });
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc service
 * @name boozeApp.storagefactory
 * @description
 * # storagefactory
 * Factory in the boozeApp.
 */
angular.module('boozeApp').factory('storageFactory', [
  '$http',
  function ($http) {
    // Public API here
    return {
      getBooze: function (key) {
        var jsonFile = sessionStorage.getItem(key);
        var parsedJsonFile = angular.fromJson(jsonFile);
        return parsedJsonFile;
      },
      storeGetBooze: function (key, retrievedData) {
        var storeMe = angular.toJson(retrievedData);
        sessionStorage.setItem(key, storeMe);
      },
      storeBoozeLocal: function (key, oldData, newData) {
        var joinedData = oldData.concat(newData);
        //concat-ing two arrays of object literals: json on record and boozeForm[]
        var parsedJoinedData = angular.toJson(joinedData);
        sessionStorage.setItem(key, parsedJoinedData);
      },
      saveBoozeRemote: function (key, oldData, newData) {
        var joinedData = oldData.concat(newData);
        //concat-ing two arrays of object literals: json on record and boozeForm[]
        var parsedJoinedData = angular.toJson(joinedData);
      }  //Leaving these here just in case.......
         // removeBooze: function (key) {
         //     sessionStorage.removeItem(key);
         // },
         // clearAll: function () {
         //     sessionStorage.clear();
         // }
    };
  }
]);
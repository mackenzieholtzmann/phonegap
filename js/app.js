// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
movieApp = angular.module('movieApp', ['ionic', 'ngRoute', 'ngSanitize'])

.run(function($ionicPlatform,$rootScope,$location) {

  $rootScope.goHome = function(){
    $location.path('/list')
  };

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

movieApp.config(['$routeProvider', function($routeProvider){
$routeProvider
  .when('/list',{controller:'ListController', templateUrl:'partials/list.html'})
  .when('/details/:itemId',{controller: 'DetailsController', templateUrl:'partials/details.html'})
  .otherwise({redirectTo: '/list'});
}]);


movieApp.controller('ListController', function($scope, $http, $ionicLoading){
    $scope.getMovies = function(){
        $ionicLoading.show(); //start spinnner
        $http.get('https://api.themoviedb.org/3/discover/movie?api_key=8bb7a5206a63b70471eb1ef124f425a7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
        .success(function(response){
            console.log(response);
            $scope.movies = response.results;
       

            console.log($scope.movies[0].title);


            $ionicLoading.hide();
        })
        .finally(function(){
            $scope.$broadcast('scroll.refreshComplete')
        });
    }
    $scope.getMovies();
});


movieApp.controller('DetailsController', function($scope, $http, $ionicLoading, $routeParams){
 $ionicLoading.show();
 $http.get('https://api.themoviedb.org/3/discover/movie?api_key=8bb7a5206a63b70471eb1ef124f425a7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
 .success(function(response){
  $scope.movieDetail = response.results[$routeParams.itemId];
  console.log($scope.movieDetail);
  $ionicLoading.hide();
 });
});




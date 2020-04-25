//module
var moviePosterApp =
    angular.module('moviePosterApp',
        ['ngRoute', 'ngResource']);


//routes
moviePosterApp.config(function ($routeProvider) {

    $routeProvider
        //decides which page to call 
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })

        .when('/search', {
            templateUrl: 'pages/moviePanel.html',
            controller: 'movieController'
        });


});



//services

moviePosterApp.service('movieService', function () {

    this.movie = "";

});



//controllers

moviePosterApp.controller('homeController', ['$scope', 'movieService', function ($scope, movieService) {

    $scope.movie = movieService.movie;
    $scope.$watch('movie', function () {
        movieService.movie = $scope.movie;
    });

}]);

moviePosterApp.controller('movieController', ['$scope', '$resource', 'movieService', function ($scope, $resource, movieService) {
   //the api key you need to obtain from moviedb.org
    $scope.movie = movieService.movie;
    $scope.api_key = 'f2c99cf74ee4c4214605f5ac1bc00fc6';
    $scope.imagePath = 'http://image.tmdb.org/t/p/w500';
    $scope.movieAPI = $resource("https://api.themoviedb.org/3/search/movie", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });

    $scope.movieResult = $scope.movieAPI.get({ query: $scope.movie, api_key: $scope.api_key });

}]);
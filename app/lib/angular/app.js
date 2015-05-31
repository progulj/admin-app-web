var app = angular.module('app', ['ngRoute']);

app.config( function ($routeProvider) {
        $routeProvider.when('/locations', {templateUrl: 'locationList.html', controller: 'LocationListController'});
        $routeProvider.when('/location', {templateUrl: 'locationAdd.html', controller: 'LocationAddController'});
        $routeProvider.otherwise({redirectTo: '/locations'});
    });
app.controller('LocationListController', fuction($scope){
               
                $scope.locations=[{location:'Prva',address:'Prva'}, {location:'Druga',address:'druga'}];
               
               });
app.controller('LocationAddController', fuction($scope){
               
                $scope.locations=[{location:'Prva',address:'Prva'}, {location:'Druga',address:'druga'}];
               
               
               });
'use strict';

angular.module('fullstackApp')
  .controller('PollCtrl',['$scope', '$routeParams', '$http', 'Auth', '$location', function ($scope, $routeParams, $http, Auth, $location) {
    $http.get('/api/polls/' + $routeParams.id).success(function(res){
      $scope.poll = res;
     });   
    
    $scope.voteFor = function(id) {
      if(Auth.isLoggedIn()) {
      
      } else {
        $location.path('/login');
      }
    };
   
  }]);

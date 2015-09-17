'use strict';

angular.module('fullstackApp')
  .controller('PollCtrl',
    ['$scope', '$routeParams', '$http', 'Auth', '$location',
      function ($scope, $routeParams, $http, Auth, $location) {

    $scope.nextView = "Results"
    $scope.voteMessage = Auth.isLoggedIn() ? "Click on the Question to Vote"
      : "You must be Logged In to Vote";

    $http.get('/api/polls/' + $routeParams.id).success(function(res){

      $scope.poll = res;
      $scope.poll.showResult = false;

     });

    $scope.toggleView = function() {

      $scope.poll.showResult = !$scope.poll.showResult;
      if($scope.poll.showResult) $scope.nextView = "Questions";
      else  $scope.nextView = "Results";
    };

    $scope.voteFor = function(id) {

      console.log(id);
      if(Auth.isLoggedIn()) {

      } else {
        $location.path('/login');
      }
    };

  }]);

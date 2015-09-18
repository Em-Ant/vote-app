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

    $scope.voteFor = function(q) {

      if(Auth.isLoggedIn()) {
        $http.put('/api/polls/' + $routeParams.id + '/' + q)
          .success(function(res) {
            if (!res.alreadyVoted) {

            // Vote is accepted
            $scope.poll = res;
            $scope.poll.showResult = true;
          } else {

            // This user has already voted. Vote is invalid
            /**
            * TODO: improve already voted feedback message,
            *  disable vote buttons for the current poll
            */
            alert('You have already voted this poll!');
          }
        });
      } else {

        // User must be authenticated. Redirect to login page
        $location.path('/login');
      }
    };

  }]);

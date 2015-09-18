


'use strict';

angular.module('fullstackApp')
  .controller('PollCtrl',
    ['$scope',  '$routeParams', '$http', 'Auth', '$location', '$rootScope',
      function ($scope, $routeParams, $http, Auth, $location, $rootScope) {

    $scope.nextView = "Results"
    $scope.pageLink = $location.absUrl();
    Auth.isLoggedInAsync(function(res){
      $scope.logged = res;
    });

    $rootScope.oldPath = undefined;

    $http.get('/api/polls/' + $routeParams.id).success(function(res){

      $scope.poll = res;
      $scope.poll.showResult = false;

     });

    $scope.toggleView = function() {

      $scope.poll.showResult = !$scope.poll.showResult;
      if($scope.poll.showResult) $scope.nextView = "Answers";
      else  $scope.nextView = "Results";
    };

    $scope.voteFor = function(q) {

      if($scope.logged) {
        $http.put('/api/polls/' + $routeParams.id + '/' + q)
          .success(function(res) {
            if (!res.alreadyVoted) {

            // Vote is accepted
            $scope.poll = res;
            $scope.poll.showResult = true;
            $scope.nextView = "Answers"
          } else {

            // This user has already voted. Vote is invalid
            $scope.voted = true;

          }
        });
      } else {

        // User must be authenticated. Redirect to login page
        $rootScope.oldPath = $location.path();
        $location.path('/login');
      }
    };

  }]);


'use strict';

angular.module('fullstackApp')
  .controller('PollCtrl',
    ['$scope',  '$routeParams', '$http', 'Auth', '$location', '$rootScope',
      function ($scope, $routeParams, $http, Auth, $location, $rootScope) {

    //TODO: Create a LOADING status...

    $scope.nextView = "Results"
    $scope.pageLink = $location.absUrl();
    Auth.isLoggedInAsync(function (logged) {
      $scope.logged = logged;
      var curUser;
      if (logged) {
        curUser = Auth.getCurrentUser()._id;
      } else {
        curUser = 0;
      }
      $http.get('/api/polls/' + $routeParams.id + '/' + curUser)
      .success(function(res){
        $scope.poll = res;
        if (res.isVotedByCurrentUser) {
          $scope.poll.showResult = true;
          $scope.nextView = "Options"
        }
       });
    });

    $rootScope.oldPath = undefined;

    $scope.toggleView = function() {

      $scope.poll.showResult = !$scope.poll.showResult;
      if($scope.poll.showResult) $scope.nextView = "Answers";
      else  $scope.nextView = "Results";
    };

    $scope.voteFor = function(q) {

      if($scope.logged && !$scope.poll.isVotedByCurrentUser) {
        $http.put('/api/polls/' + $routeParams.id + '/' + q)
          .success(function(res) {
            if (!res.alreadyVoted) {

            // Vote is accepted
            $scope.poll = res;
            $scope.poll.showResult = true;
            $scope.poll.isVotedByCurrentUser = true;
            $scope.nextView = 'Options';
          } else {

            // This user has already voted. Vote is invalid
            $scope.voted = true;

          }
        });
      } else if (!$scope.logged){

        // User must be authenticated. Redirect to login page
        $rootScope.oldPath = $location.path();
        $location.path('/login');
      }
    };

  }]);

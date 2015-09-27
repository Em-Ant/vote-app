'use strict';

angular.module('fullstackApp')
  .controller('AdminCtrl', function ($scope, $http, $timeout, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.pollRemove = function(id) {
      $http.delete('api/polls/' + id).success(function(res) {
        $scope.pollId = '';
        $scope.removed = 'success';
        $timeout(function() {
          $scope.removed = undefined;
        },2000);
      }).error(function() {
        $scope.pollId = '';
        $scope.removed = 'error';
        $timeout(function() {
          $scope.removed = undefined;
        },2000);
      });
    };
  });

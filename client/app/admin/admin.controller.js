'use strict';

angular.module('fullstackApp')
  .controller('AdminCtrl', function ($scope, $http, $timeout, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u._id === user._id) {
          $scope.users.splice(i, 1);
        }
        $scope.userId = '';
        $scope.userInfo = undefined;
      });
    };

    $scope.closeInfo = function(which) {
      switch (which) {
        case 'poll':
          $scope.pollId = '';
          $scope.pollInfo = undefined;
          break;
        case 'user':
          $scope.userId = '';
          $scope.userInfo = undefined;
          break;
        default:
      }
    };

    $scope.requestPollInfo = function(id) {
      $http.get('/api/polls/' + id + '/0')
      .success(function(res){
        $scope.pollInfo = res;
      });
    }

    $scope.requestUserInfo = function(id) {
      $http.get('api/users/p/' + id)
      .success(function(res){
        $scope.userInfo = res;
        console.log(res);
      });
    }

    $scope.pollRemove = function(id) {
      $http.delete('api/polls/' + id).success(function(res) {
        $scope.pollId = '';
        $scope.pollInfo = undefined;
      });
    };
  });

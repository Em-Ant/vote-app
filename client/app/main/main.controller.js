'use strict';

angular.module('fullstackApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/polls/popular', {params:{limit: 2, page: 2}}).success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings.polls;
      $scope.info = awesomeThings.paginateInfo;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });

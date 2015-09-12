'use strict';

angular.module('fullstackApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.page = 1;
    
    $http.get('/api/polls/popular', {params:{ page: $scope.page }}).success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings.polls;
      $scope.info = awesomeThings.paginateInfo;
    });
    
    $scope.pageUp = function() {
      $scope.page++;
      
      $http.get('/api/polls/popular', {params:{ page: $scope.page }}).success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings.polls;
        $scope.info = awesomeThings.paginateInfo;
      });
    }

    $scope.pageDown = function() {
      $scope.page--;
      
      $http.get('/api/polls/popular', {params:{ page: $scope.page }}).success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings.polls;
        $scope.info = awesomeThings.paginateInfo;
      });
    }
      
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

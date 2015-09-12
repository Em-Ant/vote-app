'use strict';

angular.module('fullstackApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.page = 1;
    $scope.sortCriterion = 'recent'
    $scope.inactiveSortCrit = 'popular'
    
    var toogleSortCriterion = function() {
      $scope.sortCriterion = $scope.sortCriterion === 'recent' ? 'popular' : 'recent';
      $scope.inactiveSortCrit = $scope.inactiveSortCrit === 'recent' ? 'popular' : 'recent';
    }
    
    $scope.pager = function(dir) {
      
      if(dir === 'up') $scope.page++;
      else if (dir === 'down') $scope.page--;
      
      $http.get('/api/polls/' + $scope.sortCriterion, {params:{ page: $scope.page }}).success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings.polls;
        $scope.info = awesomeThings.paginateInfo;
      });
    }
    
    $scope.switchCrit = function() {
      toogleSortCriterion();
      $scope.page = 1;
      $scope.pager();
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
    
    $scope.pager();
  })
  .filter('capitalize',function() {
    return function(text) {
      var arr = text.split(' ');
      arr = arr.map(function(el) {
        return el.charAt(0).toUpperCase() + el.substr(1);
      });
      return arr.join(' ');
    }
  });

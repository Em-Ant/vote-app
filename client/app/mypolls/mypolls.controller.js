'use strict';

angular.module('fullstackApp')
  .controller('MypollsCtrl', ['$scope', '$http', '$timeout',
    function ($scope, $http, $timeout) {
    $scope.activeTitle = $scope.sortToggleButtonLabel = 'Loading...';
    $scope.loading = true;
    $scope.pollsData = {
      results: [],
      current: '-',
      last: '-',
    }

    var sortCrit = 'recent';

    var toogleSortCriterion = function() {
      sortCrit = sortCrit === 'recent' ? 'popular' : 'recent';
    }


    // TODO: Query USER polls, now queries ALL the polls
    $scope.pager = function(dir,page) {

      var queryPage = page || $scope.pollsData.current;
      $scope.loading = true;
      $scope.activeTitle = $scope.sortToggleButtonLabel = 'Loading...';
      if(dir === 'up') queryPage++
      else if (dir === 'down') queryPage--;

      $http.get('/api/polls/mypolls', { params:{ page: queryPage, order: sortCrit }})
        .success(function(res) {
          $scope.pollsData = res;
          $scope.loading = false;
          $scope.activeTitle = sortCrit === 'recent' ? 'Recent Polls' : 'Popular Polls';
          $scope.sortToggleButtonLabel = sortCrit === 'recent' ? 'Popular First' : 'Recent First';
      });
    };

    // add a readable permalink to the route page
    $scope.permalinker = function(text) {
      return text.toLowerCase().replace(/[\.\s]*\?\s*/g,'')
      .replace(/\./g,' ').replace(/\s+/g,'-').replace(/['"\\\*]/g,'');
    };

    $scope.switchCrit = function() {
      toogleSortCriterion();
      $scope.pager();
    };

    /**-------------------- EDIT & CREATE POLL SECTION ---------------------**/

    $scope.editStatus = {
      editMode: false,
      newPoll: false,
      newPollQuestionSaved: false,
      showNewQuestionInput: true
    };

    $scope.deletePoll = function(index) {

      var id = $scope.pollsData.results[index]._id;
      $http.delete('/api/polls/mypoll/' + id).success(function(){
        $scope.pager();
      });
    };

    $scope.editPoll = function(index) {

      // The already voted options can't be edited, or the poll results
      // could be manipulated !!!

      $scope.editStatus.editMode = true;
      if (index !== undefined) {
        $scope.currentEditPoll = angular.copy($scope.pollsData.results[index]);
        $scope.editStatus.newPoll = false;
      } else {
        $scope.currentEditPoll = {
          question: 'Your Question Here...',
          options: [],
          votes: []
        };
        $scope.editStatus.newPoll = true;
        $scope.editStatus.newPollQuestionDirty = false;
        $scope.editStatus.showNewQuestionInput = true;
      }

    };

    $scope.pushNewOpt = function() {
        if($scope.newOption &&
            $scope.currentEditPoll.options.indexOf($scope.newOption) === -1) {
          $scope.currentEditPoll.options.push($scope.newOption);
          $scope.currentEditPoll.votes.push(0);
        }
        $scope.newOption = '';
    };

    $scope.removeOpt = function(index) {
      $scope.currentEditPoll.options.splice(index,1);
      $scope.currentEditPoll.votes.splice(index,1);
    };

    $scope.clearNewQuestion = function() {
      $scope.currentEditPoll.question = 'Your Question Here...';
      $scope.editStatus.showNewQuestionInput = true;
      $scope.editStatus.newPollQuestionSaved = false;
    };

    $scope.saveNewQuestion = function() {
      $scope.currentEditPoll.question = $scope.newQuestion;
      $scope.newQuestion = '';
      $scope.editStatus.showNewQuestionInput = false;
      $scope.editStatus.newPollQuestionSaved = true;
    };

    $scope.quitEdit = function () {
      $scope.editStatus.editMode = false;
      $scope.currentEditPoll = null;
    }

    $scope.submitEdited = function() {

      if($scope.currentEditPoll.options.length < 2
        || ($scope.editStatus.newPoll
            && !$scope.editStatus.newPollQuestionSaved)) {

          $scope.editStatus.showAlert = true;
          $timeout(function(){
            $scope.editStatus.showAlert = false;
          },3000);
          return;
        }

      if($scope.editStatus.newPoll) {
        $http.post('/api/polls', $scope.currentEditPoll).success(function(){
          $scope.editStatus.editMode = false;
          $scope.currentEditPoll = null;
          sortCrit = 'recent';
          $scope.pager(null,1);
        })
      } else {
        var id = $scope.currentEditPoll._id;
        $http.put('/api/polls/' + id, $scope.currentEditPoll).success(function(poll){
          $scope.editStatus.editMode = false;
          $scope.currentEditPoll = null;
          sortCrit = 'recent';
          $scope.pager(null,1);
        });
      }
    };

    // Load the first polls
    $scope.pager(null,1);

  }]);

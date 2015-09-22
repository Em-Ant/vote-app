'use strict';

angular.module('fullstackApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mypolls', {
        templateUrl: 'app/mypolls/mypolls.html',
        controller: 'MypollsCtrl'
      });
  });

'use strict';

describe('Controller: MypollsCtrl', function () {

  // load the controller's module
  beforeEach(module('fullstackApp'));

  var MypollsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MypollsCtrl = $controller('MypollsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

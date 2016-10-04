angular.module("b66Living")
  .controller("testCtrl", function($scope, $state){
    $scope.go = function(){
      $state.go('projects')
    }
  })

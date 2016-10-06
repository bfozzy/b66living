angular.module("b66Living")
  .directive("project", function(){
      return {

        templateUrl: "./templates/directiveTemplates/project.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService, $stateParams){
          $scope.getProject = mainService.getProject($stateParams.id).then(function(res){
            console.log(res.data);
            $scope.project = res.data;
          });
        }
      };
    });
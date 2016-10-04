angular.module("b66Living")
  .directive("addProjectDirective", function(){
      return {

        templateUrl: "templates/directiveTemplates/addProject.html",
        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope){
          $scope.test = "controller is working";
        }

      }

  })

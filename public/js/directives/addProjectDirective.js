angular.module("b66Living")
  .directive("addProjectDirective", function(){
      return {

        templateUrl: "./templates/directiveTemplates/addProject.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService){
          //controller is working
          $scope.newproj = function(name, startDate, deadline){
            var projData = {
              name = name,
              startDate = startDate,
              deadline = deadline
            }
              mainService.createProj(projData).then()
          }
        }

      };

  })

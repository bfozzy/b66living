angular.module("b66Living")
  .directive("projectSummaries", function(){
      return {

        templateUrl: "./templates/directiveTemplates/projectSummaries.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService, $state){

          // $scope.getProjects = function(){
            mainService.showProjects()
            .then(function(res){
              console.log(res.data);
              $scope.projects = res.data;
            });
          // };

          // $scope.deleteProject = function(projectId){
          //   console.log(projectId);//this should go in the project directive
          // };
        }
      };
    });

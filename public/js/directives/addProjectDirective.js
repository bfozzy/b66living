angular.module("b66Living")
  .directive("addProjectDirective", function(){
      return {

        templateUrl: "./templates/directiveTemplates/addProject.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService){
          //controller is working
          $scope.newproj = function(projectName, ProjectStartDate, ProjectDeadline){
            //projData will turn the form in to an object that can be passed to the service
            var projData = {
              projectName: projectName,
              ProjectStartDate: ProjectStartDate,
              ProjectDeadline: ProjectDeadline
            };
            mainService.createProj(projData).then(function(res){
              console.log(res);
              if(res.status === 200){
                alert("Project Added")
              }
              else { //this part isn't working. If the post fails it just gives an error in the console with the err status
                alert("There was a problem processing your request")
              }
            })

          };
        }
      };
    })

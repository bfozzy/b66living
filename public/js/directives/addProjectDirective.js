angular.module("b66Living")
  .directive("addProjectDirective", function(){
      return {

        templateUrl: "./templates/directiveTemplates/addProject.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        // scope: {
        //
        // },
        controller: function($scope, mainService, $state){
          //controller is working
          $scope.newproj = function(projectName, projectStartDate, projectDeadline){
            //projData will turn the form in to an object that can be passed to the service
            var newProjectData = {
              name: projectName,
              startDate: projectStartDate,
              deadline: projectDeadline
            };
            mainService.createProj(newProjectData).then(function(res){
              if(res.status === 200){
                alert("Project Added");
                $state.reload();

              }
              else { //this part isn't working. If the post fails it just gives an error in the console with the err status
                alert("There was a problem processing your request");
              }
            });
          };
        }
      };
    });

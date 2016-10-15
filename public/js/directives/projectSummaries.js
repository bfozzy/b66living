angular.module("b66Living")
  .directive("projectSummaries", function(){
      return {

        templateUrl: "./templates/directiveTemplates/projectSummaries.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService, $state){
            mainService.showProjects()
            .then(function(res){
              console.log(res.data);
              $scope.projects = res.data;
            });

          $scope.deleteProject = function(projectId){
            swal(
              {
              title: "Are you sure?",
              text: "You will not be able to recover any information from this project!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              closeOnConfirm: false
              },
              function(){
                mainService.deleteInvoices(projectId).then(function(res){
                  if (res.status === 200){
                    mainService.deleteCustomers(projectId).then(function(res){
                      if (res.status === 200){
                        mainService.deleteProject(projectId).then(function(res){
                          if (res.status === 200){
                            swal("Deleted!", "This project, it's customers and it's invoices are gone forever.", "success");
                            $state.reload();
                          }
                        });
                      }
                    });
                  }
                });
              });
          };
        }
      };
    });

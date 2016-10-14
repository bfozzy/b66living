angular.module("b66Living")
  .directive("project", function(){
      return {

        templateUrl: "./templates/directiveTemplates/project.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService, $stateParams, $state){
           mainService.getProject($stateParams.id).then(function(res){
             console.log(res.data);
            $scope.project = res.data;
          });

           mainService.getInvoices($stateParams.id).then(function(res){
            $scope.invoices = res.data;
          });

           mainService.getCustomers($stateParams.id).then(function(res){
            $scope.customers = res.data;
          });

          $scope.deleteCustomer = function(customerId){
            swal(
              {
              title: "Are you sure?",
              text: "You will not be able to recover this imaginary file!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              closeOnConfirm: false
              },
              function(){
                mainService.deleteCustomer(customerId).then(function(res){
                  if (res.status === 200){
                    swal("Deleted!", "Customer removed from project.", "success");
                    $state.reload();
                  }
                });
              });



          };
        }
      };
  });

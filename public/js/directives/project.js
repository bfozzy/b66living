angular.module("b66Living")
  .directive("project", function(){
      return {

        templateUrl: "./templates/directiveTemplates/project.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService, $stateParams, $state){
           mainService.getProject($stateParams.id).then(function(res){
            //  console.log(res.data[0].project_id);
            $scope.project = res.data;
            $scope.projectId = res.data[0].project_id;
          });

           mainService.getInvoices($stateParams.id).then(function(res){
            $scope.invoices = res.data;
            // console.log(res.data);

          });

           mainService.getCustomers($stateParams.id).then(function(res){
            $scope.customers = res.data;
          });

          $scope.deleteCustomer = function(customerId){
            swal(
              {
              title: "Are you sure?",
              text: "You will not be able to recover this customer's information!",
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
          $scope.deleteInvoice = function(invoiceId){
            swal(
              {
              title: "Are you sure?",
              text: "You will not be able to recover this invoice!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              closeOnConfirm: false
              },
              function(){
                mainService.deleteInvoice(invoiceId).then(function(res){
                  if (res.status === 200){
                    swal("Deleted!", "Invoice removed from project.", "success");
                    $state.reload();
                  }
                });
              });



          };
        }
      };
  });

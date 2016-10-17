angular.module("b66Living")
  .directive("addInvoice", function(){
      return {

        templateUrl: "./templates/directiveTemplates/addInvoice.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService, $stateParams, $state){
          $scope.createInv = function(invoicePeriod, invoiceDesc){
            var invoice = {
              invoicePeriod: invoicePeriod,
              invoiceDesc: invoiceDesc
            };
            mainService.createInvoice(invoice, $stateParams.id).then(function(res){
              if(res.status === 200){
                swal("Invoice Added");
                $state.reload();
              }
              else {
                alert("There was a problem processing your request")
              }
            })
          }

        }
      };
    });

angular.module("b66Living")
  .directive("invoice", function(){
      return {

        templateUrl: "./templates/directiveTemplates/invoice.html",

        restrict: "AE",
        link: function(scope, element, attributes){


        },
        controller: function controller($scope, mainService, $stateParams, $state) {
          mainService.getProducts($stateParams.id, $stateParams.invoiceId).then(function (res) {
            $scope.products = res.data;
            var productLength = $scope.products.length;
            $scope.productIndex = [];
            $scope.invoiceTotal = 0;
console.log($scope.products);
            for (var i = 0; i < productLength; i++) {
              var retail = Number($scope.products[i].retail);
              var tax = Number($scope.products[i].tax) * retail;
              var subtot = (retail +  tax);
              // subtot += Number(res.data[i])
              // console.log(retail);
              // console.log(tax);
              // console.log(subtot);


              $scope.products[i].productIndex=(i + 1);
              $scope.products[i].subtotal =subtot.toFixed(2);
              $scope.invoiceTotal += Number($scope.products[i].subtotal);
              console.log($scope.invoiceTotal);
              // $scope.productSubtotal = subtot;
            }
            console.log($scope.products);

          });


          $scope.addProduct = function (productDescription, productWholesale, productRetail, productTax) {
            var newProduct = {
              description: productDescription,
              wholesale: productWholesale,
              retail: productRetail,
              tax: productTax
            };
            mainService.addProduct($stateParams.invoiceId, newProduct).then(function (res) {
              if (res.status === 200) {
                swal("Product Added!");
                $state.reload();
              }
            });
          }; //End of addProduct
        } //End of Controller
      };//End of directive return statement
    });//End of directive

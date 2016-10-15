"use strict";

angular.module("b66Living", ["ui.router"]).config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/admin/home");
  //Rule to avoid trailing '/' in url
  $urlRouterProvider.rule(function ($injector, $location) {

    var path = $location.path();
    var hasTrailingSlash = path[path.length - 1] === '/';

    if (hasTrailingSlash) {

      //if last charcter is a slash, return the same url without the slash
      var newPath = path.substr(0, path.length - 1);
      return newPath;
    }
  });
  $stateProvider.state("home", {
    templateUrl: "templates/routeTemplates/home.html",
    url: "/admin/home"
  }).state("projects", {
    templateUrl: "templates/routeTemplates/projects.html",
    url: "/admin/projects"
  }).state("addProject", {
    templateUrl: "templates/routeTemplates/newProject.html",
    url: "/admin/projects/new"
  }).state("addCustomer", {
    templateUrl: "templates/routeTemplates/addCustomerView.html",
    url: "/admin/projects/:id/customer/new"
  }).state("seeProject", {
    templateUrl: "templates/routeTemplates/projectDetail.html",
    url: "/admin/projects/:id"
  }).state("seeInvoice", {
    template: "<invoice></invoice>",
    url: "/admin/projects/:id/invoice/:invoiceId"
  });
});

angular.module("b66Living").controller("testCtrl", function ($scope, $state) {
  $scope.go = function () {
    $state.go('projects');
  };
});

angular.module("b66Living").directive("addCustomer", function () {
  return {

    templateUrl: "./templates/directiveTemplates/addCustomer.html",

    restrict: "AE",
    link: function link(scope, element, attributes) {},
    controller: function controller($scope, mainService, $stateParams, $state) {

      $scope.newCust = function (customerName, customerEmail, customerPhone, customerAddressLine1, customerAddressLine2, customerAddressCity, customerAddressState, customerAddressZip) {
        var customer = {
          name: customerName,
          email: customerEmail,
          phone: customerPhone
        };

        var address = {
          addressLine1: customerAddressLine1,
          addressLine2: customerAddressLine2,
          addressCity: customerAddressCity,
          addressState: customerAddressState,
          addressZip: customerAddressZip
        };

        // console.log($stateParams.id);
        mainService.createCust(customer, $stateParams.id).then(function (res) {
          if (res.status === 200) {
            swal("Customer Added");
            $state.reload();
          } else {
            alert("There was a problem processing your request");
          }
        });
      };
    }
  };
});

angular.module("b66Living").directive("addInvoice", function () {
  return {

    templateUrl: "./templates/directiveTemplates/addInvoice.html",

    restrict: "AE",
    link: function link(scope, element, attributes) {},
    controller: function controller($scope, mainService, $stateParams, $state) {
      $scope.createInv = function (invoicePeriod, invoiceDesc) {
        var invoice = {
          invoicePeriod: invoicePeriod,
          invoiceDesc: invoiceDesc
        };
        mainService.createInvoice(invoice, $stateParams.id).then(function (res) {
          if (res.status === 200) {
            alert("Invoice Added");
            $state.reload();
          } else {
            alert("There was a problem processing your request");
          }
        });
      };
    }
  };
});

angular.module("b66Living").directive("addProjectDirective", function () {
  return {

    templateUrl: "./templates/directiveTemplates/addProject.html",

    restrict: "AE",
    link: function link(scope, element, attributes) {},
    // scope: {
    //
    // },
    controller: function controller($scope, mainService, $state) {
      //controller is working
      $scope.newproj = function (projectName, projectStartDate, projectDeadline) {
        //projData will turn the form in to an object that can be passed to the service
        var newProjectData = {
          name: projectName,
          startDate: projectStartDate,
          deadline: projectDeadline
        };
        mainService.createProj(newProjectData).then(function (res) {
          if (res.status === 200) {
            swal("Project Added");
            $state.reload();
          } else {
            //this part isn't working. If the post fails it just gives an error in the console with the err status
            alert("There was a problem processing your request");
          }
        });
      };
    }
  };
});

angular.module("b66Living").directive("invoice", function () {
  return {

    templateUrl: "./templates/directiveTemplates/invoice.html",

    restrict: "AE",
    link: function link(scope, element, attributes) {},
    controller: function controller($scope, mainService, $stateParams) {
      mainService.getProducts($stateParams.id, $stateParams.invoiceId).then(function (res) {
        $scope.products = res.data;
        console.log(res.data);
      });

      var productIndex = function productIndex() {
        var productLength = res.data.length;
        for (var i = 0; i < productLength; i++) {
          var subtot = 0;
          // subtot += Number(res.data[i])
          // console.log(i);
          $scope.index = i + 1;
          $scope.productSubtotal = subtot;
        }
      }; // End of productIndex

      productIndex();
      // console.log($stateParams);
      $scope.addProduct = function (productDescription, productWholesale, productRetail, productTax) {
        var newProduct = {
          description: productDescription,
          wholesale: productWholesale,
          retail: productRetail,
          tax: productTax
        };
        mainService.addProduct($stateParams.invoiceId, newProduct).then(function (res) {
          if (res === 200) {
            swal("Product Added!");
          }
        });
      }; //End of addProduct
    } //End of Controller
  }; //End of directive return statement
}); //End of directive

angular.module("b66Living").directive("navBar", function () {
  return {

    templateUrl: "./templates/directiveTemplates/navBar.html",

    restrict: "AE",
    link: function link(scope, element, attributes) {},
    controller: function controller($scope, mainService, $stateParams) {
      $scope.projectState = $stateParams.id;

      if ($scope.projectState) {
        mainService.getProject($stateParams.id).then(function (res) {

          //  console.log("if statement works");
          $scope.navProjectName = res.data[0].project_name;
        });
      } else {
        $scope.navProjectName = 'Projects';
      }
      // console.log(res.data[0].project_name);

    }
  };
});

angular.module("b66Living").directive("project", function () {
  return {

    templateUrl: "./templates/directiveTemplates/project.html",

    restrict: "AE",
    link: function link(scope, element, attributes) {},
    controller: function controller($scope, mainService, $stateParams, $state) {
      mainService.getProject($stateParams.id).then(function (res) {
        //  console.log(res.data[0].project_id);
        $scope.project = res.data;
        $scope.projectId = res.data[0].project_id;
      });

      mainService.getInvoices($stateParams.id).then(function (res) {
        $scope.invoices = res.data;
        // console.log(res.data);
      });

      mainService.getCustomers($stateParams.id).then(function (res) {
        $scope.customers = res.data;
      });

      $scope.deleteCustomer = function (customerId) {
        swal({
          title: "Are you sure?",
          text: "You will not be able to recover this customer's information!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        }, function () {
          mainService.deleteCustomer(customerId).then(function (res) {
            if (res.status === 200) {
              swal("Deleted!", "Customer removed from project.", "success");
              $state.reload();
            }
          });
        });
      };
      $scope.deleteInvoice = function (invoiceId) {
        swal({
          title: "Are you sure?",
          text: "You will not be able to recover this invoice!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        }, function () {
          mainService.deleteInvoice(invoiceId).then(function (res) {
            if (res.status === 200) {
              swal("Deleted!", "Invoice removed from project.", "success");
              $state.reload();
            }
          });
        });
      };
    }
  };
});

angular.module("b66Living").directive("projectSummaries", function () {
  return {

    templateUrl: "./templates/directiveTemplates/projectSummaries.html",

    restrict: "AE",
    link: function link(scope, element, attributes) {},
    controller: function controller($scope, mainService, $state) {
      mainService.showProjects().then(function (res) {
        console.log(res.data);
        $scope.projects = res.data;
      });

      $scope.deleteProject = function (projectId) {
        swal({
          title: "Are you sure?",
          text: "You will not be able to recover any information from this project!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        }, function () {
          mainService.deleteInvoices(projectId).then(function (res) {
            if (res.status === 200) {
              mainService.deleteCustomers(projectId).then(function (res) {
                if (res.status === 200) {
                  mainService.deleteProject(projectId).then(function (res) {
                    if (res.status === 200) {
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

angular.module("b66Living").service("mainService", function ($http) {
  //POST Endpoints!
  this.createProj = function (newProjectData) {
    return $http.post("admin/project/new", newProjectData);
  };
  this.createCust = function (customer, id) {
    return $http.post("admin/project/" + id + "/customer/new", customer);
  };
  this.createInvoice = function (invoice, id) {
    return $http.post("admin/project/" + id + "/invoice/new", invoice);
  };
  this.addProduct = function (invoiceId) {
    return $http.post("admin/project/invoice/" + inovoiceId);
  };
  //GET Endpoints!
  this.showProjects = function () {
    return $http.get("admin/projects");
  };
  this.getProject = function (id) {
    return $http.get("admin/project/" + id);
  };
  this.getInvoices = function (id) {
    return $http.get("admin/project/" + id + "/invoices");
  };
  this.getCustomers = function (id) {
    return $http.get("admin/project/" + id + "/customers");
  };
  this.getProducts = function (id, invoiceId) {
    return $http.get("admin/project/" + id + "/invoice/" + invoiceId + "/products");
  };
  //DELETE Endpoints!
  this.deleteCustomer = function (customerId) {
    return $http.delete("admin/project/customer/" + customerId);
  };
  this.deleteCustomers = function (id) {
    return $http.delete("admin/project/" + id + "/customers");
  };
  this.deleteInvoice = function (invoiceId) {
    return $http.delete("admin/project/invoice/" + invoiceId);
  };
  this.deleteInvoices = function (id) {
    return $http.delete("admin/project/" + id + "/invoices");
  };
  this.deleteProject = function (id) {
    return $http.delete("admin/project/" + id);
  };
});
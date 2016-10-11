"use strict";

angular.module("b66Living", ["ui.router"]).config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
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
    url: "/"
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

        console.log($stateParams.id);
        mainService.createCust(customer, $stateParams.id).then(function (res) {
          if (res.status === 200) {
            alert("Customer Added");
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
    controller: function controller($scope, mainService) {
      //controller is working
      $scope.newproj = function (projectName, ProjectStartDate, ProjectDeadline) {
        //projData will turn the form in to an object that can be passed to the service
        var projData = {
          projectName: projectName,
          ProjectStartDate: ProjectStartDate,
          ProjectDeadline: ProjectDeadline
        };
        mainService.createProj(projData).then(function (res) {
          if (res.status === 200) {
            alert("Project Added");
          } else {
            //this part isn't working. If the post fails it just gives an error in the console with the err status
            alert("There was a problem processing your request");
          }
        });
      };
    }
  };
});

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
        $scope.navProjectName = 'Project Button';
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
    controller: function controller($scope, mainService, $stateParams) {
      // $scope.getProject =
      mainService.getProject($stateParams.id).then(function (res) {
        // console.log(res.data);
        $scope.project = res.data;
      });

      // $scope.getInvoices =
      mainService.getInvoices($stateParams.id).then(function (res) {
        // console.log(res.data);
        $scope.invoices = res.data;
      });

      // $scope.getCustomers =
      mainService.getCustomers($stateParams.id).then(function (res) {
        $scope.customers = res.data;
      });
    }
  };
});

angular.module("b66Living").directive("projectSummaries", function () {
  return {

    templateUrl: "./templates/directiveTemplates/projectSummaries.html",

    restrict: "AE",
    link: function link(scope, element, attributes) {},
    controller: function controller($scope, mainService, $state) {

      // $scope.getProjects = function(){
      mainService.showProjects().then(function (res) {
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

angular.module("b66Living").service("mainService", function ($http) {
  //POST Endpoints!
  this.createProj = function (data) {
    return $http.post("admin/project/new", data);
  };
  this.createCust = function (customer, id) {
    return $http.post("admin/project/" + id + "/customer/new", customer);
  };
  this.createInvoice = function (invoice, id) {
    return $http.post("admin/project/" + id + "/invoice/new", invoice);
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
});
angular.module("b66Living")
  .service("mainService", function($http){
//POST Endpoints!
    this.createProj = function(newProjectData){
      return $http.post("admin/project/new", newProjectData);
    };
    this.createCust = function(customer, id){
      return $http.post("admin/project/" + id + "/customer/new", customer);
    };
    this.createInvoice = function(invoice, id){
      return $http.post("admin/project/"+id+"/invoice/new", invoice);
    };
    //GET Endpoints!
    this.showProjects = function(){
      return $http.get("admin/projects");
    };
    this.getProject = function(id){
      return $http.get("admin/project/"+id);
    };
    this.getInvoices = function(id){
      return $http.get("admin/project/"+id+"/invoices");
    };
    this.getCustomers = function(id){
      return $http.get("admin/project/"+id+"/customers");
    };
  });

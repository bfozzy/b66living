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
    this.addProduct = function(invoiceId, newProduct){
      // console.log(newProduct, invoiceId);
      return $http.post("admin/project/invoice/"+invoiceId, newProduct);
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
    this.getProducts = function(id, invoiceId){
      return $http.get("admin/project/"+id+"/invoice/"+invoiceId+"/products");
    };
    //DELETE Endpoints!
    this.deleteCustomer = function(customerId){
      return $http.delete("admin/project/customer/" + customerId);
    };
    this.deleteCustomers = function(id){
      return $http.delete("admin/project/"+id+"/customers");
    };
    this.deleteInvoice = function(invoiceId){
      return $http.delete("admin/project/invoice/" + invoiceId);
    };
    this.deleteInvoices = function(id){
      return $http.delete("admin/project/"+id+"/invoices");
    };
    this.deleteProject = function(id){
      return $http.delete("admin/project/" + id);
    };
  });

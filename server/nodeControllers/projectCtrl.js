var app = require("../server.js");
var db = app.get("db");

module.exports = {
  //CREATE Funcitons!
  createNewProject: function(req, res){
    db.create_new_project([req.body.name, req.body.startDate, req.body.deadline], function(err){
      if(err){
        res.status(400).json(err);
      }
      else {
        res.status(200).json("Project Added");
      }
    });
  },
  createNewCustomer: function(req, res){
    // console.log(req.body)
    db.create_new_customer([req.body.name, req.body.email, req.body.phone, req.params.id], function(err){
      if(err){
        res.status(400).json(err);
      }
      else {
        res.status(200).json("Customer Added");
      }
    });

  },
createNewInvoice: function(req, res){
  db.create_new_invoice([req.params.id, req.body.invoicePeriod, req.body.invoiceDesc], function(err){
    if(err){
      res.status(400).json(err);
    }
    else {
      res.status(200).json("Invoice Added");
    }
  });
},
createNewProduct: function(req, res){
  db.create_new_product([req.params.invoiceId, req.body.description, req.body.wholesale,req.body.retail, req.body.tax], function(err){
    if(err){
      res.status(400).json(err);
    }
    else {
      res.status(200).json("Invoice Added");
    }
  });
},
  //GET Functions
  getProjects: function(req, res){
    db.get_projects(function(err, projects){
      if(err){
        res.status(400).json(err);
      }
      else {
        res.status(200).json(projects);
      }
    });
  },
  getProject: function(req,res) {
    db.get_project([req.params.id], function(err, project){
      if(err){
        res.status(400).json(err);
      }
      else{
        res.status(200).json(project);
      }

    });

  },
  getInvoices: function(req,res) {
    db.get_invoices([req.params.id], function(err, invoices){
      if(err){
        res.status(400).json(err);
      }
      else{
        res.status(200).json(invoices);
      }

    });
  },

  getCustomers: function(req,res) {
    db.get_customers([req.params.id], function(err, customers){
      if(err){
        res.status(400).json(err);
      }
      else{
        res.status(200).json(customers);
      }

    });
  },
  getProducts: function(req,res) {
    db.get_products([req.params.invoiceId], function(err, products){
      if(err){
        res.status(400).json(err);
      }
      else{
        res.status(200).json(products);
      }

    });
  },
  //Delete Functions!!!!
  deleteCustomer: function(req,res){
    db.delete_customer(req.params.customerId, function(err){
      if(err){
        res.status(400).json(err);
      }
      else{
        res.status(200).json("Project Deleted");
      }
    });
  },
  deleteInvoice: function(req,res){
    db.delete_invoice(req.params.invoiceId, function(err){
      if(err){
        res.status(400).json(err);
      }
      else{
        res.status(200).json("Invoice Deleted");
      }
    });
  },

  ////ALL OF THIS HAPPENS WHEN A PROJECT IS DELETED!!!!!!!!!!!
  deleteProject: function(req,res){
    db.delete_project(req.params.id,  function(err){
      if(err){
        res.status(400).json(err);
      }
      else{
        res.status(200).json("Project Deleted");
      }
    });
  },
  deleteInvoices: function(req,res){
    db.delete_project_invoices(req.params.id, function(err){
      if(err){
        res.status(400).json(err);
      }
      else{
        res.status(200).json("Invoices deleted");
      }
    });
  },
  deleteCustomers: function(req,res){
    db.delete_project_customers(req.params.id, function(err){
      if(err){
        res.status(400).json(err);
      }
      else{
        res.status(200).json("Customers deleted");
      }
    });
  }
//END OF PROJECT DELETION TASKS!!!




};

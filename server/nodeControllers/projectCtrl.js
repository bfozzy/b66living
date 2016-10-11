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
  db.create_new_invoice([req.params.id, req.body.invoicePeriod, req.body.invoiceDesc], function(err, invoice){
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
      console.log(projects);
      if(err){
        res.status(400).json(err);
      }
      else {
        res.status(200).json(projects);
        console.log(projects);
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
      // db.get_customer([req.params.id], function(err, customer){
      //   if(err){
      //     res.status(400).json(err);
      //   }
      //   else{
      //     res.status(200).json(customer);
      //   }
      // })
      // console.log(project);
    });
    // console.log(req.params.id); req.params.id is logging correctly
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
  }





};

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var massive = require("massive");
var serverConfig = require("./serverconfig.js");
var connectionString = serverConfig.connectionString;
var app = module.exports = express();
var massiveInstance = massive.connectSync({connectionString : connectionString});


app.set("db", massiveInstance);
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

//Controllers!
var projectCtrl = require("./nodeControllers/projectCtrl.js");

// POST Endpoints!
app.post("/admin/project/new", projectCtrl.createNewProject);
app.post("/admin/project/:id/customer/new", projectCtrl.createNewCustomer);
app.post("/admin/project/:id/invoice/new", projectCtrl.createNewInvoice);
app.post("/admin/project/invoice/:invoiceId", projectCtrl.createNewProduct);

//GET Endpoints!
app.get("/admin/projects", projectCtrl.getProjects);
app.get("/admin/project/:id", projectCtrl.getProject);
app.get("/admin/project/:id/invoices", projectCtrl.getInvoices);
app.get("/admin/project/:id/customers", projectCtrl.getCustomers);
app.get("/admin/project/:id/invoice/:invoiceId/products", projectCtrl.getProducts);
app.get("/admin/project/:id/invoice/:invoiceId", projectCtrl.getInvoice);

//Delete Endpoints!!!
app.delete("/admin/project/customer/:customerId", projectCtrl.deleteCustomer);
app.delete("/admin/project/invoice/:invoiceId", projectCtrl.deleteInvoice);
//THESE ALL HAPPEN WHEN A PROJECT IS DELETED!!!!
app.delete("/admin/project/:id", projectCtrl.deleteProject);
app.delete("/admin/project/:id/customers", projectCtrl.deleteInvoices);
app.delete("/admin/project/:id/invoices", projectCtrl.deleteCustomers);
//END OF PROJECT DELETION TASKS!!!



var port = serverConfig.serverPort;

app.listen(port, function(){
  console.log("listening to 8001");
});

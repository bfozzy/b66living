select * from projects
join customers
on projects.id = customers.project_id
join addresses
on customers.id = addresses.customer_id
join invoices
on projects.id = invoices.project_id 

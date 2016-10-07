select
projects.id as project_id,
projects.name as project_name,
projects.startdate as project_start_date,
projects.deadline as project_deadline,
customers.id as customer_id,
customers.name as customer_name,
customers.email as customer_email,
customers.phone as customer_phone,
addresses.line_1 as address_line1,
addresses.line_2 as address_line2,
addresses.city as address_city,
addresses.state as address_state,
addresses.zip as address_zip,
invoices.id as invoice_id,
invoices.description as invoice_description,
invoices.period as invoice_period,
invoices.subtotal as invoice_subtotal,
invoices.paid as invoice_paid

from projects
full join customers
on projects.id = customers.project_id
full join addresses
on customers.id = addresses.customer_id
full join invoices
on projects.id = invoices.project_id
where projects.id = $1

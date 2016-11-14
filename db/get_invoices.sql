select
invoices.id as invoice_id,
invoices.description as invoice_description,
invoices.period as invoice_period
from invoices
where project_id = $1

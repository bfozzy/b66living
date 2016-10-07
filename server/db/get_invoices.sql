select
invoices.id as invoice_id,
invoices.description as invoice_description,
invoices.period as invoice_period,
invoices.subtotal as invoice_subtotal,
invoices.paid as invoice_paid
from invoices
where project_id = $1




export function validateTransaction(transaction) {
  if (!transaction) return "No transaction received"
  if (!transaction.category) return "No category selected"
  if (!transaction.amount) return "No amount provided"

}

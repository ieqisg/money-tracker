


export function validateAddTransaction(transaction) {
  if (!transaction) return { success: false, message: "No transaction received" }
  if (!transaction.category) return { success: false, message: "No category selected" }
  if (!transaction.amount) return { success: false, message: "No amount provided" }
  return { success: true }
}

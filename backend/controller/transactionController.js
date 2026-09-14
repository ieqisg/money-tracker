import { addTransactionModel } from "../models/transactionModel"
import { validateAddTransaction } from "../validation/transactionValidator"



export async function addTransactionController(req, res) {
  try {
    const userId = req.userId

    if (!userId) return res.status(401).json({ success: false, message: "User id is required" })
    const isAddTransactionValid = validateAddTransaction(req.body)

    if (isAddTransactionValid.success === false) return res.status(422).json({ success: false, message: isAddTransactionValid.message })

    const transactionData = await { userId, ...req.body }
    const addTransaction = await addTransactionModel(transactionData)

    if (!addTransaction) return res.status(400).json({ success: false, message: "No received data", addTransaction })

    return res.status(201).json({ success: true, data: addTransaction, message: "Transaction added successfully" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message })
  }
}

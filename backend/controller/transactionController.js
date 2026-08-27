


export async function addTransaction(req, res) {
  try {
    const userId = req.userId
    if (!userId) return res.status(401).json({ success: false, message: "User id is required" })
    const result = await { userId, ...req.body }

    if (!result) return res.status(400).json({ success: false, message: "No received data", result })
    return res.status(201).json({ success: true, data: result, message: "Transaction added successfully" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message })
  }
}

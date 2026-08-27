import { Router } from "express";

import { requireAuth } from "../middleware/authMiddleware";
import { addTransaction } from "../controller/transactionController";
const router = Router();



router.post("/transaction", requireAuth, addTransaction)
export default router;




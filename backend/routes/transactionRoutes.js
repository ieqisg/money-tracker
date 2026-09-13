import { Router } from "express";

import { requireAuth } from "../middleware/authMiddleware";
import { addTransactionController } from "../controller/transactionController";
const router = Router();



router.post("/transaction", requireAuth, addTransactionController)
export default router;




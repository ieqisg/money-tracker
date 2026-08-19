import { Router } from "express";
import { createProfile } from "../controller/userController";
import { profileValidation } from "../middleware/profileValidator";
import { profileSchemaValidation } from "../validation/profileSchemaValidation";
import { requireAuth } from "../middleware/authMiddleware";
const router = Router();

router.post(
  "/createProfile",
  requireAuth,
  profileValidation(profileSchemaValidation),
  createProfile,
);

export default router;

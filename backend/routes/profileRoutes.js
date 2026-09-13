import { Router } from "express";
import { createProfile, getProfile } from "../controller/userController";
import { profileValidation } from "../validation/profileValidator";
import { profileSchemaValidation } from "../validation/profileSchemaValidation";
import { requireAuth } from "../middleware/authMiddleware";
const router = Router();

router.post(
  "/profile",
  requireAuth,
  profileValidation(profileSchemaValidation),
  createProfile,
);

router.get("/profile", requireAuth, getProfile)
export default router;

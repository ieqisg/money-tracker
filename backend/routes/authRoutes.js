import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../config/auth";
import { requireAuth } from "../middleware/authMiddleware";
import { createProfile, findExistingUser } from "../controller/userController";

const router = Router();
router.get("/test", (req, res) => {
  res.json({ message: "Auth router works!" });
});
//todo: add middleware later
router.get("/authTest", findExistingUser);

router.all("/{*any}", (req, res, next) => {
  console.log("Better Auth route hit:", req.method, req.path);
  return toNodeHandler(auth)(req, res, next);
});

export default router;

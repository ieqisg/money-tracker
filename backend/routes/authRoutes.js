import { Router } from "express"
import { toNodeHandler } from "better-auth/node";
import { auth } from "../config/auth";

const router = Router()
router.get("/test", (req, res) => {
  res.json({ message: "Auth router works!" });
});
router.all("/{*any}", (req, res, next) => {
  console.log("Better Auth route hit:", req.method, req.path);
  return toNodeHandler(auth)(req, res, next);
});

export default router;

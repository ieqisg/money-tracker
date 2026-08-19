import { auth } from "../config/auth";

export async function requireAuth(req, res, next) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  req.userId = session.user.id;
  req.user = session.user;
  req.session = session.session;
  next();
}

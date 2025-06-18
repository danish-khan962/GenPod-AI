import { clerkClient, verifyToken } from '@clerk/clerk-sdk-node';

export const authenticateRequest = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const session = await verifyToken(token);
    req.user = session?.sessionClaims;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

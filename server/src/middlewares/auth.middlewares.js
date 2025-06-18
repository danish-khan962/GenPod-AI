import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

export const authenticateRequest = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
});
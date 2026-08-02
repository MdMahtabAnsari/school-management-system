import { createAuthClient } from "better-auth/client";
import {
  adminClient,
  organizationClient,
  usernameClient,
  twoFactorClient,
  emailOTPClient,
  multiSessionClient,
  magicLinkClient,
  lastLoginMethodClient
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL, // e.g. http://localhost:3000

  plugins: [
    emailOTPClient(),
    multiSessionClient(),
    twoFactorClient(),
    usernameClient(),
    adminClient(),
    organizationClient(),
    magicLinkClient(),
    lastLoginMethodClient(),
  ],
});
import { createAuthClient } from "better-auth/react";
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
import {
  ac as orgAc,
  admin as orgAdmin,
  principal,
  vicePrincipal,
  registrar,
  teacher,
  accountant,
  librarian,
  receptionist,
  transportManager,
  hostelWarden,
  nurse,
  hr,
  security,
  supportStaff,
  member,
  guardian,
  owner,
} from '../permissions/organization.permission.js';
import {
  superAdmin,
  admin,
  user,
  ac,
} from '../permissions/admin.permission.js';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL, // e.g. http://localhost:3000

  plugins: [
    emailOTPClient(),
    multiSessionClient(),
    twoFactorClient(),
    usernameClient(),
    adminClient({
      defaultRole: 'user',
      ac,
      roles: {
        superAdmin,
        admin,
        user,
      },
    }),
    organizationClient(
      {
        ac: orgAc,
        roles: {
          owner,
          admin: orgAdmin,
          principal,
          vicePrincipal,
          registrar,
          teacher,
          accountant,
          librarian,
          receptionist,
          transportManager,
          hostelWarden,
          nurse,
          hr,
          security,
          supportStaff,
          member,
          guardian,
        },
        dynamicAccessControl: {
          enabled: true,
        },
        teams: {
          enabled: true,

        },
      },
    ),
    magicLinkClient(),
    lastLoginMethodClient(),
  ],
});
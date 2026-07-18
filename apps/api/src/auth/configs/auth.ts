import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import {
  twoFactor,
  username,
  magicLink,
  admin as adminPlugin,
  lastLoginMethod,
  openAPI,
  multiSession,
  emailOTP,
  bearer,
  organization,
} from 'better-auth/plugins';
import { prisma } from '@workspace/db/nestjs';
import { username as usernameSchema } from '@/auth/configs/common';
import {
  admin,
  schoolAdmin,
  user,
  ac,
} from '@/auth/configs/permissions/admin.permission';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  experimental: {
    joins: true,
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async () => { },
    },
  },
  emailAndPassword: {
    requireEmailVerification: true,
    enabled: true,
    sendResetPassword: async () => { },
  },
  emailVerification: {
    sendVerificationEmail: async () => { },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    afterEmailVerification: async () => { },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  plugins: [
    bearer(),
    emailOTP({
      async sendVerificationOTP() { },
    }),
    multiSession(),
    twoFactor({
      issuer: 'vaultkey',
      otpOptions: {
        sendOTP: async () => { },
      },
    }),
    username({
      usernameValidator: (username) => {
        return usernameSchema.safeParse(username).success;
      },
    }),
    magicLink({
      sendMagicLink: async () => { },
    }),
    adminPlugin({
      defaultRole: 'user',
      ac,
      roles: {
        admin,
        schoolAdmin,
        user,
      },
    }),
    lastLoginMethod(),
    ...(process.env.NODE_ENV === 'development' ? [openAPI()] : []),
    organization({
      dynamicAccessControl: {
        enabled: true,
      },
      teams: {
        enabled: true,

      },
    }),
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    ...(process.env.TRUSTED_CLIENT_URL?.split(',') || []),
    ...(process.env.NODE_ENV === 'development'
      ? [
        'exp://', // Trust all Expo URLs (prefix matching)
        'exp://**', // Trust all Expo URLs (wildcard matching)
        'exp://192.168.*.*:*/**', // Trust 192.168.x.x IP range with any port and path
      ]
      : []),
  ],
  url: process.env.BETTER_AUTH_URL,
});

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
import { PrismaService } from '@/prisma/prisma.service';
import { username as usernameSchema } from '@/auth/configs/common';
import {
  admin,
  schoolAdmin,
  user,
  ac,
} from '@/auth/configs/permissions/admin.permission';
import {
  ac as orgAc,
  admin as orgAdmin,
  schoolAdmin as orgSchoolAdmin,
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
  student,
  guardian,
} from '@/auth/configs/permissions/organization.permission';
import {Role,SchoolRole} from '@workspace/db/generated/prisma/cjs/enums';

export const nestAuth = (prisma: PrismaService) => {
  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
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
      defaultRole: Role.USER,
      ac,
      roles: {
        [Role.ADMIN]: admin,
        [Role.SCHOOL_ADMIN]: schoolAdmin,
        [Role.USER]: user,
      },
    }),
      lastLoginMethod(),
      ...(process.env.NODE_ENV === 'development' ? [openAPI()] : []),
      organization({
            ac: orgAc,
            roles: {
              [SchoolRole.ADMIN]: orgAdmin,
              [SchoolRole.SCHOOL_ADMIN]: orgSchoolAdmin,
              [SchoolRole.PRINCIPAL]: principal,
              [SchoolRole.VICE_PRINCIPAL]: vicePrincipal,
              [SchoolRole.REGISTRAR]: registrar,
              [SchoolRole.TEACHER]: teacher,
              [SchoolRole.ACCOUNTANT]: accountant,
              [SchoolRole.LIBRARIAN]: librarian,
              [SchoolRole.RECEPTIONIST]: receptionist,
              [SchoolRole.TRANSPORT_MANAGER]: transportManager,
              [SchoolRole.HOSTEL_WARDEN]: hostelWarden,
              [SchoolRole.NURSE]: nurse,
              [SchoolRole.HR]: hr,
              [SchoolRole.SECURITY]: security,
              [SchoolRole.SUPPORT_STAFF]: supportStaff,
              [SchoolRole.STUDENT]: student,
              [SchoolRole.GUARDIAN]: guardian,
            },
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
        maxAge: 60, //seconds
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
};

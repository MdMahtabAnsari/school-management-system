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
import { username as usernameSchema } from '@workspace/auth/common';
import {
  superAdmin,
  admin,
  user,
  ac,
} from '@workspace/auth/permissions/admin.permission';
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
} from '@workspace/auth/permissions/organization.permission';
import { EmailQueueService } from '@/notification/email-queue.service';
import { APIError } from "better-auth/api";


export const nestAuth = (prisma: PrismaService, emailQueueService: EmailQueueService) => {
  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    user: {
      changeEmail: {
        enabled: true,
        sendChangeEmailVerification: async ({ user, newEmail, url }) => {
          await emailQueueService.changeEmail({ user, url, email: newEmail });
        },
      },
    },
    emailAndPassword: {
      requireEmailVerification: true,
      enabled: true,
      sendResetPassword: async ({ user, url }) => {
        await emailQueueService.resetPassword({ user, url });
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        await emailQueueService.verificationEmail({ user, url });
      },
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      afterEmailVerification: async (user) => {
        await emailQueueService.welcomeEmail({ user });
      },
    },
    account: {
      accountLinking: {
        enabled: true,
      },
    },
    plugins: [
      bearer(),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          if (type === 'sign-in') {
            await emailQueueService.signInOTP({ email, otp });
          } else if (type === 'email-verification') {
            await emailQueueService.emailVerificationOTP({ email, otp });
          }
          else if (type === 'forget-password') {
            await emailQueueService.forgotPasswordOTP({ email, otp });
          }
          else {
            await emailQueueService.changeEmailOTP({ email, otp });
          }

        },
      }),
      multiSession(),
      twoFactor({
        issuer: 'School Management System',
        otpOptions: {
          sendOTP: async ({ user, otp }) => {
            await emailQueueService.OTPEmail({ user, otp });
          },
        },
      }),
      username({
        usernameValidator: (username) => {
          return usernameSchema.safeParse(username).success;
        },
      }),
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          await emailQueueService.magicLink({ email, url });
        },
      }),
      adminPlugin({
        defaultRole: 'user',
        ac,
        roles: {
          superAdmin,
          admin,
          user,
        },
      }),
      lastLoginMethod(),
      ...(process.env.NODE_ENV === 'development' ? [openAPI()] : []),
      organization({
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
        allowUserToCreateOrganization: async (user) => {
          return user.role === 'superAdmin';
        },

        organizationHooks: {
          beforeCreateInvitation: async ({
            invitation,
            inviter,
            organization,
          }) => {


            if (invitation.role === 'owner') {
              throw new APIError("FORBIDDEN", {
                message: "You cannot invite a user with owner role",
              });
            }
            else if (invitation.role === 'member') {
              const studentCount = await prisma.studentProfile.count({
                where: {
                  organizationId: organization.id,
                  user: {
                    email: invitation.email
                  }
                },
              });
              if (studentCount === 0) {
                throw new APIError("FORBIDDEN", {
                  message: "A matching profile must exist in this organization before an invitation can be sent.",
                });
              }
            }
            else if (invitation.role === 'guardian') {
              const studentCount = await prisma.guardian.count({
                where: {
                  organizationId: organization.id,
                  user: {
                    email: invitation.email
                  }
                },
              });
              if (studentCount === 0) {
                throw new APIError("FORBIDDEN", {
                  message: "A matching profile must exist in this organization before an invitation can be sent.",
                });
              }

            }
            else {
              const staffCount = await prisma.staffProfile.count({
                where: {
                  organizationId: organization.id,
                  role: invitation.role,
                  user: {
                    email: invitation.email
                  }
                },
              });
              if (staffCount === 0) {
                throw new APIError("FORBIDDEN", {
                  message: "A matching profile must exist in this organization before an invitation can be sent.",
                });
              }
            }

          },

          beforeAcceptInvitation: async ({ invitation, user, organization }) => {
            if (invitation.role === 'owner') {
              throw new APIError("FORBIDDEN", {
                message: "You cannot accept an invitation with owner role",
              });
            }
            if (invitation.role === 'member') {
              const studentCount = await prisma.studentProfile.count({
                where: {
                  organizationId: organization.id,
                  userId: user.id
                },
              });
              if (studentCount === 0) {
                throw new APIError("FORBIDDEN", {
                  message: "You must have a matching student profile in this organization to accept the invitation.",
                });
              }
            }
            else if (invitation.role === 'guardian') {
              const studentCount = await prisma.guardian.count({
                where: {
                  organizationId: organization.id,
                  userId: user.id
                },
              });
              if (studentCount === 0) {
                throw new APIError("FORBIDDEN", {
                  message: "You must have a matching guardian profile in this organization to accept the invitation.",
                });
              }
            }
            else {
              const staffCount = await prisma.staffProfile.count({
                where: {
                  organizationId: organization.id,
                  role: invitation.role,
                  userId: user.id
                },
              });
              if (staffCount === 0) {
                throw new APIError("FORBIDDEN", {
                  message: "You must have a matching staff profile in this organization to accept the invitation.",
                });
              }
            }
          }
        }

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

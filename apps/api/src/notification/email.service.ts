import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailUrlDto, UserUrlDto, UserUrlEmailDto } from '@/notification/dto/email/url.dto';
import { EmailOTPDto, UserOTPDto } from '@/notification/dto/email/otp.dto'
import { changeEmailEmailHTML } from '@workspace/email/auth/change-email-email';
import { resetPasswordEmailHTML } from '@workspace/email/auth/reset-password-email';
import {forgotPasswordOTPEmailHTML} from '@workspace/email/auth/otp/forget-password-otp-email';
import { verificationEmailHTML } from '@workspace/email/auth/verification-email';
import { welcomeEmailHTML } from '@workspace/email/auth/welcome-email';
import { signInOTPEmailHTML } from '@workspace/email/auth/otp/sign-in-otp-email';
import { resetPasswordOTPEmailHTML } from '@workspace/email/auth/otp/reset-password-otp-email';
import { emailVerificationOTPEmailHTML } from '@workspace/email/auth/otp/email-verification-otp-email';
import {changeEmailOTPEmailHTML} from '@workspace/email/auth/otp/change-email-otp-email';
import { otpEmailHTML } from '@workspace/email/auth/otp/otp-email';
import { magicLinkEmailHTML } from '@workspace/email/auth/magic-link-email';
import { User } from 'better-auth';


@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) { }

    async changeEmail({ user, url, email }: UserUrlEmailDto) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Change Email Request',
            html: await changeEmailEmailHTML({ user, url, newEmail: email }),
        });
    }

    async resetPassword({ user, url }: UserUrlDto) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Reset your password',
            html: await resetPasswordEmailHTML({ user, url }),
        });
    }
    async verificationEmail({ user, url }: UserUrlDto) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Verify your email',
            html: await verificationEmailHTML({ user, url }),
        });
    }
    async welcomeEmail({ user }: { user: User }) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to our service',
            html: await welcomeEmailHTML({ user }),
        });
    }
    async signInOTP({ email, otp }: EmailOTPDto) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Your Sign-In OTP',
            html: await signInOTPEmailHTML({ email, otp }),
        });
    }
    async resetPasswordOTP({ email, otp }: EmailOTPDto) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Your Reset Password OTP',
            html: await resetPasswordOTPEmailHTML({ email, otp }),
        });
    }
    async emailVerificationOTP({ email, otp }: EmailOTPDto) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Your Email Verification OTP',
            html: await emailVerificationOTPEmailHTML({ email, otp }),
        });
    }
    async OTPEmail({ user, otp }: UserOTPDto) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Your OTP',
            html: await otpEmailHTML({ user, otp }),
        });
    }
    async magicLink({ email, url }: EmailUrlDto) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Your Magic Link',
            html: await magicLinkEmailHTML({ url }),
        });
    }

    async changeEmailOTP({ email, otp }: EmailOTPDto) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Your Change Email OTP',
            html: await changeEmailOTPEmailHTML({ email, otp }),
        });
    }

    async forgotPasswordOTP({ email, otp }: EmailOTPDto) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Your Forgot Password OTP',
            html: await forgotPasswordOTPEmailHTML({ email, otp }),
        });
    }



}

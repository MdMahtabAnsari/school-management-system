import { User } from 'better-auth';
export class EmailOTPDto {
  readonly email!: string;
  readonly otp!: string;
}

export class UserOTPDto {
  readonly user!: User;
  readonly otp!: string;
}
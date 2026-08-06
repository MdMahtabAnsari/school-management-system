import { User } from 'better-auth';
export class EmailUrlDto {
  readonly email!: string;
  readonly url!: string;
}

export class UserUrlDto {
  readonly user!: User;
  readonly url!: string;
}

export class UserUrlEmailDto {
  readonly user!: User;
  readonly email!: string;
  readonly url!: string;
}
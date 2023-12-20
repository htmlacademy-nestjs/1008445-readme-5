import { compare, genSalt, hash } from 'bcrypt';
import { IAuthUser } from '@project/shared-library/app/types';
import { Entity } from '@project/shared-library/core';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements IAuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public name: string;
  public createdAt: Date;
  public avatarUrl: string;
  public passwordHash: string;

  constructor(user: IAuthUser) {
    this.populate(user)
  }

  public toPlainObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: new Date(),
      avatarUrl: this.avatarUrl,
      passwordHash: this.passwordHash,
    };
  }

  public populate(data: IAuthUser): void {
    this.email = data.email;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.avatarUrl = data.avatarUrl;
    this.passwordHash = data.passwordHash;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: IAuthUser): UserEntity {
    return new UserEntity(data);
  }
}

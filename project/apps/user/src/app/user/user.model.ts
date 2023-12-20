import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAuthUser } from '@project/shared-library/app/types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements IAuthUser {
  @Prop()
  public avatarUrl: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
  })
  public createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

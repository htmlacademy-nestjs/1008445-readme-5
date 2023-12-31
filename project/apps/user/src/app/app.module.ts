import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigUserModule, getMongooseOptions } from '@project/shared-library/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigUserModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

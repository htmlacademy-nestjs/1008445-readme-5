import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserRepository } from '../user/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { UserEntity } from '../user/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    console.log(configService.get<string>('db.host'));
    console.log(configService.get<string>('db.user'));
  }

  public async register(dto: CreateUserDTO) {
    const { email, name, password } = dto;

    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const user = {
      email,
      name,
      avatarUrl: '',
      createdAt: new Date(),
      passwordHash: ''
    };

    const userEntity = await new UserEntity(user).setPassword(password);
    return this.userRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDTO) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(`User with id ${ id } not found`);
    }
    return existUser;
  }
}

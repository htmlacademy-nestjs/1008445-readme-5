import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared-library/helpers';
import { AuthService } from './auth.service';
import { UserRDO } from './rdo/user.rdo';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import {
  AUTH_USER_CREATED,
  AUTH_USER_FOUND,
  AUTH_USER_LOGGED,
  AUTH_USER_PASSWORD_OR_LOGIN_WRONG
} from './auth.constant';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AUTH_USER_CREATED
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);
    return fillDto(UserRDO, newUser.toPlainObject());
  }

  @ApiResponse({
    type: LoggedUserRDO,
    status: HttpStatus.OK,
    description: AUTH_USER_LOGGED
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AUTH_USER_PASSWORD_OR_LOGIN_WRONG,
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDTO) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillDto(LoggedUserRDO, verifiedUser.toPlainObject());
  }

  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: AUTH_USER_FOUND
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDto(UserRDO, existUser.toPlainObject());
  }
}

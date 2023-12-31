import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRDO {
  @Expose()
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatarUrl: string;

  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1981-03-12'
  })
  @Expose()
  public dateOfBirth: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks'
  })
  @Expose()
  public name: string;
}

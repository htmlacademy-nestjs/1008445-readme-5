import { ApiProperty } from "@nestjs/swagger";
import { Expose } from 'class-transformer';

export class CommentRDO {
  @Expose()
  @ApiProperty()
  readonly id: string;

  @Expose()
  @ApiProperty()
  public postId: string;

  @Expose()
  @ApiProperty()
  public text: string;
}

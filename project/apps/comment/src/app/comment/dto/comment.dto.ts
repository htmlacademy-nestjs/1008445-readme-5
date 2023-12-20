import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { COMMENT_TEXT_MAX_LENGTH, COMMENT_TEXT_MIN_LENGTH } from '../comment.constant';

export type TCommentId = string

export class CommentDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public postId: string;

  @ApiProperty()
  @IsString()
  @MinLength(COMMENT_TEXT_MIN_LENGTH)
  @MaxLength(COMMENT_TEXT_MAX_LENGTH)
  public text: string;
}

export class CommentIdDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly commentId: TCommentId;
}

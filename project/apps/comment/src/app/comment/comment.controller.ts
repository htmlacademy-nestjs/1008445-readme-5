import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared-library/helpers';
import { COMMENT_CREATED, COMMENT_DELETED, COMMENTS_FOUND } from './comment.constant';
import { CommentDTO, CommentIdDTO } from './dto/comment.dto';
import { CommentService } from './comment.service';
import { UserRDO } from '../../../../user/src/app/auth/rdo/user.rdo';
import { PostIdDTO } from '@project/shared-library/app/types';
import { CommentRDO } from './rdo/comment.rdo';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: COMMENT_CREATED
  })
  @Post('add')
  public async create(@Body() dto: CommentDTO, @Param() postId: PostIdDTO) {
    const newComment = await this.commentService.addComment(dto, postId);
    return fillDto(CommentRDO, newComment.toPlainObject());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: COMMENT_DELETED
  })
  @Delete('delete')
  public async delete(@Body() dto: CommentIdDTO) {
    return await this.commentService.deleteComment(dto);
  }

  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: COMMENTS_FOUND
  })
  @Get(':postId')
  public async show(@Param('postId') postId: PostIdDTO) {
    const comments = await this.commentService.getComments(postId);
    return fillDto(UserRDO, comments.map((comment) => comment.toPlainObject()));
  }
}

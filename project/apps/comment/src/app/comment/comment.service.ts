import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentDTO, CommentIdDTO } from './dto/comment.dto';
import { PostIdDTO } from '@project/shared-library/app/types';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {
  }

  async addComment(data: CommentDTO, postId: PostIdDTO) {
    const commentEntity = new CommentEntity(data, postId);
    return this.commentRepository.save(commentEntity);
  }
  async deleteComment({ commentId }: CommentIdDTO) {
    return this.commentRepository.deleteById(commentId);
  }

  public async getComments(postId: PostIdDTO) {
    return this.commentRepository.findByPostId(postId);
  }
}

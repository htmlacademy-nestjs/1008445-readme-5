import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared-library/core';
import { CommentEntity } from './comment.entity';
import { PostIdDTO } from '@project/shared-library/app/types';

@Injectable()
export class CommentRepository extends BaseMemoryRepository<CommentEntity>{
  public findByPostId({ postId }: PostIdDTO): Promise<CommentEntity[] | null> {
    const entities = Array.from(this.entities.values());
    const comments = entities.filter((entity) => entity.postId === postId);
    return Promise.resolve(comments);
  }
}

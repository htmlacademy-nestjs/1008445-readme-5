import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared-library/core';
import { PostEntity } from './post.entity';

@Injectable()
export class PostRepository extends BaseMemoryRepository<PostEntity>{
  public findByTitle(title: string): Promise<PostEntity | null> {
    const entities = Array.from(this.entities.values());
    const post = entities.find((entity) => entity.title === title);
    return Promise.resolve(post);
  }
}

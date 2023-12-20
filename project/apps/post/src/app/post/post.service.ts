import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostDto } from '@project/shared-library/app/types';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {
  }

  async addPost(dto: PostDto): Promise<PostEntity> {
    const {
      title,
      youtubeVideoUrl,
      announcement,
      text,
      quote,
      author,
      link,
      linkDescription,
      photo,
      tags
    } = dto;

    const post = {
      title,
      youtubeVideoUrl,
      announcement,
      text,
      quote,
      author,
      link,
      linkDescription,
      photo,
      tags
    };
    // @ts-ignore
    return this.postRepository.save(post)
  }

  public async getPost(id: string) {
    return this.postRepository.findById(id);
  }
}

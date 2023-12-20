import { Entity } from '@project/shared-library/core';
import { CommentDTO } from './dto/comment.dto';
import { PostIdDTO } from '@project/shared-library/app/types';

export class CommentEntity implements Entity<string> {
  public id?: string;
  public postId?: string;
  public text: string;

  constructor(comment: CommentDTO, postId: PostIdDTO) {
    this.populate(comment, postId)
  }

  public toPlainObject() {
    return {
      id: this.id,
      postId: this.postId,
      text: this.text,
    };
  }

  public populate(data: CommentDTO, { postId }: PostIdDTO): void {
    this.text = data.text;
    this.postId = postId;
  }
}

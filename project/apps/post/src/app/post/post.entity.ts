import { Entity } from '@project/shared-library/core';
import { PostDto } from '@project/shared-library/app/types';
import { MemoryStoredFile } from 'nestjs-form-data';

export class PostEntity implements Entity<string> {
  public id?: string;
  public title?: string;
  public youtubeVideoUrl?: string;
  public announcement?: string;
  public text?: string;
  public quote?: string;
  public author?: string;
  public link?: string;
  public linkDescription?: string;
  public photo?: MemoryStoredFile;
  public tags?: string[];

  constructor(post: PostDto) {
    this.populate(post)
  }

  public toPlainObject() {
    return {
      id: this.id,
      title: this.title,
      youtubeVideoUrl: this.youtubeVideoUrl,
      announcement: this.announcement,
      text: this.text,
      quote: this.quote,
      author: this.author,
      link: this.link,
      linkDescription: this.linkDescription,
      photo: this.photo,
      tags: this.tags,
    };
  }

  public populate(post: PostDto): void {
    this.title = post.title;
    this.youtubeVideoUrl = post.youtubeVideoUrl;
    this.announcement = post.announcement;
    this.text = post.text;
    this.quote = post.quote;
    this.author = post.author;
    this.link = post.link;
    this.linkDescription = post.linkDescription;
    this.photo = post.photo;
    this.tags = post.tags;
  }
}

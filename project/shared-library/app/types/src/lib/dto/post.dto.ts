import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize, IsArray, IsEnum, IsNotEmpty, IsOptional,
  IsString, IsUrl, MaxLength, MinLength, NotContains, Validate, ValidateIf
} from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';
import { EPostType, IsYoutubeLink, EAllowedPostPhotoExtensionTypes } from '@project/shared-library/app/types';
import { Transform } from 'class-transformer';
import {
  POST_ANNOUNCEMENT_MAX_LENGTH,
  POST_ANNOUNCEMENT_MIN_LENGTH,
  POST_LINK_DESCRIPTION_MAX_LENGTH,
  POST_LINK_DESCRIPTION_MIN_LENGTH,
  POST_MAX_TAGS_ALLOWED,
  POST_PHOTO_MAX_FILE_SIZE_MB,
  POST_QUOTE_AUTHOR_MAX_LENGTH,
  POST_QUOTE_AUTHOR_MIN_LENGTH,
  POST_QUOTE_MAX_LENGTH,
  POST_QUOTE_MIN_LENGTH, POST_TAG_MAX_LENGTH, POST_TAG_MIN_LENGTH,
  POST_TEXT_MAX_LENGTH,
  POST_TEXT_MIN_LENGTH,
  POST_TITLE_MAX_LENGTH,
  POST_TITLE_MIN_LENGTH
} from '../constant/post.constant';

export type TPostId = string

export class PostDto {
  @ApiProperty()
  @IsString()
  @IsEnum(EPostType)
  public postType: EPostType

  @ApiProperty()
  @ValidateIf(({ postType }) => postType === EPostType.Video || postType === EPostType.Text)
  @IsString()
  @MinLength(POST_TITLE_MIN_LENGTH)
  @MaxLength(POST_TITLE_MAX_LENGTH)
  public title?: string;

  @ApiProperty()
  @ValidateIf(({ postType }) => postType === EPostType.Video)
  @IsUrl()
  @Validate(IsYoutubeLink)
  public youtubeVideoUrl?: string

  @ApiProperty()
  @ValidateIf(({ postType }) => postType === EPostType.Text)
  @IsString()
  @MinLength(POST_ANNOUNCEMENT_MIN_LENGTH)
  @MaxLength(POST_ANNOUNCEMENT_MAX_LENGTH)
  public announcement?: string;

  @ApiProperty()
  @ValidateIf(({ postType }) => postType === EPostType.Text)
  @IsString()
  @MinLength(POST_TEXT_MIN_LENGTH)
  @MaxLength(POST_TEXT_MAX_LENGTH)
  public text?: string;

  @ApiProperty()
  @ValidateIf(({ postType }) => postType === EPostType.Quote)
  @IsString()
  @MinLength(POST_QUOTE_MIN_LENGTH)
  @MaxLength(POST_QUOTE_MAX_LENGTH)
  public quote?: string;

  @ApiProperty()
  @ValidateIf(({ postType }) => postType === EPostType.Quote)
  @IsString()
  @MinLength(POST_QUOTE_AUTHOR_MIN_LENGTH)
  @MaxLength(POST_QUOTE_AUTHOR_MAX_LENGTH)
  public author?: string;

  @ApiProperty()
  @ValidateIf(({ postType }) => postType === EPostType.Link)
  @IsUrl()
  public link?: string

  @ApiProperty()
  @ValidateIf(({ postType }) => postType === EPostType.Link)
  @IsOptional()
  @IsString()
  @MinLength(POST_LINK_DESCRIPTION_MIN_LENGTH)
  @MaxLength(POST_LINK_DESCRIPTION_MAX_LENGTH)
  public linkDescription?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @ValidateIf(({ postType }) => postType === EPostType.Photo)
  @IsFile()
  @MaxFileSize(POST_PHOTO_MAX_FILE_SIZE_MB)
  @HasMimeType(Object.values(EAllowedPostPhotoExtensionTypes))
  public photo?: MemoryStoredFile;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? value.toString().split(',') : value)
  @IsArray()
  @ArrayMaxSize(POST_MAX_TAGS_ALLOWED)
  @IsString({ each: true })
  @NotContains(' ', { each: true })
  @NotContains('\\n', { each: true })
  @NotContains('\\r', { each: true })
  @NotContains('&nbsp;', { each: true })
  @MinLength(POST_TAG_MIN_LENGTH, { each: true })
  @MaxLength(POST_TAG_MAX_LENGTH, { each: true })
  public tags?: string[]
}

export class PostIdDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly postId: TPostId;
}

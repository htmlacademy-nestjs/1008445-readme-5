import { Module } from '@nestjs/common';

import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';

@Module({
  imports: [],
  controllers: [ CommentController ],
  providers: [ CommentService ],
})
export class AppModule {}

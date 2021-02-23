import {
    createSchema, ExtractDoc, ExtractProps, Type, typedModel,
} from 'ts-mongoose';
import { PostSchema } from './post.model';
import { UserSchema } from './user.model';

export const CommentSchema = createSchema({
    userId: Type.ref(Type.objectId()).to('User', UserSchema),
    postId: Type.ref(Type.objectId()).to('Post', PostSchema),
    content: Type.string(),
    parentCommentId: Type.objectId(),
}, { timestamps: true });

export const CommentModel = typedModel('Comment', CommentSchema, 'comments');
export type CommentDoc = ExtractDoc<typeof CommentSchema>;
export type Comment = ExtractProps<typeof CommentSchema>;

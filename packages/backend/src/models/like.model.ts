import {
    createSchema, ExtractDoc, ExtractProps, Type, typedModel,
} from 'ts-mongoose';
import { PostSchema } from './post.model';
import { UserSchema } from './user.model';

export const LikeSchema = createSchema({
    userId: Type.ref(Type.objectId()).to('User', UserSchema),
    postId: Type.ref(Type.objectId()).to('Post', PostSchema),
}, { timestamps: true });

export const LikeModel = typedModel('Like', LikeSchema, 'likes');
export type LikeDoc = ExtractDoc<typeof LikeSchema>;
export type Like = ExtractProps<typeof LikeSchema>;

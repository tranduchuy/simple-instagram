import {
    createSchema, ExtractDoc, ExtractProps, Type, typedModel,
} from 'ts-mongoose';
import { UserSchema } from './user.model';

export const PostSchema = createSchema({
    userId: Type.ref(Type.objectId()).to('User', UserSchema),
    title: Type.string(),
    images: Type.array().of(Type.string()),
}, { timestamps: true });

export const PostModel = typedModel('Post', PostSchema, 'posts');
export type PostDoc = ExtractDoc<typeof PostSchema>;
export type Post = ExtractProps<typeof PostSchema>;

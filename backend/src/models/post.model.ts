import {
    createSchema, ExtractDoc, ExtractProps, Type, typedModel,
} from 'ts-mongoose';

export const PostSchema = createSchema({
    userId: Type.objectId(),
    title: Type.string(),
    image: Type.string(),
}, { timestamps: true });

export const PostModel = typedModel('Post', PostSchema, 'posts');
export type PostDoc = ExtractDoc<typeof PostSchema>;
export type Post = ExtractProps<typeof PostSchema>;

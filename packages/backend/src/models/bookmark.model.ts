import {
    createSchema, ExtractDoc, ExtractProps, Type, typedModel,
} from 'ts-mongoose';
import { PostSchema } from './post.model';
// import { UserSchema } from './user.model';

export const BookmarkSchema = createSchema({
    postId: Type.ref(Type.objectId()).to('Post', PostSchema),
    userId: Type.ref(Type.objectId()).to('User', PostSchema),
}, { timestamps: true });

export const BookmarkModel = typedModel('Bookmark', BookmarkSchema, 'bookmarks');
export type BookmarkDoc = ExtractDoc<typeof BookmarkSchema>;
export type Bookmark = ExtractProps<typeof BookmarkSchema>;

import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import Joi from 'joi';
import { BookmarkDoc, BookmarkModel } from '../models/bookmark.model';
import { Post, PostModel } from '../models/post.model';

type SaveBookmarkReqBody = {
    postId: string;
    userId: string;
}

type SaveBookmarkResSuccess = {
    message: string;
}

type SaveBookmarkResError = {
    message: string;
}

export const SaveBookmarkJoiChema = Joi.object({
    postId: Joi.string().required(),
});
export const saveBookmark = async (
    req: Request<any, any, SaveBookmarkReqBody>,
    res: Response<SaveBookmarkResSuccess | SaveBookmarkResError>): Promise<void> => {
    try {
        const { postId } = req.body;
        const userId = req.user._id;

        const post: Post = await PostModel.findOne({ _id: postId }).lean();

        if (!post) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Post does not exist',
            });

            return;
        }

        const bookmarkDoc: BookmarkDoc = new BookmarkModel({
            postId,
            userId,
        });

        await bookmarkDoc.save();
        res.status(HttpStatus.OK).json({
            message: 'Saved',
        });

        return;
    } catch (e) {
        console.log(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: JSON.stringify(e),
        });
    }
};

import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import Joi from 'joi';
import { BookmarkDoc, BookmarkModel } from '../models/bookmark.model';
import { Post, PostModel } from '../models/post.model';
import { UserModel } from '../models/user.model';
import {
    extractPagination, extractSortObj, PaginationObj, PostWithUserResponseDTO,
} from './post.controller';

type SaveBookmarkReqBody = {
    postId: string;
    userId: string;
}

type SaveBookmarkResSuccess = {
    message: string;
}

type GetListBookmarkPost = {
    postId?: string;
    limit?: string;
    page?: string;
    createdAt?: Date;
    sortBy?: string;
    sortDirection?: string;
}

type BookMarkDTO = {
    _id: string;
    postId: PostWithUserResponseDTO;
}

type GetListBookmarkPostResSuccess = {
    total: number;
    listBookmark: BookMarkDTO[];
}

type BookmarkResError = {
    message: string;
}

export const SaveBookmarkJoiSchema = Joi.object({
    postId: Joi.string().required(),
});

export const saveBookmark = async (
    req: Request<any, any, SaveBookmarkReqBody>,
    res: Response<SaveBookmarkResSuccess | BookmarkResError>): Promise<void> => {
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

export const getListBookmarkPost = async (
    req: Request<any, any, any, GetListBookmarkPost>,
    res: Response<GetListBookmarkPostResSuccess | BookmarkResError>): Promise<void> => {
    try {
        const userId = req.user._id;
        const pagination: PaginationObj = extractPagination(req.query);
        const sortObj = extractSortObj(req.query);

        let bookmarks: BookMarkDTO[] = await BookmarkModel.find({ userId })
            .sort(sortObj)
            .skip(pagination.page * pagination.limit)
            .limit(pagination.limit)
            .select('postId')
            .populateTs('postId')
            .lean();

        bookmarks = await UserModel.populate(bookmarks, {
            path: 'postId.userId',
            select: 'email name avatar',
        }) as any;

        const total = await BookmarkModel.countDocuments({ userId });

        res.status(HttpStatus.OK).json({
            total,
            listBookmark: bookmarks,
        });
    } catch (e) {
        console.log(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: JSON.stringify(e),
        });
    }
};

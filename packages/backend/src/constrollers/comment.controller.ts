import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import Joi from 'joi';
import { Comment, CommentDoc, CommentModel } from '../models/comment.model';
import { PostModel } from '../models/post.model';
import { UserDoc } from '../models/user.model';
import { extractPagination, PaginationObj } from './post.controller';

type CreateCommentReqBody = {
    userId: string;
    postId: string;
    content: string;
}

type CommentResSuccess = {
    message: string;
}

type CommentResError = {
    message: string;
}

type DeleteCommentReqBody = {
    commentId: string;
}

type GetListCommentReqQuery = {
    type: string;
    page?: string;
    commentId?: string;
    postId?: string;
}

type CommentDTO = Comment & {
    userId?: UserDoc;
}

type CommentWithUserResponseDTO = Comment & {
    user: Pick<UserDoc, '_id' | 'name' | 'avatar'>;
}

type GetListCommentResSuccessDTO = {
    message: string;
    total: number;
    comments: CommentWithUserResponseDTO[];
}

type MongoQuery = {
    [key: string]: string | number | MongoQuery;
};

export const CreateCommentJoiSchema = Joi.object({
    postId: Joi.string().required(),
    content: Joi.string().required(),
});

export const DeleteCommentJoiSchema = Joi.object({
    commentId: Joi.string().required(),
});

// const regex = /(@[a-zA-Z0-9]+)/;
// const validateTagsSyntax = (inputContent: string): boolean => regex.test(inputContent);

export const createComment = async (
    req: Request<any, any, CreateCommentReqBody>,
    res: Response<GetListCommentResSuccessDTO | CommentResError>): Promise<void> => {
    try {
        const { postId, content } = req.body;
        const userId = req.user._id;

        const checkPost = await PostModel.findById({ _id: postId });
        if (checkPost === null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Post does not exist !!!',
            });

            return;
        }

        const commentDoc: CommentDoc = new CommentModel({
            userId,
            postId,
            content,
        });

        await commentDoc.save();
        res.status(HttpStatus.OK).json({
            message: 'Commented !!!',
        });

        return;
    } catch (e) {
        console.log(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: JSON.stringify(e),
        });
    }
};

export const deleteComment = async (
    req: Request<any, any, DeleteCommentReqBody>,
    res: Response<CommentResSuccess | CommentResError>): Promise<void> => {
    try {
        const { commentId } = req.body;

        const commentDataDeleted: Comment = await CommentModel.findOneAndDelete({ _id: commentId, userId: req.user._id });

        if (commentDataDeleted === null) {
            res.status(HttpStatus.OK).json({
                message: 'Permission denied',
            });

            return;
        }

        res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Deleted !!!',
        });

        return;
    } catch (e) {
        console.log(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: JSON.stringify(e),
        });
    }
};

export const getListComment = async (
    req: Request<any, any, any, GetListCommentReqQuery>,
    res: Response<GetListCommentResSuccessDTO | CommentResError>): Promise<void> => {
    try {
        const { type, commentId, postId } = req.query;
        const queryId: MongoQuery = {};
        if (type !== 'POST' && type !== 'COMMENT') {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Type is invalid',
            });

            return;
        }

        const pagination: PaginationObj = extractPagination(req.query);

        if (type === 'POST') {
            queryId.postId = postId;
        }

        if (type === 'COMMENT') {
            queryId.parentCommentId = commentId;
        }

        const comments: CommentDTO[] = await CommentModel.find(queryId)
            .skip(pagination.page * pagination.limit)
            .sort({ updatedAt: -1 })
            .limit(pagination.limit)
            .populateTs('userId')
            .lean();

        const total = await CommentModel.countDocuments();

        res.status(200)
            .json({
                message: 'Success',
                total,
                comments: comments.map((m) => {
                    const { _id, name, avatar } = m.userId;
                    return {
                        ...m,
                        user: { _id, name, avatar },
                        userId: undefined,
                    };
                }),
            });

        return;
    } catch (e) {
        console.log(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: JSON.stringify(e),
        });
    }
};

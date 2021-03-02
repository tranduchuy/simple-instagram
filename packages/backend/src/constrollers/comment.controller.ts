import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import Joi from 'joi';
import * as mongoose from 'mongoose';
import { GetCommentType } from '../constant';
import { Comment, CommentDoc, CommentModel } from '../models/comment.model';
import { Post, PostModel } from '../models/post.model';
import { UserDoc } from '../models/user.model';
import { extractPagination, PaginationObj } from './post.controller';

type CreateCommentReqBody = {
    type: string;
    userId: string;
    commentId?: string;
    postId?: string;
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

export type MongoQuery = {
    [key: string]: string | number | MongoQuery;
};

interface CommentObj<IdType> {
    [key: string]: string | number | IdType;
}

type MongoTypeComment = CommentObj<mongoose.Types.ObjectId>

export const CreateCommentJoiSchema = Joi.object({
    type: Joi.string().required(),
    postId: Joi.string(),
    commentId: Joi.string(),
    content: Joi.string().required(),
});

export const DeleteCommentJoiSchema = Joi.object({
    commentId: Joi.string().required(),
});

export const createComment = async (
    req: Request<any, any, CreateCommentReqBody>,
    res: Response<GetListCommentResSuccessDTO | CommentResError>): Promise<void> => {
    try {
        const {
            type, postId, commentId, content,
        } = req.body;
        let commentData: MongoTypeComment = {};
        const userId = req.user._id;

        if ((type !== GetCommentType.Post && type !== GetCommentType.Comment) || !content) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Type or content invalid',
            });
        }

        if (type === GetCommentType.Post) {
            const post: Post = await PostModel.findOne({ _id: postId }).lean();
            if (!post) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Post does not exist',
                });

                return;
            }

            commentData = {
                userId,
                postId,
                content,
            };
        }

        if (type === GetCommentType.Comment) {
            const comment: Comment = await CommentModel.findOne({ _id: commentId }).lean();
            if (!comment) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Comment does not exist',
                });

                return;
            }

            commentData = {
                userId,
                parentCommentId: commentId,
                content,
            };
        }

        const commentDoc: CommentDoc = new CommentModel(commentData);

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
        let total: number;
        if (type !== GetCommentType.Post && type !== GetCommentType.Comment) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Type is invalid',
            });

            return;
        }

        const pagination: PaginationObj = extractPagination(req.query);

        if (type === GetCommentType.Post) {
            if (!postId) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Post id cannot empty',
                });

                return;
            }

            queryId.postId = postId;
            total = await CommentModel.countDocuments({ postId });
        }

        if (type === GetCommentType.Comment) {
            if (!commentId) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Comment id cannot empty',
                });

                return;
            }

            queryId.parentCommentId = commentId;
            total = await CommentModel.countDocuments({ parentCommentId: commentId });
        }

        const comments: CommentDTO[] = await CommentModel.find(queryId)
            .skip(pagination.page * pagination.limit)
            .sort({ updatedAt: -1 })
            .limit(pagination.limit)
            .populateTs('userId')
            .lean();

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

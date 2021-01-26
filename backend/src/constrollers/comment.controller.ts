import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import Joi from 'joi';
import { CommentDoc, CommentModel } from '../models/comment.model';
import { PostModel } from '../models/post.model';

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

export const CreateCommentJoiSchema = Joi.object({
    postId: Joi.string().required(),
    content: Joi.string().required(),
});

export const DeleteCommentJoiSchema = Joi.object({
    commentId: Joi.string().required(),
});

export const createComment = async (
    req: Request<any, any, CreateCommentReqBody>,
    res: Response<CommentResSuccess | CommentResError>): Promise<void> => {
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

        return;
    }
};

export const deleteComment = async (
    req: Request<any, any, DeleteCommentReqBody>,
    res: Response<CommentResSuccess | CommentResError>): Promise<void> => {
    try {
        const { commentId } = req.body;

        const commentData = await CommentModel.findById({ _id: commentId });

        if (commentData) {
            await commentData.deleteOne();
            res.status(HttpStatus.OK).json({
                message: 'Deleted !!!',
            });

            return;
        }

        res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Comment does not exist !!!',
        });

        return;
    } catch (e) {
        console.log(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: JSON.stringify(e),
        });

        return;
    }
};

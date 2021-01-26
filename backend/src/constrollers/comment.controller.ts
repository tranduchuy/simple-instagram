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

type CreateCommentResSuccess = {
    message: string;
}

type CreateCommentResError = {
    message: string;
}

export const CreateCommentJoiSchema = Joi.object({
    postId: Joi.string().required(),
    content: Joi.string().required(),
});

export const createComment = async (
    req: Request<any, any, CreateCommentReqBody>,
    res: Response<CreateCommentResSuccess | CreateCommentResError>): Promise<void> => {
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

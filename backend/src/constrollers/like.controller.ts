import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import Joi from 'joi';
import { LikeDoc, LikeModel } from '../models/like.model';
import { PostModel } from '../models/post.model';

type InsertLikeReqBody = {
    userId: string;
    postId: string;
}

type InsertLikeResSuccess = {
    message: string;
}

type InsertLikeResError = {
    message: string;
}

export const insertLikeJoiSchema = Joi.object({
    postId: Joi.string().required(),
});

export const like = async (
    req: Request<any, any, InsertLikeReqBody>,
    res: Response<InsertLikeResSuccess | InsertLikeResError>): Promise<void> => {
    const { postId } = req.body;
    const userId = req.user._id;

    const checkDataLike = await LikeModel.findOne({ userId, postId });

    if (checkDataLike) {
        await checkDataLike.deleteOne();
        res.status(HttpStatus.OK).json({
            message: 'Deleted !!!',
        });

        return;
    }

    const checkPost = await PostModel.findById({ _id: postId });
    if (checkPost === null) {
        res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Post does not exist !!!',
        });

        return;
    }

    const likeDoc: LikeDoc = new LikeModel({
        userId,
        postId,
    });

    await likeDoc.save();
    res.status(HttpStatus.OK).json({
        message: 'Liked !!!',
    });

    return;
};

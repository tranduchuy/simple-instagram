import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import Joi from 'joi';
import { Like, LikeDoc, LikeModel } from '../models/like.model';
import { PostModel } from '../models/post.model';
import { UserDoc } from '../models/user.model';
import { extractPagination, extractSortObj, PaginationObj } from './post.controller';

type InsertLikeReqBody = {
    userId: string;
    postId: string;
}

type LikeResSuccess = {
    message: string;
    countLike: number;
}

type LikeResError = {
    message: string;
}

type GetListLikeReqQuery = {
    postId?: string;
    limit?: string;
    page?: string;
    createdAt?: Date;
    sortBy?: string;
    sortDirection?: string;
}

type LikeWithUser = Like & {
    userId: UserDoc;
};

type LikeWithUserResponseDTO = Like & {
    user: Pick<UserDoc, '_id' | 'name' | 'avatar'>;
}

type GetListResSuccess = {
    total: number;
    listLikes: LikeWithUserResponseDTO[];
}

export const insertLikeJoiSchema = Joi.object({
    postId: Joi.string().required(),
});

export const like = async (
    req: Request<any, any, InsertLikeReqBody>,
    res: Response<LikeResSuccess | LikeResError>): Promise<void> => {
    try {
        const { postId } = req.body;
        const userId = req.user._id;

        const checkDataLike = await LikeModel.findOne({ userId, postId });

        if (checkDataLike) {
            await checkDataLike.deleteOne();
            res.status(HttpStatus.OK).json({
                message: 'Unlike',
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
        const countLike = await LikeModel.count({ postId });
        res.status(HttpStatus.OK).json({
            message: 'Liked',
            countLike,
        });

        return;
    } catch (e) {
        console.log(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: JSON.stringify(e),
        });
    }
};

export const getListLikePost = async (
    req: Request<any, any, any, GetListLikeReqQuery>,
    res: Response<GetListResSuccess | LikeResError>): Promise<void> => {
    try {
        const pagination: PaginationObj = extractPagination(req.query);
        const sortObj = extractSortObj(req.query);

        const likes: LikeWithUser[] = await LikeModel.find()
            .sort(sortObj)
            .skip(pagination.page * pagination.limit)
            .limit(pagination.limit)
            .populateTs('userId')
            .lean();

        const total = await LikeModel.countDocuments();

        res.status(HttpStatus.OK).json({
            total,
            listLikes: likes.map((p) => {
                const { _id, name, avatar } = p.userId;
                return {
                    ...p,
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

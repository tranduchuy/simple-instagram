import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import joi from 'joi';
import { Types } from 'mongoose';
import { IMAGE_JPG_TYPES, IMAGE_PNG_TYPES, SystemConfig } from '../constant';
import { RequestCustom } from '../middleware/checkToken';
import { Post, PostDoc, PostModel } from '../models/post.model';
import { UserModel } from '../models/user.model';

const POST_COLUMNS: string[] = Object.keys(PostModel.schema.paths);
const indexOfV: number = POST_COLUMNS.indexOf('__v');
POST_COLUMNS.splice(indexOfV, 1);

type PostReqQuery = {
    title?: string;
};

type PostResSuccess = {
    message: string;
};

type PostResError = {
    message: string;
};

type GetListPostReqQuery = {
    title?: string;
    userId?: string;
    limit?: string;
    page?: string;
    createdAt?: Date;
    sortBy?: string;
    sortDirection?: string;
};

// type ListPost = {
//     title: string;
//     images: string[];
//     user: object;
// };

type PostWithUser = Post & {
    user: {
        _id: Types.ObjectId;
        name: string;
        avatar: string;
    };
};

type GetListPostResSuccess = {
    total: number;
    listPost: PostWithUser[];
};

type SortObject = {
    [key: string]: string | number | SortObject;
};

type PaginationObj = {
    [key: string]: number;
};

const removeImg = (req: Request<any, any, any, PostReqQuery>): void => {
    fs.unlinkSync(path.join(SystemConfig.rootPath, 'public', 'tmp', req.file.filename));
};

const extractPagination = (queryPagination: GetListPostReqQuery): PaginationObj => {
    const { limit, page } = queryPagination;
    const pagination: PaginationObj = {};
    if (limit) {
        pagination.limit = Number(limit);
    } else {
        pagination.limit = 10;
    }

    if (page) {
        pagination.page = Number(page);
    } else {
        pagination.page = 0;
    }

    return pagination;
};

const extractSortObj = (querySortObj: GetListPostReqQuery): SortObject => {
    let { sortBy, sortDirection } = querySortObj;

    sortBy = sortBy || 'createdAt';
    if (POST_COLUMNS.indexOf(sortBy) === -1) {
        sortBy = 'createdAt';
    }

    sortDirection = sortDirection || 'desc';
    if (['asc', 'desc'].indexOf(sortDirection) === -1) {
        sortDirection = 'desc';
    }

    const sortObj: SortObject = {};
    sortObj[sortBy] = sortDirection === 'desc' ? -1 : 1;
    return sortObj;
};

export const getListJoiSchema = joi.object({
    sortBy: joi.string().valid(...POST_COLUMNS).default('createdAt'),
    sortDirection: joi.string().valid('desc', 'asc'),
    limit: joi.number().default(10),
    page: joi.number().default(0),
});

class PostController {
    async Post(req: RequestCustom<any, any, PostReqQuery, never>, res: Response<PostResSuccess | PostResError>): Promise<any> {
        const { title } = req.body;
        let images: Express.Multer.File[] = [];
        if (Array.isArray(req.files)) {
            images = req.files;
        } else {
            images = req.files.images;
        }

        if (!images) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'This field cannot empty.',
            });
        }
        const invalidImages = images.filter((img) => img.mimetype !== IMAGE_JPG_TYPES && img.mimetype !== IMAGE_PNG_TYPES);
        if (invalidImages.length !== 0) {
            removeImg(req);
            return res.status(400).json({
                message: 'Type of image is invalid.',
            });
        }

        const imagesData: string[] = [];
        await Promise.all(images.map(async (img) => {
            const tmp = path.join(SystemConfig.rootPath, 'public', 'tmp', img.filename);
            const uploads = path.join(SystemConfig.rootPath, 'public', 'uploads', img.filename);
            fs.renameSync(tmp, uploads);
            imagesData.push(`uploads/${img.filename}`);
        }));

        const postDoc: PostDoc = new PostModel({
            userId: req.user._id,
            title,
            images: imagesData,
        });
        await postDoc.save();
        return res.status(200).json({
            message: 'Success.',
        });
    }

    async getListPost(
        req: RequestCustom<any, any, any, GetListPostReqQuery>,
        res: Response<GetListPostResSuccess | PostResError>,
    ): Promise<any> {
        const validateSortResult = getListJoiSchema.validate(req.query);
        if (validateSortResult.error) {
            return res.status(HttpStatus.BAD_REQUEST).json(validateSortResult.error);
        }

        const pagination: PaginationObj = extractPagination(req.query);
        const sortObj = extractSortObj(req.query);

        const posts: Post[] = await PostModel.find()
            .sort(sortObj)
            .skip(pagination.page * pagination.limit)
            .limit(pagination.limit)
            .lean();

        const postWithUserInfos: PostWithUser[] = [];

        await Promise.all(posts.map(async (p): Promise<any> => {
            const userInfo = await UserModel.findOne({ _id: p.userId }).lean();
            if (userInfo !== null) {
                postWithUserInfos.push({
                    ...p,
                    user: {
                        avatar: userInfo.avatar,
                        _id: userInfo._id,
                        name: userInfo.name,
                    },
                });
            }
        }));
        const total = await PostModel.countDocuments();

        return res.status(HttpStatus.OK).json({
            total,
            listPost: postWithUserInfos,
        });
    }
}

export const postCtrl = new PostController();

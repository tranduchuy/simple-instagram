import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { ObjectID } from 'mongodb';
import { IMAGE_JPG_TYPES, IMAGE_PNG_TYPES, SystemConfig } from '../constant';
import { RequestCustom } from '../middleware/checkToken';
import { Post, PostDoc, PostModel } from '../models/post.model';

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

type ListPost = {
    title: string;
    images: string[];
    userId: ObjectID;
};

type GetListPostResSuccess = {
    total: number;
    listPost: ListPost[];
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

const isAlphabetAndNumber = (str: string): boolean => /[a-zA-Z0-9]+/.test(str);

const isNumberRegex = (number: string): boolean => /[0-9]+/.test(number);

const extractPagination = (queryPagination: GetListPostReqQuery): PaginationObj => {
    const { limit, page } = queryPagination;
    const pagination: PaginationObj = {};
    if (limit !== undefined) {
        if (!isNumberRegex(limit)) {
            pagination.limit = 10;
        } else {
            pagination.limit = parseInt(limit, 10);
        }
    } else {
        pagination.limit = 10;
    }

    if (page !== undefined) {
        if (!isNumberRegex(page)) {
            pagination.page = 0;
        } else {
            pagination.page = parseInt(page, 10);
        }
    } else {
        pagination.page = 0;
    }

    return pagination;
};

const extreactSortObj = (querySortObj: GetListPostReqQuery, res: Response<PostResError>): SortObject | boolean => {
    let { sortBy, sortDirection } = querySortObj;
    if (!isAlphabetAndNumber(sortBy)) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Error invalid alphabet and number',
        });

        return false;
    }

    if (!isAlphabetAndNumber(sortDirection)) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Error invalid alphabet and number',
        });

        return false;
    }

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
class PostController {
    async Post(req: RequestCustom<any, any, any, PostReqQuery>, res: Response<PostResSuccess | PostResError>): Promise<any> {
        const { title } = req.query;
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
        const { userId } = req.query;
        const pagination: PaginationObj = extractPagination(req.query);

        if (!isAlphabetAndNumber(userId)) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error invalid alphabet and number',
            });
        }

        if (userId.length !== 24) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error invalid object id length',
            });
        }

        const sortObj = extreactSortObj(req.query, res);
        if (sortObj === false) {
            return false;
        }

        const post: Post[] = await PostModel.find({ userId })
            .skip(pagination.page * pagination.limit)
            .sort(sortObj)
            .limit(pagination.limit)
            .lean();

        const total = await PostModel.countDocuments({ userId });
        const showList: ListPost[] = post.map((p) => ({
            userId: p.userId,
            title: p.title,
            images: p.images,
        }));

        res.status(HttpStatus.OK).json({
            total,
            listPost: showList,
        });

        return;
    }
}

export const postCtrl = new PostController();

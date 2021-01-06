import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { IMAGE_JPG_TYPES, IMAGE_PNG_TYPES, SystemConfig } from '../constant';
import { RequestCustom } from '../middleware/checkToken';
import { PostDoc, PostModel } from '../models/post.model';

type PostReqQuery = {
    title?: string;
};

type PostResSuccess = {
    message: string;
};

type PostResError = {
    message: string;
};


type getListPostReqQuery = {
    limit?: string;
    page?: string;
    createAt?: string;
    imag
};
const removeImg = (req: Request<any, any, any, PostReqQuery>): void => {
    fs.unlinkSync(path.join(SystemConfig.rootPath, 'public', 'tmp', req.file.filename));
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

        await Promise.all(images.map(async (img) => {
            const tmp = path.join(SystemConfig.rootPath, 'public', 'tmp', img.filename);
            const uploads = path.join(SystemConfig.rootPath, 'public', 'uploads', img.filename);
            fs.renameSync(tmp, uploads);
            const postDoc: PostDoc = new PostModel({
                userId: req.user._id,
                title,
                images: `uploads/${img.filename}`,
            });

            await postDoc.save();
        }));

        return res.status(200).json({
            message: 'Success.',
        });
    }

    async getListPost(req: RequestCustom<any, any, any>)
}

export const postCtrl = new PostController();

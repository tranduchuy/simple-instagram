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

type UploadImages = {
    file: File;
    imageContent: string;
    id: number;
}

const removeImg = (req: Request<any, any, any, PostReqQuery>): void => {
    fs.unlinkSync(path.join(SystemConfig.rootPath, 'public', 'tmp', req.file.filename));
};

class PostController {
    async Post(req: RequestCustom<any, any, any, PostReqQuery>, res: Response<PostResSuccess | PostResError>): Promise<any> {
        const { title } = req.query;
        const images = req.files;
        if (!images) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'This field cannot empty.',
            });
        }
        images.forEach((img: any) => {
        });
        if (images.mimetype !== IMAGE_JPG_TYPES && images.mimetype !== IMAGE_PNG_TYPES) {
            removeImg(req);
            return res.status(400).json({
                message: 'Type of image is invalid.',
            });
        }

        const tmp = path.join(SystemConfig.rootPath, 'public', 'tmp', req.file.filename);
        const uploads = path.join(SystemConfig.rootPath, 'public', 'uploads', req.file.filename);
        fs.renameSync(tmp, uploads);

        const postDoc: PostDoc = new PostModel({
            userId: req.user._id,
            title,
            image: `uploads/${req.file.filename}`,
        });

        await postDoc.save();
        return res.status(200).json({
            message: 'Success.',
        });
    }
}

export const postCtrl = new PostController();

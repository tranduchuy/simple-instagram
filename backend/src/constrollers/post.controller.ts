import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { IMAGE_FILE_TYPES } from '../constant';

type PostReqQuery = {
    title: string;
    image: string;
};

type PostResSuccess = {
    message: string;
    url: string;
};

type PostResError = {
    message: string;
};

const removeImg = (req: Request<any, any, any, PostReqQuery>): void => {
    const imagePath = `/../public/tmp/${req.file.filename}`;
    fs.unlinkSync(path.join(__dirname, imagePath));
};

class PostController {
    async Post(req: Request<any, any, any, PostReqQuery>, res: Response<PostResSuccess | PostResError>): Promise<any> {
        const image = req.file;
        if (!image) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'This field cannot empty.',
            });
        }

        if (image.mimetype !== IMAGE_FILE_TYPES) {
            removeImg(req);
            return res.status(400).json({
                message: 'Type of image is invalid.',
            });
        }

        const oldPath = `/../public/tmp/${req.file.filename}`;
        const newPath = `/../public/uploads/${req.file.filename}`;
        const oldFile = path.join(__dirname, oldPath);
        const newFile = path.join(__dirname, newPath);
        fs.renameSync(oldFile, newFile);

        return res.status(200).json({
            message: 'Success.',
            url: `uploads/${req.file.filename}`,
        });
    }
}

export const postCtrl = new PostController();

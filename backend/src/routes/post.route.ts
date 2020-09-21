import fs from 'fs';
import express from 'express';
import multer from 'multer';
import { postCtrl } from '../constrollers/post.controller';
import { Middleware } from '../middleware/checkToken';

const router = express.Router({});

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const tmp = `${__dirname}/../public/tmp`;
        if (!fs.existsSync(tmp)) {
            fs.mkdirSync(tmp);
        }

        const uploads = `${__dirname}/../public/uploads`;
        if (!fs.existsSync(uploads)) {
            fs.mkdirSync(uploads);
        }

        cb(null, `${__dirname}/../public/tmp`);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({
    storage,
});

router.post('/', Middleware, upload.single('image'), postCtrl.Post);

export const PostRoute = router;

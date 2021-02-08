import fs from 'fs';
import path from 'path';
import express from 'express';
import multer from 'multer';
import { SystemConfig } from '../constant';
import { deletePostJoiSchema, getListJoiSchema, postCtrl } from '../constrollers/post.controller';
import { Middleware } from '../middleware/checkToken';
import { validateData } from '../middleware/validateData';

const router = express.Router({});

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const tmp = path.join(SystemConfig.rootPath, 'public', 'tmp');
        if (!fs.existsSync(tmp)) {
            fs.mkdirSync(tmp);
        }

        const uploads = path.join(SystemConfig.rootPath, 'public', 'uploads');
        if (!fs.existsSync(uploads)) {
            fs.mkdirSync(uploads);
        }

        cb(null, path.join(SystemConfig.rootPath, 'public', 'tmp'));
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({
    storage,
});

router.use(Middleware);
router.post('/', upload.array('images[]'), postCtrl.Post);
router.get('/', validateData(getListJoiSchema, 'query'), postCtrl.getListPost);
router.delete('/:postId', validateData(deletePostJoiSchema, 'params'), postCtrl.deletePost);

export const PostRoute = router;

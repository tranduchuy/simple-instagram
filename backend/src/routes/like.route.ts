import express from 'express';
import { getListLikePost, insertLikeJoiSchema, like } from '../constrollers/like.controller';
import { getListJoiSchema } from '../constrollers/post.controller';
import { Middleware } from '../middleware/checkToken';
import { validateData } from '../middleware/validateData';

const router = express.Router({});

router.use(Middleware);
router.post('/', validateData(insertLikeJoiSchema, 'body'), like);
router.get('/', validateData(getListJoiSchema, 'params'), getListLikePost);

export const LikeRoute = router;

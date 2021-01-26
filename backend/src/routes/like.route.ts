import express from 'express';
import { insertLikeJoiSchema, like } from '../constrollers/like.controller';
import { Middleware } from '../middleware/checkToken';
import { validateData } from '../middleware/validateData';

const router = express.Router({});

router.use(Middleware);
router.post('/', validateData(insertLikeJoiSchema, 'body'), like);

export const LikeRoute = router;

import express from 'express';
import { createComment, CreateCommentJoiSchema } from '../constrollers/comment.controller';
import { Middleware } from '../middleware/checkToken';
import { validateData } from '../middleware/validateData';

const router = express.Router({});

router.use(Middleware);
router.post('/', validateData(CreateCommentJoiSchema, 'body'), createComment);

export const CommentRoute = router;

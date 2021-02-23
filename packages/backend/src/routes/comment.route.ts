import express from 'express';
import {
    createComment,
    CreateCommentJoiSchema,
    deleteComment,
    DeleteCommentJoiSchema,
    getListComment,
} from '../constrollers/comment.controller';
import { getListJoiSchema } from '../constrollers/post.controller';
import { Middleware } from '../middleware/checkToken';
import { validateData } from '../middleware/validateData';

const router = express.Router({});

router.use(Middleware);
router.post('/', validateData(CreateCommentJoiSchema, 'body'), createComment);
router.delete('/', validateData(DeleteCommentJoiSchema, 'body'), deleteComment);
router.get('/', validateData(getListJoiSchema, 'params'), getListComment);

export const CommentRoute = router;

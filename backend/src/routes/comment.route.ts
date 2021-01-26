import express from 'express';
import {
    createComment,
    CreateCommentJoiSchema,
    deleteComment,
    DeleteCommentJoiSchema,
} from '../constrollers/comment.controller';
import { Middleware } from '../middleware/checkToken';
import { validateData } from '../middleware/validateData';

const router = express.Router({});

router.use(Middleware);
router.post('/', validateData(CreateCommentJoiSchema, 'body'), createComment);
router.delete('/', validateData(DeleteCommentJoiSchema, 'body'), deleteComment);

export const CommentRoute = router;

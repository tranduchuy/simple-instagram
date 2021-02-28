import express from 'express';
import { getListBookmarkPost, saveBookmark, SaveBookmarkJoiSchema } from '../constrollers/bookmark.controller';
import { getListJoiSchema } from '../constrollers/post.controller';
import { Middleware } from '../middleware/checkToken';
import { validateData } from '../middleware/validateData';

const router = express.Router({});

router.use(Middleware);
router.post('/', validateData(SaveBookmarkJoiSchema, 'body'), saveBookmark);
router.get('/', validateData(getListJoiSchema, 'query'), getListBookmarkPost);

export const BookmarkRoute = router;

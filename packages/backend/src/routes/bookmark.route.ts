import express from 'express';
import { saveBookmark, SaveBookmarkJoiChema } from '../constrollers/bookmark.controller';
import { Middleware } from '../middleware/checkToken';
import { validateData } from '../middleware/validateData';

const router = express.Router({});

router.use(Middleware);
router.post('/', validateData(SaveBookmarkJoiChema, 'body'), saveBookmark);

export const BookmarkRoute = router;

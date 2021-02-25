import express from 'express';
import { BookmarkRoute } from './bookmark.route';
import { CommentRoute } from './comment.route';
import { LikeRoute } from './like.route';
import { PostRoute } from './post.route';
import { UserRoute } from './user.route';

const router = express.Router({});

router.use('/auth', UserRoute);
router.use('/post', PostRoute);
router.use('/like', LikeRoute);
router.use('/comment', CommentRoute);
router.use('/bookmark', BookmarkRoute);

export const api = router;

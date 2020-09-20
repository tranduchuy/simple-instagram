import express from 'express';
import { PostRoute } from './post.route';
import { UserRoute } from './user.route';

const router = express.Router({});

router.use('/auth', UserRoute);
router.use('/post', PostRoute);

export const api = router;

import express from 'express';
import { UserRoute } from './user.route';

const router = express.Router({});

router.use('/auth', UserRoute);

export const api = router;

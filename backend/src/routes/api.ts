import express from 'express';
import {UserRoute} from "./User.route";

const router = express.Router({});

router.use('/auth', UserRoute);

export const api = router;
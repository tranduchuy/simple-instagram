import express from 'express';
import { like } from '../constrollers/like.controller';
// import { validateData } from '../middleware/validateData';

const router = express.Router({});

router.post('/', like);

export const UserRoute = router;

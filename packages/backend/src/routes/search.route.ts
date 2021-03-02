import express from 'express';
import { SearchPostAndUser } from '../constrollers/search.controller';
import { Middleware } from '../middleware/checkToken';

const router = express.Router({});

router.use(Middleware);
router.use('/', SearchPostAndUser);

export const SearchRoute = router;

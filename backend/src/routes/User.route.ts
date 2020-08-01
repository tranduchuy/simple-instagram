import express from 'express';
import {userCtrl} from "../constrollers/User.controller";

const router = express.Router({});

router.post('/register', userCtrl.registerNewUser);
router.post('/login', userCtrl.userLogin);

export const UserRoute = router;
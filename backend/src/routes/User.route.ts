import express from 'express';
import {userCtrl} from "../constrollers/User.controller";

const router = express.Router({});

router.post('/register', userCtrl.registerNewUser);
router.post('/login', userCtrl.userLogin);
router.post('/confirm', userCtrl.confirmUser);

export const UserRoute = router;
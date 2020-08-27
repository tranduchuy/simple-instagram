import express from 'express';
import {userCtrl} from "../constrollers/user.controller";

const router = express.Router({});

router.post('/register', userCtrl.registerNewUser);
router.post('/login', userCtrl.userLogin);
router.post('/confirm', userCtrl.confirmUser);
router.post('/forgot', userCtrl.forgotPassword);

export const UserRoute = router;
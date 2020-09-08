import express from 'express';
import { userCtrl } from '../constrollers/user.controller';

const router = express.Router({});

router.post('/register', userCtrl.registerNewUser);
router.post('/login', userCtrl.userLogin);
router.post('/confirm', userCtrl.confirmUser);
router.post('/forgot', userCtrl.forgotPassword);
router.post('/change-pass', userCtrl.changePassword);

export const UserRoute = router;

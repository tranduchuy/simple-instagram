import express from 'express';
import { registerJoiSchema, userCtrl } from '../constrollers/user.controller';
import { validateData } from '../middleware/validateData';

const router = express.Router({});

router.post('/register', validateData(registerJoiSchema, 'body'), userCtrl.registerNewUser);
router.post('/login', userCtrl.userLogin);
router.post('/confirm', userCtrl.confirmUser);
router.post('/forgot', userCtrl.forgotPassword);
router.post('/reset-pass', userCtrl.resetPassword);

export const UserRoute = router;

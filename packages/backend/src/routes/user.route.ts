import express from 'express';
import {
    forgotPassJoiSchema,
    loginJoiSchema,
    registerJoiSchema,
    resetPassJoiSchema,
    userCtrl,
} from '../constrollers/user.controller';
import { Middleware } from '../middleware/checkToken';
import { validateData } from '../middleware/validateData';

const router = express.Router({});

router.post('/register', validateData(registerJoiSchema, 'body'), userCtrl.registerNewUser);
router.post('/login', validateData(loginJoiSchema, 'body'), userCtrl.userLogin);
router.post('/confirm', userCtrl.confirmUser);
router.post('/forgot', validateData(forgotPassJoiSchema, 'body'), userCtrl.forgotPassword);
router.post('/reset-pass', validateData(resetPassJoiSchema, 'body'), userCtrl.resetPassword);
router.use(Middleware);
router.get('/user-info', userCtrl.getUserInfo);

export const UserRoute = router;

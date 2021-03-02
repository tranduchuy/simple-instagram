import express from 'express';
import {
    forgotPassJoiSchema,
    loginJoiSchema,
    registerJoiSchema,
    resetPassJoiSchema, updateBasicUserInfoJoiSchema, updatePassJoiSchema,
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
router.post('/update-pass', validateData(updatePassJoiSchema, 'body'), userCtrl.updatePassword);
router.post('/update-basic-info', validateData(updateBasicUserInfoJoiSchema, 'body'), userCtrl.updateBasicUserInfo);

export const UserRoute = router;

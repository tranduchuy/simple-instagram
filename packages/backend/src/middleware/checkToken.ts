import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { User, UserModel } from '../models/user.model';

type VerifyToken = {
    email: string;
};

type CheckTokenResError = {
    message: string;
};

export const Middleware = async (req: Request, res: Response<CheckTokenResError>, next: NextFunction): Promise<any> => {
    try {
        const { token } = req.headers || req.body;
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'Please, you need login',
            });
        }

        const verifyToken = jwt.verify(token, process.env.private_key) as VerifyToken;
        const user: User = await UserModel.findOne({ email: verifyToken.email })
            .select('-passwordSalt -hashedPassword -forgetPasswordToken -role -tokenRegister -status')
            .lean();

        if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'Token is invalid.',
            });
        }

        req.user = user;
        return next();
    } catch (e) {
        console.log(e);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: JSON.stringify(e),
        });
    }
};

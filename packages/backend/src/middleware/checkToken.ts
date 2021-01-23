import { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line import/no-unresolved
import * as core from 'express-serve-static-core';
import HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { User, UserModel } from '../models/user.model';

type VerifyToken = {
    email: string;
};

type CheckTokenResError = {
    message: string;
};

export interface RequestCustom<P extends core.Params = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query>
    extends Request<P, ResBody, ReqBody, ReqQuery>
{
    user?: User;
}

export const Middleware = async (req: RequestCustom, res: Response<CheckTokenResError>, next: NextFunction): Promise<any> => {
    try {
        const token: string = req.headers.token || req.query.token || req.body.token;
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'Please, you need login',
            });
        }

        const verifyToken = jwt.verify(token, process.env.private_key) as VerifyToken;
        const user: User = await UserModel.findOne({ email: verifyToken.email })
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

import {
    Request, Response, NextFunction, Handler,
} from 'express';
import * as HttpStatus from 'http-status-codes';
import Joi from 'joi';

export const validateData = (schema: Joi.Schema, name: 'body' | 'query' | 'params'): Handler => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validateResult = schema.validate(req[name]);

        if (validateResult.error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: validateResult.error?.details[0].message,
            });
        }
        return next();
    };
};

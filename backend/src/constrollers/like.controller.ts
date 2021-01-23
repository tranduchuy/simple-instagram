import { Request, Response } from 'express';

export const like = async (req: Request<any, any, any>, res: Response<any>): Promise<void> => {
    console.log(1);
};

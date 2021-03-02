import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { PostModel } from '../models/post.model';
import { User, UserModel } from '../models/user.model';
import { detailPost, PostWithUser, PostWithUserResponseDTO } from './post.controller';

type SearchReqBody = {
    content: string;
}

type SearchResSuccess = {
    total: number;
    listSearchPost: PostWithUserResponseDTO[];
    listSearchUser: User[];
}

type SearchResError = {
    message: string;
}

export const SearchPostAndUser = async (
    req: Request<any, any, SearchReqBody>,
    res: Response<SearchResSuccess | SearchResError>): Promise<void> => {
    try {
        const { content } = req.body;
        let total = 0;

        if (!content) {
            res.status(HttpStatus.BAD_REQUEST).json({
                total: 0,
                listSearchPost: [],
                listSearchUser: [],
            });

            return;
        }

        const searchPost: PostWithUser[] = await PostModel.find({ title: { $regex: content } })
            .sort({ createdAt: -1 })
            .limit(5)
            .populateTs('userId')
            .lean();

        if (searchPost === null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Title does not exist',
            });
        }

        total += searchPost.length;

        const searchUser: User[] = await UserModel.find({ email: { $regex: content } })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('-passwordSalt -hashedPassword -forgetPasswordToken -role -tokenRegister -status')
            .lean();

        if (searchUser === null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'User does not exist',
            });
        }

        total += searchUser.length;
        res.status(HttpStatus.OK).json({
            total,
            listSearchPost: await Promise.all(searchPost.map(detailPost)),
            listSearchUser: searchUser,
        });

        return;
    } catch (e) {
        console.log(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: JSON.stringify(e),
        });
    }
};

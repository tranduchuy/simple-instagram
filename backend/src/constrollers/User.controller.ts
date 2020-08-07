import * as HttpStatus from 'http-status-codes';
import {User, UserDoc, UserModel} from "../models/User";
import uniqueString from "unique-string";
import * as bcrypt from "bcryptjs";
import {Request, Response} from "express";
import {sendMailVerify} from '../services/sendMailVerify';

type RegisterReqBody = {
    email: string;
    password: string;
    confirmPassword: string;
};

type UserResSuccess = {
    message: string;
};

type UserResError = {
    message: string
};

type ValidatorPass = {
    token?: string;
    email?: string;
    password: string;
    confirmPassword: string;
};

const validateEmailAddress = (email: string): boolean => {
    const filter = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');
    return filter.test(email);
};

export const isAlphabetAndNumber = (str: string): boolean => {
    return /[a-zA-Z0-9]+/.test(str);
};

const isValidatorPassword = (validatorPass: ValidatorPass, res: Response<UserResError>): boolean => {
    const {password, confirmPassword} = validatorPass;
    if (!isAlphabetAndNumber(password) && !isAlphabetAndNumber(confirmPassword)) {
        res.status(HttpStatus.BAD_REQUEST).json({
            message: "Password không hợp lệ"
        });

        return false;
    }

    if (password !== confirmPassword) {
        res.status(HttpStatus.BAD_REQUEST).json({
            message: "Hai mật khẩu không giống nhau"
        });

        return false;
    }

    return true;
};

class UserController {
    async registerNewUser(req: Request<any, any, RegisterReqBody>, res: Response<UserResSuccess | UserResError>): Promise<any> {
        const {
            email,
            password,
            confirmPassword
        } = req.body;
        if (!email || !password || !confirmPassword) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Vui lòng điền đủ thông tin"
            });
            return;
        }

        if (!validateEmailAddress(email)) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email không hợp lệ"
            });
            return;
        }

        const checkedPassword: boolean = isValidatorPassword({password, confirmPassword}, res);
        if (checkedPassword === false) {
            return;
        }

        const user: User | null = await UserModel.findOne({email: email})
            .lean();

        if (user !== null) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email đã được sử dụng"
            });
        }

        const tokenRegister = uniqueString();
        const saltRounds: string = bcrypt.genSaltSync(10);
        const hashedPassword: string = bcrypt.hashSync(password, saltRounds);

        const userDoc: UserDoc = new UserModel({
            email: email,
            passwordSalt: saltRounds,
            hashedPassword: hashedPassword,
            tokenRegister: tokenRegister,
            status: 2
        });

        await userDoc.save();

        const mailOptions = {
            from: process.env.config_user,
            subject: 'Verification Email',
            to: email,
            html: `Token Register: ${tokenRegister}
            </br>
            <a href="http://localhost:3000/confirm">Click here to verify email</a>`
        };

        await sendMailVerify(mailOptions);
        return res.status(HttpStatus.OK).json({
            message: "Đăng kí thành công. Vui lòng kiểm tra email để xác thực"
        });
    };
}

export const userCtrl = new UserController();
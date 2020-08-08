import * as HttpStatus from 'http-status-codes';
import {User, UserDoc, UserModel} from "../models/user.model";
import uniqueString from "unique-string";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from "bcryptjs";
import {Request, Response} from "express";
import {sendMailVerify} from '../services/sendMailVerify';

type RegisterReqBody = {
    email: string;
    password: string;
    confirmPassword: string;
};

type LoginReqBody = {
    email: string;
    password: string;
};

type LoginResSuccess = {
    message: string;
    token: string;
}
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
            message: "Password Invalid !"
        });

        return false;
    }

    if (password !== confirmPassword) {
        res.status(HttpStatus.BAD_REQUEST).json({
            message: "Passwords do not match !"
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
            html: `<a href="http://localhost:3000/confirm?token=${tokenRegister}">Click here to verify email</a>`
        };

        await sendMailVerify(mailOptions);
        return res.status(HttpStatus.OK).json({
            message: "Đăng kí thành công. Vui lòng kiểm tra email để xác thực"
        });
    };

    async userLogin(req: Request<any, any, LoginReqBody>, res: Response<LoginResSuccess | UserResError>): Promise<any> {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email hoặc mật khẩu không đúng"
            });

            return;
        }

        if (!validateEmailAddress(email)) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email không hợp lệ"
            });

            return;
        }

        if (!isAlphabetAndNumber(password)) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Password không hợp lệ"
            });

            return;
        }

        const user: User | null = await UserModel.findOne({email: email})
            .lean();

        if (user === null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Không tìm thấy tài khoản"
            });

            return;
        }

        if (bcrypt.compareSync(password, user.hashedPassword) === false) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Password không đúng"
            });

            return;
        }

        if (user.status === 2) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Không tìm thấy tài khoản"
            });

            return;
        }

        const token: string = jwt.sign({email: user.email}, process.env.private_key);
        res.status(HttpStatus.OK).json({
            message: "Đăng nhập thành công",
            token: token
        });

        return;
    };
}

export const userCtrl = new UserController();
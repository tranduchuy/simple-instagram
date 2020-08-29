import * as HttpStatus from 'http-status-codes';
import {User, UserDoc, UserModel} from "../models/user.model";
import uniqueString from "unique-string";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from "bcryptjs";
import {Request, Response} from "express";
import {sendMailVerify} from '../services/sendMailVerify';

type RegisterReqBody = {
    email: string;
    name?: string;
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

type UpdateConfirm = {
    tokenRegister: string;
    status: number;
};

type ForgotPasswordReqBody = {
    email: string;
};

type UpdateForgetPassword = {
    forgetPasswordToken: string;
    status: number;
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
            name,
            password,
            confirmPassword
        } = req.body;
        if (!email || !password || !confirmPassword) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "This field is require."
            });
            return;
        }

        if (!validateEmailAddress(email)) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email address is invalid."
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
                message: "That Email is taken. Try another."
            });
        }

        const tokenRegister = uniqueString();
        const saltRounds: string = bcrypt.genSaltSync(10);
        const hashedPassword: string = bcrypt.hashSync(password, saltRounds);

        const userDoc: UserDoc = new UserModel({
            email: email,
            name: name || '',
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
            html: `<a href="http://localhost:3000/confirm?tokenRegister=${tokenRegister}">Click here to verify email</a>`
        };

        await sendMailVerify(mailOptions);
        return res.status(HttpStatus.OK).json({
            message: "Successful. Please check email to verify."
        });
    };

    async userLogin(req: Request<any, any, LoginReqBody>, res: Response<LoginResSuccess | UserResError>): Promise<any> {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "This field is require."
            });

            return;
        }

        if (!validateEmailAddress(email)) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email is invalid."
            });

            return;
        }

        if (!isAlphabetAndNumber(password)) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Password is invalid"
            });

            return;
        }

        const user: User | null = await UserModel.findOne({email: email})
            .lean();

        if (user === null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email does not exist."
            });

            return;
        }

        if (bcrypt.compareSync(password, user.hashedPassword) === false) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Incorrect Email or Password. Please try again."
            });

            return;
        }

        if (user.status === 2) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email does not exist."
            });

            return;
        }

        const token: string = jwt.sign({email: user.email}, process.env.private_key);
        res.status(HttpStatus.OK).json({
            message: "Successful.",
            token: token
        });

        return;
    };

    async confirmUser(req: Request<any, any, { tokenRegister: string }>, res: Response<UserResSuccess | UserResError>): Promise<any> {
        const {tokenRegister} = req.body;
        if (!tokenRegister) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Token is invalid."
            });

            return;
        }

        const fieldUpdate: UpdateConfirm = {
            tokenRegister: "",
            status: 1
        };
        const user: User | null = await UserModel.findOneAndUpdate({tokenRegister: tokenRegister}, fieldUpdate)
            .lean();
        if (!user) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Token is invalid."
            });

            return;
        }

        res.status(HttpStatus.OK).json({
            message: "Verify Successful."
        });

        return;
    };

    async forgotPassword(req: Request<any, any, ForgotPasswordReqBody>, res: Response<UserResSuccess | UserResError>): Promise<any> {
        const {email} = req.body;
        if (!email) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email field is require."
            });

            return;
        }

        if (!validateEmailAddress(email)) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email is invalid."
            });
        }

        const updateForgetPassword: UpdateForgetPassword = {
            forgetPasswordToken: uniqueString(),
            status: 2
        };

        const user: User | null = await UserModel.findOneAndUpdate({email: email}, updateForgetPassword)
            .lean();

        if (!user) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "No users found."
            });

            return;
        }

        const mailOptions = {
            from: process.env.config_user,
            subject: 'no-reply email',
            to: email,
            html: `<a href="http://localhost:3000/reset?forgetPasswordToken=${user.forgetPasswordToken}">Hi ${user.name},We got a request to reset your Instagram password.</a>`
        };

        await sendMailVerify(mailOptions);
        res.status(HttpStatus.OK).json({
            message: `Thanks! Please check ${user.email} for a link to reset your password.`
        });

        return;
    }
}

export const userCtrl = new UserController();
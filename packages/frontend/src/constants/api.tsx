const host = `${process.env.REACT_APP_API_URL || ''}/api`;

export const Register = `${host}/auth/register`;
export const Login = `${host}/auth/login`;
export const Confirm = `${host}/auth/confirm`;
export const ForgotPass = `${host}/auth/forgot`;
export const ResetPass = `${host}/auth/reset-pass`;
export const GetPostsUrl = `${host}/post`;
export const DeletePostUrl = `${host}/post`;
export const LikePostUrl = `${host}/like`;

const host = (process.env.REACT_APP_API_URL || '') + '/api';

export const Register = `${host}/auth/register`;
export const Login = `${host}/auth/login`;
export const Confirm = `${host}/auth/confirm`;
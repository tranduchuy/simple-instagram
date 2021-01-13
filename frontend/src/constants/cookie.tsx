import Cookies from 'js-cookie';

export const Token = 'token';
export const UserInfo = 'user_info';
export const CheckToken: string | undefined = Cookies.get('token');

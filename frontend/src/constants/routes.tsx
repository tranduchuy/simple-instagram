import { Confirm } from '../pages/Confirm';
import { ForgotPassword } from '../pages/Forgot';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ResetPassword } from '../pages/ResetPassword';

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/confirm',
        name: 'Confirm',
        component: Confirm,
    },
    {
        path: '/forgot-password',
        name: 'Forgot Password',
        component: ForgotPassword,
    },
    {
        path: '/reset-password',
        name: 'Reset Password',
        component: ResetPassword,
    },
];

import {Register} from "../pages/Register";
import {Login} from "../pages/Login";
import {Confirm} from "../pages/Confirm";
import {ForgotPassword} from "../pages/Forgot";

export const routes = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/confirm',
        name: 'Confirm',
        component: Confirm
    },
    {
        path: '/forgot-password',
        name: 'Forgot Password',
        component: ForgotPassword
    }
];

